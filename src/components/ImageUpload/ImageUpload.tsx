import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import ImageUploading from "react-images-uploading";

export interface ImageUoloadProps {
  imageFile: any;
  setImageFile: any;
  maxFiles: number;
}
const ImageUpload: React.FC<ImageUoloadProps> = ({
  imageFile,
  setImageFile,
  maxFiles,
}) => {
  const imageFileArray = imageFile.dataURL ? [imageFile] : [];
  const translate = useTranslation()
  return (
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
              style={{ height: "3rem", textTransform:"none" }}
            >
              {translate.t('Upload image')}
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
  );
};

export default ImageUpload;
