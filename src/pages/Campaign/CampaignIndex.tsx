import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Campaign from "./Campaign";
import CampaignSessionEdit from "./CampaignSessionEdit";
import CampaignSessionNew from "./CampaignSessionNew";
import CampaignCharacterNew, { NEW_CHARACTER } from "./CampaignCharacterNew";
import CampaignSession from "./CampaignSession";
import { getSelectedCampaign, getSelectedCharacter, getSelectedSession, isDungeonMasterSelector } from "../../store/selected/selectedSelectors";
import { storage } from "../../firebase";
import { setSelectedCampaign, setSelectedCharacter, setSelectedSession } from "../../store/selected/selectedCreators";
import isValidSessionSlug from "../../utils/isValidSessionslug"
import { setIsLoading } from "../../store/admin/adminCreator";
import AddIcon from '@material-ui/icons/Add';
import IsLoading from "../../components/IsLoading/IsLoading";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { initialSelectedSessionState } from "../../store/selected/selectedReducer";
import CampaignCharacter from "./CampaignCharacter";
import isValidSlug from "../../utils/isValidSessionslug";
import CampaignCharacterEdit from "./CampaignCharacterEdit";
import CampaignSessions from "./CampaignSessions"
import CampaignCharacters from "./CampaignCharacters"

type CampaignIndexProps = {};
const CampaignIndex: FunctionComponent<CampaignIndexProps> = () => {
  const location = useLocation()
  const history = useHistory();
  const dispatch = useDispatch()
  const campaigns = useSelector((state: RootReducerProp) => state.rootCampaigns.campaigns)
  const selectedCampaign = useSelector(getSelectedCampaign);
  const selectedSession = useSelector(getSelectedSession);
  const selectedCharacter = useSelector(getSelectedCharacter);
  const isDungeonMaster = useSelector(isDungeonMasterSelector);
  const [imageUrl, setImageUrl] = useState("");
  const [campaignTitleImage, setCampaignTitleImage] = useState<string>("");

  useEffect(() => {
    let pathArray = location.pathname.split("/")
    if (pathArray.length >= 2) {
      let filteredCampaign = Object.entries(campaigns)
        .filter(([, campaign]: [string, ICampaign]) => {
          return campaign.slug === pathArray[1]
        })
        .map(([id, campaign]: [string, ICampaign]) => { return { id: id, campaign: campaign } })
      if (filteredCampaign.length >= 1) {
        let campaign = { id: filteredCampaign[0].id, campaign: filteredCampaign[0].campaign }
        dispatch(setSelectedCampaign(campaign))
        if (pathArray.length >= 4) {
          if (pathArray[2] === "characters") {
            if (isValidSlug(pathArray[3]) && campaign.campaign.characters) {
              let filteredCharacter = Object.entries(campaign.campaign.characters)
                .filter(([, character]: [string, ICharacter]) => character.slug === pathArray[3])
                .map(([id, character]: [string, ICharacter]) => { return { id: id, character: character } })
              if (filteredCharacter.length >= 1) {
                let character: ISelectedCharacter = { id: filteredCharacter[0].id, character: filteredCharacter[0].character }
                dispatch(setSelectedCharacter(character))
              }
            }
          }
          if (pathArray[2] === "sessions") {
            if (isValidSessionSlug(pathArray[3]) && campaign.campaign.sessions) {
              let filteredSession = Object.entries(campaign.campaign.sessions)
                .filter(([, session]: [string, ISession]) => session.slug === pathArray[3])
                .map(([id, session]: [string, ISession]) => { return { id: id, session: session } })
              if (filteredSession.length >= 1) {
                let session = { id: filteredSession[0].id, session: filteredSession[0].session }
                dispatch(setSelectedSession(session))
              }
            }
          }
        }
      }
    }
  }, [dispatch, campaigns, location])
  useEffect(() => {
    setIsLoading(true)
    if (selectedCampaign) {

      let campaignRef = storage
        .ref("Campaigns")
        .child(selectedCampaign.campaign.title);

      // Fetching BackgroundImage
      campaignRef
        .child("BackgroundImage")
        .getDownloadURL()
        .then((url: string) => {
          setImageUrl(url);
        })
        .catch((e) => console.log("could not fetch background image"))
      // Fetching Title Image
      campaignRef
        .child("TitleImage")
        .getDownloadURL()
        .then((url) => {
          setCampaignTitleImage(url);
        })
        .catch((e) => console.log("Could not fetch Campaign image"))
        .finally(() => dispatch(setIsLoading(false)));
    }
  },
    [dispatch, selectedCampaign])

  if (location.pathname.split("/").length >= 2 && !selectedCampaign) {
    return <IsLoading />
  }
  if (location.pathname.split("/").length >= 4) {
    if (!selectedSession && !selectedCharacter) {
      return <IsLoading />
    }
  }
  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      {campaignTitleImage ? (
        <img
          src={campaignTitleImage}
          alt="Campaign title"
          style={{
            minWidth: "20rem",
            width: "40%",
            maxHeight: "30rem",
            marginBottom: "1rem",
          }}
        />
      ) : null}
      <>
        <Switch>
          <Route exact path="/:campaignSlug/sessions/new">
            {isDungeonMaster ? <CampaignSessionNew /> : <Redirect to={"/"} />}
          </Route>
          <Route exact path="/:campaignSlug/sessions/">
            <CampaignSessions />
          </Route>
          <Route exact path="/:campaignSlug/sessions/:sessionSlug">
            <CampaignSession />
          </Route>
        </Switch>
        <Route exact path="/:campaignSlug/sessions/:sessionSlug/edit">
          {isDungeonMaster ? <CampaignSessionEdit /> : <Redirect to={"/"} />}
        </Route>
        <Switch>
          <Route exact path="/:campaignSlug/characters/">
            <CampaignCharacters />
          </Route>
          <Route exact path="/:campaignSlug/characters/new">
            {isDungeonMaster ? <CampaignCharacterNew /> : <Redirect to={"/"} />}
          </Route>
          <Route exact path="/:campaignSlug/characters/:characterSlug">
            <CampaignCharacter />
          </Route>
          <Route exact path="/:campaignSlug/characters/:characterSlug/edit">
            {isDungeonMaster ? <CampaignCharacterEdit /> : <Redirect to={"/"} />}
          </Route>
        </Switch>
        <Route exact path="/:campaignSlug">
          <Campaign />
        </Route>
      </>
      {isDungeonMaster ?
        <Fab
          icon={<AddIcon />}
          alwaysShowTitle={true}
          onClick={() => console.log("clicked")}
        >
          <Action
            text="New session"
            onClick={() => {
              dispatch(setSelectedSession({ id: "", session: initialSelectedSessionState }))
              if (selectedCampaign) {

                history.push(`/${selectedCampaign.campaign.slug}/sessions/new`);
              }
            }}
          ></Action>
          <Action
            text="New Character"

            onClick={() => {
              if (selectedCampaign) {
                dispatch(setSelectedCharacter({ id: "", character: NEW_CHARACTER }))
                history.push(`/${selectedCampaign.campaign.slug}/characters/new`)
              }
            }
            }
          >
            <i className="fa fa-help" />
          </Action>
          <Action
            text="New Place"
            onClick={() => console.log("clicked h")}
          >
            <i className="fa fa-help" />
          </Action>
        </Fab> : null
      }
    </Container >
  );
};
const Container = styled.div`
  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10rem;
  width: 100%;
  height: 100%;
  padding-bottom: 10rem;
  min-height: 100vh;
`;

export default CampaignIndex;
