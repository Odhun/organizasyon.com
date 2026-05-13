import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { Reservation } from "@/types/models";

const COL = "reservations";

export interface ReservationInput {
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount?: number;
  location?: string;
  budget?: string;
  message: string;
}

export async function createReservation(data: ReservationInput) {
  return addDoc(collection(db, COL), {
    ...data,
    eventDate: Timestamp.fromDate(new Date(data.eventDate)),
    status: "new",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getAllReservations(): Promise<Reservation[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Reservation));
}

export async function getReservation(id: string): Promise<Reservation | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Reservation;
}

export async function updateReservationStatus(
  id: string,
  status: Reservation["status"],
  internalNotes?: string
) {
  const data: Record<string, unknown> = {
    status,
    updatedAt: serverTimestamp(),
  };
  if (internalNotes !== undefined) data.internalNotes = internalNotes;
  return updateDoc(doc(db, COL, id), data);
}
