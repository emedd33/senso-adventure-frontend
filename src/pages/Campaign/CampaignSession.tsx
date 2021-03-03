import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import {
    getNextSession,
    getPreviousSession,
} from "../../store/campaign/campaignSelectors";

import { getSelectedCampaign, getSelectedSession, getSelectedSessionStorageRef, isDungeonMasterSelector } from "../../store/selected/selectedSelectors";
import DraftJSEditor from "../../components/DraftJSEditor/DraftJSEditor";

type CampaignSessionProps = {};
const CampaignSession: FunctionComponent<CampaignSessionProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [sessionImages, setSessionImages] = useState<string[]>([]);

    const selectedSession = useSelector(getSelectedSession);
    const selectedCampaign = useSelector(getSelectedCampaign);
    const storageRef = useSelector(getSelectedSessionStorageRef)
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const nextSession = useSelector(getNextSession);
    const previousSession = useSelector(getPreviousSession);
    useEffect(() => {
        if (selectedSession) {

            if (storageRef) {

                storageRef
                    .child("SessionImages").listAll()
                    .then((res) => {
                        res.items.forEach((itemRef) => {
                            itemRef.getDownloadURL()
                                .then(url => {
                                    setSessionImages(urls => {
                                        if (!urls.includes(url)) {
                                            return [...urls, url]
                                        }
                                        return urls
                                    })
                                })
                                .catch(e => console.log("Could not connect to firebase", e))
                        });

                    }).catch((error) => {
                        console.log("Error fetching session images", error)
                    });

            }
        }
        return () => {
            setSessionImages([])
        }
    }, [dispatch, selectedSession, isDungeonMaster, selectedCampaign, storageRef]);

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
                                if (selectedCampaign && selectedSession) {

                                    history.push(`/${selectedCampaign.campaign.slug}/sessions/${selectedSession.session.slug}/edit`);
                                }
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
                <DraftJSEditor readOnly={true} JSONRef={storageRef?.child("SessionStory.json")} />
            </Container>

            {sessionImages ? sessionImages.map((url) => <img src={url} alt="SessionImage" style={{ width: "10rem", height: "10rem" }} />) : null}

        </>
    );
};
const Container = styled.div`
  min-height: 20rem;
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
export default CampaignSession;
