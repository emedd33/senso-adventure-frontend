import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import { storage } from "../../firebase";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import IsLoading from "../../components/IsLoading/IsLoading";
import { parseSessionStory } from "../../utils/paseSessionStory";
import {
    getNextSession,
    getPreviousSession,
} from "../../store/campaign/campaignSelectors";
import { getSelectedCampaign, getSelectedSession, isDungeonMasterSelector } from "../../store/selected/selectedSelectors";

const renderers = {
    code: function (obj: any) {
        return (
            <SyntaxHighlighter
                style={dark}
                language={obj.language}
                children={obj.value}
            />
        );
    },
};
type CampaignSessionProps = {};
const CampaignSession: FunctionComponent<CampaignSessionProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [sessionStory, setSessionStory] = useState("");
    const [sessionImage1, setSessionImage1] = useState();
    const [sessionImage2, setSessionImage2] = useState();
    const [sessionImage3, setSessionImage3] = useState();
    const selectedSession = useSelector(getSelectedSession);
    const selectedCampaign = useSelector(getSelectedCampaign);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const nextSession = useSelector(getNextSession);
    const previousSession = useSelector(getPreviousSession);
    useEffect(() => {
        if (selectedSession.session && selectedSession.id) {
            let storageRef = storage
                .ref()
                .child("Campaigns")
                .child(selectedCampaign.campaign.title)
                .child("Sessions")
                .child(selectedSession.session.title);
            storageRef
                .child("SessionStory.md")
                .getDownloadURL()
                .then((url) => {
                    fetch(url)
                        .then((res) => res.text())
                        .then((res) => {
                            console.log(res)
                            const text = parseSessionStory(res, isDungeonMaster);
                            setSessionStory(text ? text : "new story");
                        })
                }).catch(e => { console.log("Could not fetch session story") })

            storageRef
                .child("SessionImageFile1")
                .getDownloadURL()
                .then((url) => setSessionImage1(url))
                .catch(() => console.log("could not get session image 1"));
            storageRef
                .child("SessionImageFile2")
                .getDownloadURL()
                .then((url) => setSessionImage2(url))
                .catch(() => console.log("could not get session image 2"));
            storageRef
                .child("SessionImageFile3")
                .getDownloadURL()
                .then((url) => setSessionImage3(url))
                .catch(() => console.log("could not get session image 3"));
        }
        return () => {
            setSessionStory("")
            setSessionImage1(undefined)
            setSessionImage2(undefined)
            setSessionImage3(undefined)
        }
    }, [dispatch, selectedSession, isDungeonMaster, selectedCampaign]);

    return (
        <>
            <Container>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        width: "100%",
                    }}
                >
                    <ChangeSessionButton
                        style={!previousSession ? { opacity: 0.6, cursor: "default" } : {}}
                        onClick={() => history.push(`${previousSession?.session.slug}`)}
                    >
                        Previous
          </ChangeSessionButton>
                    <ChangeSessionButton
                        style={!nextSession ? { opacity: 0.6, cursor: "default" } : {}}
                        onClick={() => history.push(`${nextSession?.session.slug}`)}
                    >
                        Next
          </ChangeSessionButton>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "1.5rem",
                                opacity: 0.8,
                                textAlign: "left",
                                margin: 0,
                            }}
                        >
                            Session: {selectedSession?.session.sessionDay}
                        </p>
                        <p
                            style={{
                                fontSize: "1rem",
                                opacity: 0.5,
                                textAlign: "left",
                                margin: 0,
                            }}
                        >
                            {selectedSession?.session.date}
                        </p>
                    </div>
                    {isDungeonMaster ? (
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                history.push(`/${selectedCampaign.campaign.slug}/${selectedSession.session.slug}/edit`);
                            }}
                        >
                            <EditIcon />
                        </Button>
                    ) : null}
                </div>
                <h2 style={{ fontSize: "3rem", textAlign: "center" }}>
                    {selectedSession?.session.title}
                </h2>
                <h3 style={{ fontSize: "2rem", textAlign: "center", opacity: 0.5 }}>
                    {selectedSession?.session.subTitle}
                </h3>
                <div style={{ fontFamily: "sans-serif" }}>
                    {sessionStory ? (
                        <ReactMarkdown
                            plugins={[[gfm, { singleTilde: false }]]}
                            renderers={renderers}
                        >
                            {sessionStory}
                        </ReactMarkdown>
                    ) : (
                            <IsLoading />
                        )}
                </div>
            </Container>
            {sessionImage1 ? <SessionImage src={sessionImage1} /> : null}
            {sessionImage2 ? <SessionImage src={sessionImage2} /> : null}
            {sessionImage3 ? <SessionImage src={sessionImage3} /> : null}
        </>
    );
};
const Container = styled.div`
  min-height: 50rem;
  min-width: 15rem;
  width: 50%;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
`;
const ChangeSessionButton = styled.h4`
  color: black;
  margin: 0;
  cursor: pointer;
`;
const SessionImage = styled.img`
  width: 50%;
  margin: 2rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
`;
export default CampaignSession;
