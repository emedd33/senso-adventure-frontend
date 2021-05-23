import { Button, Snackbar } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";
import { storage } from "../../services/Firebase/firebase";
import { pushToStorage } from "../../services/Firebase/storage";

export interface ImageUoloadProps {
  imageFile: any;
  setImageFile: any;
  imageUploadPath?: string
  maxFiles: number;
}
const ImageUpload: React.FC<ImageUoloadProps> = ({
  imageFile,
  setImageFile,
  imageUploadPath,
  maxFiles,
}) => {
  const imageFileArray = imageFile.dataURL ? [imageFile] : [];
  const translate = useTranslation();
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [alertType, setAlertType] = useState<Color | undefined>("success")
  const [alertMessage, setAlertMessage] = useState<string>("Image uploaded successfully")
  const onImageUpload = () => {
    storage.ref(imageUploadPath).delete()
    if (imageUploadPath) {
      pushToStorage(
        imageUploadPath,
        imageFile.file,
        {}
      );
    }
    setAlertType("success")
    setAlertMessage("Image uploaded successfully")
    setNotificationOpen(true)

  }
  const onImageClear = () => {
    storage.ref(imageUploadPath).delete()
    setAlertType("success")
    setAlertMessage("Images have been cleared")
    setNotificationOpen(true)
    setImageFile([])

  }

  return (
    <>
      <ImageUploading
        multiple
        value={imageFileArray}
        onChange={setImageFile}
        maxNumber={maxFiles}
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
          // write your building UI
          <div
            className="upload__image-wrapper"
            style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
          >
            {imageList.length === 0 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={onImageUpload}
                style={{ height: "3rem", textTransform: "none" }}
              >
                {translate.t("Upload image")}
              </Button>
            ) : null}
          &nbsp;
            {imageList.map((image, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src={image.dataURL} alt="" width="100" />
                <div
                  className="image-item__btn-wrapper"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onImageUpdate(index)}
                    style={{ margin: "1rem" }}
                  >
                    Replace
                </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onImageRemove(index)}
                    style={{ margin: "1rem" }}
                  >
                    Remove
                </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%" }} >
        {imageUploadPath && Object.values(imageFile).length > 0 ?
          <Button onClick={onImageUpload} color="primary" variant="contained">Upload Image</Button>
          : null}
        <Button onClick={onImageClear} color="secondary" variant="contained">Clear images</Button>
      </div>
      <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={() => setNotificationOpen(false)}>
        <Alert onClose={() => setNotificationOpen(false)} severity={alertType}>
          {`${translate.t(alertMessage)}`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ImageUpload;
