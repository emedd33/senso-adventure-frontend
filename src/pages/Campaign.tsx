import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";
import Characters from "../components/Characters/Characters"
import IsLoading from "../components/IsLoading/IsLoading";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link, Redirect } from "react-router-dom";

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
        return Object.values(selectedCampaign!.sessions).map((session: ISession) => {
            return renderSplitScrolls(session, CosTitle, null, isDungeonMaster)
        })
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
            <Characters players={selectedCampaign.players} isDungeonMaster={isDungeonMaster} campaign={selectedCampaign.id} />
            {selectedCampaign ?
                renderScrolls()
                : null
            }
            {isDungeonMaster ?
                <Link to={"/curseOfStrahd/edit"}>
                    <Fab color="primary" aria-label="add" style={{ position: "fixed", right: "0", bottom: "0", margin: "3rem", zIndex: 400 }}>
                        <AddIcon />
                    </Fab>
                </Link>
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