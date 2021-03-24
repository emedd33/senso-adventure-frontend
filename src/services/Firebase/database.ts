
import { database } from "./firebase"
export const pushToDatabase = (path: string, value: Object) => {
    return database.ref(path)
        .push(value)
        .catch((e) => console.log("Could not update database with path ", path, "error:", e));
}

export const setValueInDatabase = (path: string, value: string | number) => {
    return database.ref(path).set(value)
}

export const getFromDatabase = (path: string) => {
    return database.ref(path).get()
}

export const onDatabaseChange = async (path: string) => {
    return database.ref(path).on("value", (snapshot) => snapshot.val())
}