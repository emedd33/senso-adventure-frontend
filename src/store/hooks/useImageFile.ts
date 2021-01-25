import { useState } from "react"
const emptyFile = { file: { name: "" } }

export const useImageFile = (newFileName: string = "") => {
    const [fileName, setFileName] = useState<any>({ ...emptyFile, name: newFileName })
    const setImageFile = (file: any) => {
        console.log("file", file);
        if (file.length > 0) {
            return setFileName({ file: file, name: file[0].file.name })
        }
        return setFileName(emptyFile)
    }
    return [fileName, setImageFile]

}