import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";
import Characters from "../components/Characters/Characters"
import IsLoading from "../components/IsLoading/IsLoading";
import { Redirect } from "react-router-dom";
import SpeedDials from "../components/SpeedDials/SpeedDials";

type CampaignProps = {}
const Campaign: FunctionComponent<CampaignProps> = () => {
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return state.campaigns.curseOfStrahd.dungeonMaster === username
        }
        return false
    })
    const renderScrolls = () => {
        if (selectedCampaign?.sessions) {
            return Object.keys(selectedCampaign.sessions).map((key: any) => {
                return renderSplitScrolls(key, selectedCampaign!.sessions[key], CosTitle, null, isDungeonMaster)
            })
        }
    }
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
        <Container>
            <Characters />
            {selectedCampaign ?
                renderScrolls()
                : null
            }
            {isDungeonMaster ?
                <SpeedDials />
                : null}
        </Container >
    )


}

const Container = styled.div`
z-index:300;
display:flex;
background-image: url(${Background});
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
export default Campaign