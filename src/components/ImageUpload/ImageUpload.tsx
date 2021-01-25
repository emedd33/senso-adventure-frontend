import { Button } from "@material-ui/core";
import React from "react";
import ImageUploading from "react-images-uploading";

export interface ImageUoloadProps {
    imageFile: any
    setImageFile: any
}
const ImageUpload: React.FC<ImageUoloadProps> = ({ imageFile, setImageFile }) => {
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
                        onClick={onImageUpload}

                    >
                        Click to upload picture
                    </Button>
                    : null}
                &nbsp;

                {imageList.map((image, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <img src={image.dataURL} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                            <Button variant="contained" onClick={() => onImageUpdate(index)}>Replace</Button>
                            <Button variant="contained" onClick={() => onImageRemove(index)}>Remove</Button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </ImageUploading>

    );
}

export default ImageUpload;