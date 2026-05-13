import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import type { SiteSettings } from "@/types/models";

const DOC_REF = () => doc(db, "siteSettings", "main");

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const snap = await getDoc(DOC_REF());
  if (!snap.exists()) return null;
  return snap.data() as SiteSettings;
}

export async function updateSiteSettings(data: Partial<Omit<SiteSettings, "updatedAt">>) {
  return setDoc(DOC_REF(), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}
