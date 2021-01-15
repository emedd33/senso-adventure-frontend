import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import IsLoading from "../../components/IsLoading/IsLoading";
import { storage } from "../../firebase";
import Campaign from "./Campaign";
import CampaignEdit from "./CampaignEdit";

type IndexCampaignProps = {}
const IndexCampaign: FunctionComponent<IndexCampaignProps> = () => {
    const [imageUrl, setImageUrl] = useState("")
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)

    useEffect(() => {
        storage.ref('Images/Background/' + selectedCampaign?.backgroundImage).getDownloadURL().then((url: string) => setImageUrl(url))
    }, [selectedCampaign])

    if (isLoading) {
        return (
            <Container >
                <IsLoading />
            </Container>
        )
    }
    if (!selectedCampaign) {
        return (<Redirect to="/" />)
    }

    return (
        // <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
        <Switch>
            <Route path="/campaign/edit">
                <Campaign />
            </Route>
            <Route path="/campaign">
                <CampaignEdit />
            </Route>
        </Switch>
        // </Container >
    )
}


const Container = styled.div`
z-index:300;
display:flex;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
justify-content:center;
align-items:center;
flex-direction: column;
padding-top:5vh;
width:100%;
height:100%;
min-height:100vh;
`
export default IndexCampaign