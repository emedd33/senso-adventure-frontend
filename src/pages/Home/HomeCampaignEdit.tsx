import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/styles/colors";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { campaignsRef, firebaseStorageRef } from "../../firebase";
import { setError, setIsLoading } from "../../store/admin/adminCreator";
import { dispatchSetSelectedCampaign } from "../../store/selected/selectedCreators";

export interface HomeCampaignEditProps { }


const HomeCampaignEdit: React.FC<HomeCampaignEditProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const [campaignTitle, setCampaignTitle] = useState<string>(selectedCampaign.title)
    const userName = useSelector((state: RootReducerProp) => state.admin.authUser?.username)
    const [campaignTitleError, setCampaignTitleError] = useState<boolean>(false)
    const [backgroundImageFile, setBackgroundImageFile] = React.useState([]);
    const [campaignTitleImageFile, setCampaignTitleImageFile] = useState<string>(selectedCampaign.title)
    const emptyFile = { file: { name: "" } }
    const [campaignCrestFile, setCampaignCrestFile] = useState([])


    // const [campaignTitleImage,setCampaignTitleImage] = useState<string|null>(selectedCampaign?.titleImage)
    const submit = () => {
        if (!campaignTitle) {
            setCampaignTitleError(true)
            return
        } else {
            setCampaignTitleError(false)
        }
        dispatch(setIsLoading(true))
        try {

            let backgroundImageFileToUpload: any = backgroundImageFile.length > 0 ? backgroundImageFile[0] : emptyFile
            let campaignTitleImageFileToUpload: any = campaignTitleImageFile.length > 0 ? campaignTitleImageFile[0] : emptyFile
            let campaignCrestFileToUpload: any = campaignCrestFile.length > 0 ? campaignCrestFile[0] : emptyFile
            let newCampaign = {
                campaignBackgroundImageFile: backgroundImageFileToUpload.file.name,
                campaignTitleImageFile: campaignTitleImageFileToUpload.file.name,
                dungeonMaster: userName,
                campaignCrestFile: campaignCrestFileToUpload.file.name,
                title: campaignTitle,
            }
            campaignsRef.push(newCampaign).then(snap => {
                snap.once('value', (snapshot: any) => {
                    const metadata = {
                        customMetadata: {
                            contentType: 'image',
                            campaignId: snapshot.kay,
                            campaignTitle: snapshot.val().title
                        },
                    };
                    if (backgroundImageFileToUpload.file.name) {
                        firebaseStorageRef.child("Images/Background/" + backgroundImageFileToUpload.file.name).put(backgroundImageFileToUpload.file, metadata)
                    }
                    if (campaignCrestFileToUpload.file.name) {
                        firebaseStorageRef.child("Images/Crest/" + campaignCrestFileToUpload.file.name).put(campaignCrestFileToUpload.file, metadata)
                    }
                    if (campaignTitleImageFileToUpload.file.name) {
                        firebaseStorageRef.child("Images/CampaignTitle/" + campaignTitleImageFileToUpload.file.name).put(campaignTitleImageFileToUpload.file, metadata)
                    }
                    if (snap.key) {
                        dispatch(dispatchSetSelectedCampaign(snap.key))
                    }
                    history.push("/campaign")
                })
            })

        } catch (error) {
            dispatch(setError(error))
        }
        dispatch(setIsLoading(false))
    }
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
            <ImageUpload imageFile={backgroundImageFile} setImageFile={setBackgroundImageFile} />
            <h2 style={{ textAlign: "center" }}> Choose Campaign crest</h2>
            <ImageUpload imageFile={campaignCrestFile} setImageFile={setCampaignCrestFile} />
            <h2 style={{ textAlign: "center" }}> Choose campaign title image</h2>
            <ImageUpload imageFile={campaignTitleImageFile} setImageFile={setCampaignTitleImageFile} />
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
align-items:center;
justify-content: center;
display: flex; 
padding: 1rem; 
flex-direction: column; 
`

export default HomeCampaignEdit;