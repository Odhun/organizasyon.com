import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./config";

export interface BackupMeta {
  id: string;
  createdAt: Timestamp | null;
  storagePath: string;
  downloadURL: string;
  size: number;
  counts: Record<string, number>;
}

// Serialize: Firestore Timestamp → { _t: "ts", s: seconds }
function serialize(val: unknown): unknown {
  if (val === null || val === undefined) return val;
  if (typeof val !== "object") return val;
  if (Array.isArray(val)) return val.map(serialize);
  const obj = val as Record<string, unknown>;
  if (typeof obj.seconds === "number" && typeof obj.nanoseconds === "number") {
    return { _t: "ts", s: obj.seconds, n: obj.nanoseconds };
  }
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, serialize(v)]));
}

// Deserialize: { _t: "ts", s: seconds } → Firestore Timestamp
function deserialize(val: unknown): unknown {
  if (val === null || val === undefined) return val;
  if (typeof val !== "object") return val;
  if (Array.isArray(val)) return val.map(deserialize);
  const obj = val as Record<string, unknown>;
  if (obj._t === "ts" && typeof obj.s === "number") {
    return new Timestamp(obj.s as number, (obj.n as number) ?? 0);
  }
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deserialize(v)]));
}

const BACKUP_COLS = ["services", "gallery", "testimonials", "reservations", "siteSettings"];

export async function createBackup(): Promise<BackupMeta> {
  const backupData: Record<string, unknown> = {};
  const counts: Record<string, number> = {};

  for (const col of BACKUP_COLS) {
    const snap = await getDocs(collection(db, col));
    backupData[col] = snap.docs.map((d) => serialize({ id: d.id, ...d.data() }));
    counts[col] = snap.docs.length;
  }

  const payload = JSON.stringify({
    version: "2.0",
    exportedAt: new Date().toISOString(),
    data: backupData,
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const storagePath = `backups/backup-${timestamp}.json`;
  const storageRef = ref(storage, storagePath);
  await uploadString(storageRef, payload, "raw", { contentType: "application/json" });
  const downloadURL = await getDownloadURL(storageRef);
  const size = new Blob([payload]).size;

  const docRef = await addDoc(collection(db, "backups"), {
    createdAt: serverTimestamp(),
    storagePath,
    downloadURL,
    size,
    counts,
  });

  return { id: docRef.id, createdAt: null, storagePath, downloadURL, size, counts };
}

export async function getBackups(): Promise<BackupMeta[]> {
  const q = query(collection(db, "backups"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BackupMeta));
}

export async function deleteBackup(backup: BackupMeta): Promise<void> {
  await deleteObject(ref(storage, backup.storagePath));
  await deleteDoc(doc(db, "backups", backup.id));
}

export async function restoreBackup(
  backup: BackupMeta,
  selectedCols: string[]
): Promise<void> {
  const response = await fetch(backup.downloadURL);
  const json = await response.json();
  const data = json.data as Record<string, Array<{ id: string } & Record<string, unknown>>>;

  for (const colName of selectedCols) {
    const docs = data[colName];
    if (!docs) continue;

    // Delete all existing docs in collection
    const existing = await getDocs(collection(db, colName));
    await Promise.all(existing.docs.map((d) => deleteDoc(d.ref)));

    // Re-add with original IDs
    await Promise.all(
      docs.map(({ id, ...fields }) =>
        setDoc(doc(db, colName, id), deserialize(fields) as Record<string, unknown>)
      )
    );
  }
}
