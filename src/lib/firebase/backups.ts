import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

const BACKUP_COLS = ["services", "gallery", "testimonials", "reservations", "siteSettings"];

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

export interface BackupData {
  version: string;
  exportedAt: string;
  counts: Record<string, number>;
  data: Record<string, unknown[]>;
}

export async function generateBackup(): Promise<{ json: string; counts: Record<string, number> }> {
  const backupData: Record<string, unknown[]> = {};
  const counts: Record<string, number> = {};

  for (const col of BACKUP_COLS) {
    const snap = await getDocs(collection(db, col));
    backupData[col] = snap.docs.map((d) => serialize({ id: d.id, ...d.data() }));
    counts[col] = snap.docs.length;
  }

  const json = JSON.stringify({
    version: "2.0",
    exportedAt: new Date().toISOString(),
    counts,
    data: backupData,
  } satisfies BackupData, null, 2);

  return { json, counts };
}

export async function restoreFromJSON(
  data: BackupData,
  selectedCols: string[]
): Promise<void> {
  for (const colName of selectedCols) {
    const docs = data.data[colName] as Array<{ id: string } & Record<string, unknown>>;
    if (!docs) continue;

    const existing = await getDocs(collection(db, colName));
    await Promise.all(existing.docs.map((d) => deleteDoc(d.ref)));

    await Promise.all(
      docs.map(({ id, ...fields }) =>
        setDoc(doc(db, colName, id), deserialize(fields) as Record<string, unknown>)
      )
    );
  }
}
