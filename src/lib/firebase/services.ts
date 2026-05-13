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
import type { Service } from "@/types/models";

const COL = "services";

export async function getServices(): Promise<Service[]> {
  const q = query(
    collection(db, COL),
    where("active", "==", true),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service));
}

export async function getAllServices(): Promise<Service[]> {
  const q = query(collection(db, COL), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const q = query(collection(db, COL), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Service;
}

export async function createService(data: Omit<Service, "id" | "createdAt" | "updatedAt">) {
  return addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateService(id: string, data: Partial<Omit<Service, "id" | "createdAt">>) {
  return updateDoc(doc(db, COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteService(id: string) {
  return deleteDoc(doc(db, COL, id));
}
