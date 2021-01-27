import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/styles/colors";
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ReactMarkdown from 'react-markdown'
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import { Redirect, useHistory } from "react-router-dom";
import { setIsLoading } from "../../store/admin/adminCreator";
import { storage } from "../../firebase";

type CampaignSessionProps = {}
const CampaignSession: FunctionComponent<CampaignSessionProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [sessionStory, setSessionStory] = useState("")
    const selectedSession = useSelector((state: RootReducerProp) => state.selected.selectedSession)
    const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return selectedCampaign.campaign.dungeonMaster === username
        }
        return false
    })
    useEffect(() => {
        dispatch(setIsLoading(true))
        if (selectedSession.session.story) {
            storage.ref().child("SessionStories").child(selectedSession.session.story).getDownloadURL()
                .then(url => fetch(url)
                    .then(res => res.text())
                    .then(res => setSessionStory(res))
                )
                .catch(e => console.log("error", e))
            dispatch(setIsLoading(false))
        }
    }, [dispatch, selectedSession])
    if (!selectedSession.id) {
        return <Redirect to="/campaign" />
    }

    return (<>
        <Container>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "2rem", opacity: 0.5 }}>
                    {selectedSession?.session.date}
                </p>
                {isDungeonMaster ?
                    <Button color="primary" variant="contained" onClick={() => {
                        dispatch(dispatchSetSelectedSession({
                            id: selectedSession.id,
                            session: {
                                title: selectedSession.session.title,
                                subTitle: selectedSession.session.subTitle,
                                story: selectedSession.session.story,
                                date: selectedSession.session.date,
                                campaign: selectedSession.session.campaign,
                                sessionDay: selectedSession.session.sessionDay

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
            <h3 style={{ fontSize: "2rem", textAlign: "center", opacity: 0.5 }}>
                {selectedSession?.session.subTitle}
            </h3>
            <ReactMarkdown>
                {sessionStory}
            </ReactMarkdown>
        </Container>
    </>
    )
}
const Container = styled.div`
min-height:50rem;
min-width:15rem;
width:50%;
padding:1rem;
-webkit-box-shadow: 5px 5px 15px 5px #000000; 
box-shadow: 5px 0px 15px 2px #000000;
background-color: ${OLD_WHITE}
`
export default CampaignSession