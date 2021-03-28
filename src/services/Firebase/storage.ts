import { storage } from "./firebase";

export const getUrlFromStorage = (path: string) => {
  return storage.ref(path).getDownloadURL();
};

export const pushToStorage = (path: string, file: any, metadata: any) => {
  return storage.ref(path).put(file, metadata);
};
