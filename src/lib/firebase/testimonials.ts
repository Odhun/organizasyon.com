import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { Testimonial } from "@/types/models";

const COL = "testimonials";

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const q = query(
    collection(db, COL),
    where("approved", "==", true),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
}

export async function createTestimonial(data: Omit<Testimonial, "id" | "createdAt">) {
  return addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateTestimonial(id: string, data: Partial<Omit<Testimonial, "id" | "createdAt">>) {
  return updateDoc(doc(db, COL, id), data);
}

export async function approveTestimonial(id: string) {
  return updateDoc(doc(db, COL, id), { approved: true });
}

export async function rejectTestimonial(id: string) {
  return updateDoc(doc(db, COL, id), { approved: false });
}

export async function deleteTestimonial(id: string) {
  return deleteDoc(doc(db, COL, id));
}
