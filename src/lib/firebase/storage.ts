import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./config";

export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function deleteImage(url: string): Promise<void> {
  const storageRef = ref(storage, url);
  return deleteObject(storageRef);
}

export function getImagePath(folder: string, filename: string): string {
  const ext = filename.split(".").pop();
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  return `${folder}/${name}`;
}
