import { storage } from "./firebase";

export const getUrlFromStorage = (path: string) => {
  return storage.ref(path).getDownloadURL().catch((e) => { throw new Error("Could not fetch from Firebase") });
};

export const pushToStorage = (path: string, file: any, metadata: any) => {
  return storage.ref(path).put(file, metadata);
};
