import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/styles/colors";
import ImageUploading, { ImageListType } from "react-images-uploading";

export interface HomeCampaignEditProps { }


const HomeCampaignEdit: React.FC<HomeCampaignEditProps> = () => {
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const [campaignTitle, setCampaignTitle] = useState<string | null>(selectedCampaign?.campaignTitle)
    const [campaignTitleError, setCampaignTitleError] = useState<boolean>(false)
    // State to store uploaded file
    const [backgroundImageFile, setBackgroundImageFile] = React.useState([]);
    const maxNumber = 1;


    // const [campaignTitleImage,setCampaignTitleImage] = useState<string|null>(selectedCampaign?.titleImage)
    const submit = () => {
        if (!campaignTitle) {
            setCampaignTitleError(true)
        } else {
            setCampaignTitleError(false)
        }

    }
    const updateBackgroundImage = (
        imageList: ImageListType,
    ) => {
        console.log(imageList)
        setBackgroundImageFile(imageList as never[]);
    };
    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Edit Campaign</h1>
            <TextField
                id="outlined-multiline-static"
                placeholder="Write a fitting title"
                style={{ width: "50%", textAlign: "center" }}
                variant="filled"
                error={campaignTitleError}
                value={campaignTitle}
                onChange={(event: any) => setCampaignTitle(event.target.value)}
            />
            <h2 style={{ textAlign: "center" }}> Choose background image</h2>
            <ImageUploading
                multiple
                value={backgroundImageFile}
                onChange={updateBackgroundImage}
                maxNumber={maxNumber}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper" >
                        {imageList.length === 0 ?
                            <Button
                                variant="contained"
                                style={isDragging ? { color: "red" } : undefined}
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

            <Button variant="contained" onClick={submit} style={{ marginTop: "1rem" }}>
                Submit
            </Button>
        </Container >
    );
}
const Container = styled.div`
margin-bottom: 10rem; 
margin-top:5rem;
width: 70%;
background-color: ${OLD_WHITE}; 
height: 50rem; 
align-items:center;
justify-content: center;
display: flex; 
padding: 1rem; 
flex-direction: column; 
`

export default HomeCampaignEdit;