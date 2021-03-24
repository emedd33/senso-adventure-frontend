import { storage } from "./firebase"

const getUrlFromStorage = (path: string) => {
    return storage.ref(path).getDownloadURL()
}

export { getUrlFromStorage }