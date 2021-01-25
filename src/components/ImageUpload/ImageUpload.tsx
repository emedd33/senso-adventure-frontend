import { Button } from "@material-ui/core";
import React from "react";
import ImageUploading from "react-images-uploading";

export interface ImageUoloadProps {
    imageFile: any
    setImageFile: any
    imageFileName: string
}
const ImageUpload: React.FC<ImageUoloadProps> = ({ imageFile, setImageFile, imageFileName }) => {
    const imageFileArray = (!imageFile || imageFile[0] === "" || !imageFile[0]) ? [] : imageFile
    return (<ImageUploading
        multiple
        value={imageFileArray}
        onChange={setImageFile}
        maxNumber={1}
    >
        {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
        }) => (
            // write your building UI
            <div className="upload__image-wrapper" >
                {imageList.length === 0 ?
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onImageUpload}

                    >
                        Click to upload picture
                    </Button>
                    : null}
                &nbsp;

                {imageList.map((image, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <img src={image.dataURL} alt="" width="100" />
                        <div className="image-item__btn-wrapper" style={{ display: "flex", flexDirection: "row" }}>
                            <Button variant="contained" color="primary" onClick={() => onImageUpdate(index)} style={{ margin: "1rem" }}>Replace</Button>
                            <Button variant="contained" color="secondary" onClick={() => onImageRemove(index)} style={{ margin: "1rem" }}>Remove</Button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </ImageUploading>

    );
}

export default ImageUpload;