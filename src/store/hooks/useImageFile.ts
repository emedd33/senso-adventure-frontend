import { useState } from "react";
const emptyFile = { file: {}, name: "" };

export const useImageFile = (
  newFileName: string = "",
  campaingTitle: string = ""
) => {
  const [fileName, setFileName] = useState<any>({
    ...emptyFile,
    name: newFileName,
  });
  debugger
  const setImageFile = (file: any) => {
    if (file.length > 0) {
      return setFileName({ file: file[0], name: file[0].file.name });
    }
    return setFileName(emptyFile);
  };
  return [fileName, setImageFile];
};
