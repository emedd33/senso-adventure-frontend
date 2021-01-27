import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/styles/colors";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import IsLoading from "../../components/IsLoading/IsLoading";
import { campaignsRef, firebaseStorageRef } from "../../firebase";
import { setError } from "../../store/admin/adminCreator";
import { getCampaignCrestFromFirebase } from "../../store/campaign/campaignCreators";
import { useImageFile } from "../../store/hooks/useImageFile";
import { dispatchSetSelectedCampaign } from "../../store/selected/selectedCreators";
import { isValidImageFile } from "../../utils/isValidImageFile";

export interface CampaignEditProps { }


const CampaignEdit: React.FC<CampaignEditProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const [campaignTitle, setCampaignTitle] = useState<string>(selectedCampaign.campaign.title)
    const userName = useSelector((state: RootReducerProp) => state.admin.authUser?.username)
    const [campaignTitleError, setCampaignTitleError] = useState<boolean>(false)
    const [campaignBackgroundImageFile, setCampaignBackgroundImageFile] = useImageFile(selectedCampaign.campaign.campaignBackgroundImageFile);
    const [campaignTitleImageFile, setCampaignTitleImageFile] = useImageFile(selectedCampaign.campaign.campaignTitleImageFile)
    const [campaignCrestImageFile, setCampaignCrestFile] = useImageFile(selectedCampaign.campaign.campaignCrestImageFile)

    const postProcssCampaign = async (key: string, title: string, backgroundImageFileToUpload: any, campaignTitleImageFileToUpload: any, campaignCrestImageFileToUpload: any) => {

        const metadata = {
            customMetadata: {
                contentType: 'image',
                campaignId: key,
                campaignTitle: title
            },
        };
        if (isValidImageFile(campaignCrestImageFileToUpload)) {
            await firebaseStorageRef.child("Images/Crest/" + campaignCrestImageFileToUpload.file.file.name).put(campaignCrestImageFileToUpload.file.file, metadata)
        }
        if (isValidImageFile(backgroundImageFileToUpload)) {
            await firebaseStorageRef.child("Images/Background/" + backgroundImageFileToUpload.file.file.name + "_" + backgroundImageFileToUpload.file.file.lastModified).put(backgroundImageFileToUpload.file.file, metadata)
        }
        if (isValidImageFile(campaignTitleImageFileToUpload)) {
            await firebaseStorageRef.child("Images/CampaignTitle/" + campaignTitleImageFileToUpload.file.name).put(campaignTitleImageFileToUpload.file.file, metadata)
        }
        dispatch(dispatchSetSelectedCampaign(key))
        dispatch(getCampaignCrestFromFirebase)
        history.push("/campaign")
    }
    const submit = () => {
        setIsLoading(true)
        if (!campaignTitle) {
            setCampaignTitleError(true)
            dispatch(setError("Please fille out the Campaign Title"))
            setIsLoading(false)
            return
        } else {
            setCampaignTitleError(false)
        }

        try {

            let newCampaign = {
                campaignBackgroundImageFile: campaignBackgroundImageFile.name,
                campaignTitleImageFile: campaignTitleImageFile.name,
                dungeonMaster: userName,
                campaignCrestImageFile: campaignCrestImageFile.name,
                title: campaignTitle,
            }
            if (selectedCampaign.campaign.isNew) {
                campaignsRef.push(newCampaign).then(snap => {
                    snap.once('value', async (snapshot: any) => {
                        let key = snapshot.key
                        if (key) {
                            postProcssCampaign(key, newCampaign.title, campaignBackgroundImageFile, campaignTitleImageFile, campaignCrestImageFile)
                        }
                    })
                }).catch(e => console.log("Could not update campaing "))
            } else {
                campaignsRef.child(selectedCampaign.id).set(newCampaign).then(() => {
                    postProcssCampaign(selectedCampaign.id, newCampaign.title, campaignBackgroundImageFile, campaignTitleImageFile, campaignCrestImageFile)
                })
                    .catch(e => console.log("Could not update campaing " + e))
            }

        } catch (error) {
            setIsLoading(false)
            dispatch(setError(error))
        }

    }
    return (
        <Container>
            {isLoading ? <IsLoading /> :
                <>
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
                        <div style={{ display: "flex", width: "15rem", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                            {campaignBackgroundImageFile.name ? <h4 style={{ fontFamily: "sans-serif" }}>{campaignBackgroundImageFile.name}</h4> : null}
                            <ImageUpload imageFile={campaignBackgroundImageFile.file} setImageFile={setCampaignBackgroundImageFile} />
                        </div>
                    </div>
                    <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "1rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", margin: "1rem", width: "15rem" }}>

                            <h3 style={{ textAlign: "left", fontFamily: "serif" }}> Campaign crest</h3>
                        </div>
                        <div style={{ display: "flex", width: "15rem", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            {campaignCrestImageFile.name ? <h4 style={{ fontFamily: "sans-serif" }}>{campaignCrestImageFile.name}</h4> : null}
                            <ImageUpload imageFile={campaignCrestImageFile.file} setImageFile={setCampaignCrestFile} />
                        </div>
                    </div>

                    <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "1rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", margin: "1rem", width: "15rem" }}>

                            <h3 style={{ fontFamily: "serif" }}> Choose campaign title image</h3>
                        </div>
                        <div style={{ display: "flex", width: "15rem", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                            {campaignTitleImageFile.name ? <h4 style={{ fontFamily: "sans-serif" }}>{campaignTitleImageFile.name}</h4> : null}
                            <ImageUpload imageFile={campaignTitleImageFile.file} setImageFile={setCampaignTitleImageFile} />
                        </div>
                    </div>
                    <Button variant="contained" onClick={submit} style={{ marginTop: "1rem" }} color="primary">
                        Submit
            </Button>
                </>}
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

export default CampaignEdit;