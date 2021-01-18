import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/styles/colors";
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import IsLoading from "../../components/IsLoading/IsLoading";
import { useHistory } from "react-router-dom";

type CampaignSessionProps = {}
const CampaignSession: FunctionComponent<CampaignSessionProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const selectedSession = useSelector((state: RootReducerProp) => state.selected.selectedSession)
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return state.campaigns.curseOfStrahd.dungeonMaster === username
        }
        return false
    })
    if (!selectedSession) {
        return <IsLoading />
    }

    return (<>
        <Container>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                {isDungeonMaster ?
                    <Button onClick={() => {
                        dispatch(dispatchSetSelectedSession({
                            id: selectedSession.id,
                            session: {
                                title: selectedSession.session.title,
                                story: selectedSession.session.story,
                                date: selectedSession.session.date,
                                campaign: selectedSession.session.campaign
                            }
                        }))
                        history.push("/campaign/session/edit")
                    }}>
                        <EditIcon />
                    </Button> : null}
            </div>
            <h2 style={{ fontSize: "3rem", textAlign: "center" }}>
                {selectedSession?.session.title}
            </h2>
            <p style={{ fontSize: "2rem", textAlign: "center" }}>
                {selectedSession?.session.date}
            </p>
            <p style={{ fontSize: "1.5rem" }}>

                {selectedSession?.session.story}
            </p>
        </Container>
    </>
    )
}
const Container = styled.div`
min-height:50rem;
min-width:40rem;
width:50%;
padding:1rem;
-webkit-box-shadow: 5px 5px 15px 5px #000000; 
box-shadow: 5px 0px 15px 2px #000000;
background-color: ${OLD_WHITE}
`
export default CampaignSession