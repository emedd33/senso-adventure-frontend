import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import IsLoading from "../../components/IsLoading/IsLoading";
import { Redirect, Route } from "react-router-dom";
import { storage } from "../../firebase";
import Campaign from "./Campaign";
import CampaignEdit from "./CampaignEdit";
import CampaignSession from "./CampaignSession";

type CampaignIndexProps = {}
const CampaignIndex: FunctionComponent<CampaignIndexProps> = () => {
    const [imageUrl, setImageUrl] = useState("")
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    useEffect(() => {
        if (selectedCampaign && selectedCampaign.campaignBackgroundFile) {
            storage.ref('Images/Background/' + selectedCampaign.campaignBackgroundFile).getDownloadURL()
                .then((url: string) => setImageUrl(url))
                .catch(e => console.log("could not fetch background image"))
        }
    }, [selectedCampaign])
    console.log(selectedCampaign)
    console.log(imageUrl)
    if (isLoading || !selectedCampaign) {
        return (
            <Container style={{ backgroundImage: "url(" + imageUrl + ")" }} >
                <IsLoading />
            </Container>
        )
    }

    if (!selectedCampaign) {
        return (<Redirect to="/" />)
    }
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>

            <Route exact path="/campaign">
                <Campaign />
            </Route>
            <Route exact path="/campaign/session">
                <CampaignSession />
            </Route>
            <Route exact path="/campaign/session/edit">
                <CampaignEdit />
            </Route>
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