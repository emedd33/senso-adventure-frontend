import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ReactMarkdown from "react-markdown";
import {
  dispatchSetSelectedSession,
  setSelectedSession,
} from "../../store/selected/selectedCreators";
import { Redirect, useHistory } from "react-router-dom";
import { setIsLoading } from "../../store/admin/adminCreator";
import { storage } from "../../firebase";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import IsLoading from "../../components/IsLoading/IsLoading";
import { parseSessionStory } from "../../utils/paseSessionStory";
import {
  getNextSession,
  getPreviousSession,
  isDungeonMasterSelector,
} from "../../store/campaign/campaignSelectors";
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
  const selectedSession = useSelector(
    (state: RootReducerProp) => state.selected.selectedSession
  );
  const selectedCampaign = useSelector(
    (state: RootReducerProp) => state.selected.selectedCampaign
  );
  const isDungeonMaster = useSelector(isDungeonMasterSelector);
  const nextSession = useSelector(getNextSession);
  const previousSession = useSelector(getPreviousSession);
  const changeSession = (session?: any) => {
    if (session) {
      dispatch(setSelectedSession(session));
    }
  };
  useEffect(() => {
    dispatch(setIsLoading(true));
    if (selectedSession.session) {
      let storageRef = storage
        .ref()
        .child("Campaigns")
        .child(selectedCampaign.campaign.title)
        .child("Sessions")
        .child(selectedSession.session.title);

      storageRef
        .child(selectedSession.session.story)
        .getDownloadURL()
        .then((url) =>
          fetch(url)
            .then((res) => res.text())
            .then((res) => {
              const text = parseSessionStory(res, isDungeonMaster);
              setSessionStory(text ? text : "new story");
            })
        )
        .catch((e) => console.log("error", e));
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
    dispatch(setIsLoading(false));
  }, [dispatch, selectedSession, isDungeonMaster, selectedCampaign]);
  if (!selectedSession.id) {
    return <Redirect to="/campaign" />;
  }

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
            onClick={() => changeSession(previousSession)}
          >
            Previous
          </ChangeSessionButton>
          <ChangeSessionButton
            style={!nextSession ? { opacity: 0.6, cursor: "default" } : {}}
            onClick={() => changeSession(nextSession)}
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
                dispatch(
                  dispatchSetSelectedSession({
                    id: selectedSession.id,
                    session: {
                      title: selectedSession.session.title,
                      subTitle: selectedSession.session.subTitle,
                      story: selectedSession.session.story,
                      date: selectedSession.session.date,
                      campaign: selectedSession.session.campaign,
                      sessionDay: selectedSession.session.sessionDay,
                    },
                  })
                );
                history.push("/campaign/session/edit");
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
