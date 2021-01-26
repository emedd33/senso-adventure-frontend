import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import IsLoading from "../../components/IsLoading/IsLoading";
import { Redirect, Route } from "react-router-dom";
import { BackgroundImageFileLocation, storage } from "../../firebase";
import Campaign from "./Campaign";
import CampaignSessionEdit from "./CampaignSessionEdit";
import CampaignSession from "./CampaignSession";

type CampaignIndexProps = {}
const CampaignIndex: FunctionComponent<CampaignIndexProps> = () => {
    const [imageUrl, setImageUrl] = useState("")
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const [campaignTitleImage, setCampaignTitleImage] = useState<string>("")
    useEffect(() => {
        if (selectedCampaign && selectedCampaign.campaign.campaignBackgroundImageFile) {
            storage.ref(BackgroundImageFileLocation + selectedCampaign.campaign.campaignBackgroundImageFile).getDownloadURL()
                .then((url: string) => {
                    setImageUrl(url)
                }
                )
                .catch(e => console.log("could not fetch background image"))
            storage.ref('Images/CampaignTitle/' + selectedCampaign.campaign.campaignTitleImageFile).getDownloadURL().then(url => {
                setCampaignTitleImage(url)
            }).catch(e => console.log("Could not fetch Campaign image"))

        }
    }, [selectedCampaign])

    if (!selectedCampaign) {
        return (<Redirect to="/" />)
    }
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
            {campaignTitleImage ? <img src={campaignTitleImage} alt="Campaign title" style={{ minWidth: "20rem", width: "40%", maxHeight: "30rem", marginBottom: "1rem" }} /> : null}
            {isLoading ?
                <IsLoading />
                :
                <>
                    <Route exact path="/campaign">
                        <Campaign />
                    </Route>
                    <Route exact path="/campaign/session">
                        <CampaignSession />
                    </Route>
                    <Route exact path="/campaign/session/edit">
                        <CampaignSessionEdit />
                    </Route>
                </>
            }
        </Container>
    )


}
const Container = styled.div`
display:flex;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
justify-content:center;
align-items:center;
flex-direction: column;
padding-top:10rem;
width:100%;
height:100%;
min-height:100vh;
`
export default CampaignIndex