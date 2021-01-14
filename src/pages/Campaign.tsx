import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import Characters from "../components/Characters/Characters"
import IsLoading from "../components/IsLoading/IsLoading";
import { Redirect } from "react-router-dom";
import SpeedDials from "../components/SpeedDials/SpeedDials";
import Scroll from "../components/Scroll/Scroll";
import { storage } from "../firebase";

type CampaignProps = {}
const Campaign: FunctionComponent<CampaignProps> = () => {
    const [imageUrl, setImageUrl] = useState("")
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return state.campaigns.curseOfStrahd.dungeonMaster === username
        }
        return false
    })
    useEffect(() => {
        storage.ref('Images/Background/' + selectedCampaign?.backgroundImage).getDownloadURL().then((url: string) => setImageUrl(url))
    }, [selectedCampaign])
    const renderScrolls = () => {
        if (selectedCampaign?.sessions) {
            return Object.keys(selectedCampaign.sessions).map((key: any) => {
                let story = selectedCampaign.sessions[key].story
                story = story.length > 500 ? story.substring(0, 1000).concat("...") : story
                return <Scroll id={key} title={selectedCampaign!.sessions[key].title} content={story} date={selectedCampaign!.sessions[key].date} storyImage={CosTitle} isFirstScroll={true} campaign={selectedCampaign!.sessions[key].campaign} onClick={null} isDungeonMaster={isDungeonMaster} />
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
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
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