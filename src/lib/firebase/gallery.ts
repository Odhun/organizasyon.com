import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { GalleryItem } from "@/types/models";

const COL = "gallery";

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const q = query(
    collection(db, COL),
    where("active", "==", true),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const q = query(collection(db, COL), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
}

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as GalleryItem;
}

export async function createGalleryItem(data: Omit<GalleryItem, "id" | "createdAt">) {
  return addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateGalleryItem(id: string, data: Partial<Omit<GalleryItem, "id" | "createdAt">>) {
  return updateDoc(doc(db, COL, id), data);
}

export async function deleteGalleryItem(id: string) {
  return deleteDoc(doc(db, COL, id));
}
