import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/styles/colors";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { campaignsRef, firebaseStorageRef } from "../../firebase";
import { setError, setIsLoading } from "../../store/admin/adminCreator";
import { getCampaignCrestFromFirebase } from "../../store/campaign/campaignCreators";
import { useImageFile } from "../../store/hooks/useImageFile";
import { dispatchSetSelectedCampaign } from "../../store/selected/selectedCreators";

export interface HomeCampaignEditProps { }


const emptyFile = { file: { name: "" } }
const HomeCampaignEdit: React.FC<HomeCampaignEditProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const [campaignTitle, setCampaignTitle] = useState<string>(selectedCampaign.campaign.title)
    const userName = useSelector((state: RootReducerProp) => state.admin.authUser?.username)
    const [campaignTitleError, setCampaignTitleError] = useState<boolean>(false)
    const [backgroundImageFile, setBackgroundImageFile] = useImageFile(selectedCampaign.campaign.campaignBackgroundImageFile);
    const [campaignTitleImageFile, setCampaignTitleImageFile] = useImageFile(selectedCampaign.campaign.campaignTitleImageFile)
    const [campaignCrestFile, setCampaignCrestFile] = useImageFile(selectedCampaign.campaign.campaignCrestImageFile)

    const submit = () => {
        if (!campaignTitle) {
            setCampaignTitleError(true)
            return
        } else {
            setCampaignTitleError(false)
        }
        dispatch(setIsLoading(true))

        try {

            let backgroundImageFileToUpload: any = backgroundImageFile.name.length > 0 ? backgroundImageFile.file[0] : emptyFile
            let campaignTitleImageFileToUpload: any = campaignTitleImageFile.name.length > 0 ? campaignTitleImageFile.file[0] : emptyFile
            let campaignCrestFileToUpload: any = campaignCrestFile.name.length > 0 ? campaignCrestFile.file[0] : emptyFile
            let newCampaign = {
                campaignBackgroundImageFile: backgroundImageFileToUpload.file.name,
                campaignTitleImageFile: campaignTitleImageFileToUpload.file.name,
                dungeonMaster: userName,
                campaignCrestFile: campaignCrestFileToUpload.file.name,
                title: campaignTitle,
                players: [],
                sessions: []
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
                    dispatch(getCampaignCrestFromFirebase)
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
            <h1 style={{ textAlign: "center", fontFamily: "serif" }}>Campaign Creator</h1>
            <TextField
                id="outlined-multiline-static"
                placeholder="Write a fitting title"
                style={{ width: "50%", textAlign: "center" }}
                variant="filled"
                error={campaignTitleError}
                value={campaignTitle}
                onChange={(event: any) => setCampaignTitle(event.target.value)}
            />
            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", margin: "1rem", width: "15rem" }}>
                    <h3 style={{ fontFamily: "serif", textAlign: "center" }}> Background Image</h3>
                </div>
                <div style={{ display: "flex", width: "15rem" }}>

                    <ImageUpload imageFile={backgroundImageFile.file} setImageFile={setBackgroundImageFile} imageFileName={backgroundImageFile.name} />
                    {backgroundImageFile.imageFileName ? <h2 style={{ fontFamily: "monospace" }}>{backgroundImageFile.imageFileName}</h2> : null}
                </div>
            </div>
            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", margin: "1rem", width: "15rem" }}>

                    <h3 style={{ textAlign: "left", fontFamily: "serif" }}> Campaign crest</h3>
                </div>
                <div style={{ display: "flex", width: "15rem" }}>

                    <ImageUpload imageFile={campaignCrestFile.file} setImageFile={setCampaignCrestFile} imageFileName={campaignCrestFile.name} />
                    {campaignCrestFile.imageFileName ? <h2 style={{ fontFamily: "monospace" }}>{campaignCrestFile.imageFileName}</h2> : null}
                </div>
            </div>

            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", margin: "1rem", width: "15rem" }}>

                    <h3 style={{ fontFamily: "serif" }}> Choose campaign title image</h3>
                </div>
                <div style={{ display: "flex", width: "15rem" }}>

                    <ImageUpload imageFile={campaignTitleImageFile.file} setImageFile={setCampaignTitleImageFile} imageFileName={campaignTitleImageFile.name} />
                    {campaignCrestFile.imageFileName ? <h2 style={{ fontFamily: "monospace" }}>{campaignTitleImageFile.imageFileName}</h2> : null}
                </div>
            </div>
            <Button variant="contained" onClick={submit} style={{ marginTop: "1rem" }} color="primary">
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