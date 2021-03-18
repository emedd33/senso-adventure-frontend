import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Campaign from "./Campaign";
import CampaignSessionEdit from "./CampaignSessionEdit";
import CampaignSessionNew from "./CampaignSessionNew";
import CampaignCharacterNew from "./CampaignCharacterNew";
import CampaignSession from "./CampaignSession";
import {
  getSelectedCampaign,
  getSelectedCampaignSlug,
  getSelectedCharacter,
  getSelectedLocation,
  getSelectedPlayer,
  getSelectedSession,
  isDungeonMasterSelector,
} from "../../store/selected/selectedSelectors";
import { storage } from "../../firebase";

import { setIsLoading } from "../../store/admin/adminCreator";
import IsLoading from "../../components/IsLoading/IsLoading";
import "react-tiny-fab/dist/styles.css";
import CampaignCharacter from "./CampaignCharacter";
import CampaignCharacterEdit from "./CampaignCharacterEdit";
import CampaignSessions from "./CampaignSessions";
import CampaignCharacters from "./CampaignCharacters";
import CampaignEdit from "../CampaignEdit.tsx/CampaignEdit";
import SensoFab from "../../components/SensoFab/SensoFab"
import dispatchSelectedByUrl from "../../store/selected/dispatchSelectedByUrl"
import CampaignLocationNew from "./CampaignLocationNew";
import CampaignLocations from "./CampaignLocations";
import CampaignLocation from "./CampaignLocation";
import CampaignLocationEdit from "./CampaignLocationEdit";
import { CampaignPlayers, CampaignPlayerNew, CampaignPlayer } from "./CampaignPlayers";
type CampaignIndexProps = {};
const CampaignIndex: FunctionComponent<CampaignIndexProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const campaigns = useSelector(
    (state: RootReducerProp) => state.rootCampaigns.campaigns
  );
  const selectedCampaign = useSelector(getSelectedCampaign);
  const selectedSession = useSelector(getSelectedSession);
  const selectedLocation = useSelector(getSelectedLocation);
  const selectedCharacter = useSelector(getSelectedCharacter);
  const selectedPlayer = useSelector(getSelectedPlayer);
  const selectedCampaignSlug = useSelector(getSelectedCampaignSlug)
  const isDungeonMaster = useSelector(isDungeonMasterSelector);
  const [imageUrl, setImageUrl] = useState("");

  useMemo(() => {
    let pathArray = location.pathname.split("/");
    dispatchSelectedByUrl(pathArray, dispatch, campaigns)
  }, [dispatch, campaigns, location]);
  useEffect(() => {
    setIsLoading(true);
    if (selectedCampaignSlug) {
      let campaignRef = storage
        .ref("Campaigns")
        .child(selectedCampaignSlug);

      // Fetching BackgroundImage
      campaignRef
        .child("BackgroundImage")
        .getDownloadURL()
        .then((url: string) => {
          setImageUrl(url);
        })
        .catch((e) => console.log("could not fetch background image"))
        .finally(() => dispatch(setIsLoading(false)));

    }
  }, [dispatch, selectedCampaignSlug]);
  let locationArray = location.pathname.split("/")
  if (locationArray.length >= 2 && !selectedCampaign) {
    return <IsLoading />;
  }
  if (locationArray.length >= 4 && locationArray[3] !== "new") {
    if (!selectedSession && !selectedCharacter && !selectedLocation && !selectedPlayer) {
      return <IsLoading />;
    }
  }
  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>

      <Switch>
        <Route exact path="/:campaignSlug/Edit">
          <CampaignEdit isNew={false} />
        </Route>
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
          {isDungeonMaster ? (
            <CampaignCharacterEdit />
          ) : (
            <Redirect to={"/"} />
          )}
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/:campaignSlug/players/">
          <CampaignPlayers />
        </Route>
        <Route exact path="/:campaignSlug/players/new">
          {isDungeonMaster ? <CampaignPlayerNew /> : <Redirect to={"/"} />}
        </Route>
        <Route exact path="/:campaignSlug/players/:playerSlug">
          <CampaignPlayer />
        </Route>
        {/*
        <Route exact path="/:campaignSlug/characters/:characterSlug/edit">
          {isDungeonMaster ? (
            <CampaignCharacterEdit />
          ) : (
            <Redirect to={"/"} />
          )}'
        </Route> */}
      </Switch>
      <Switch>
        <Route exact path="/:campaignSlug/locations/new">
          {isDungeonMaster ? <CampaignLocationNew /> : <Redirect to={"/"} />}
        </Route>
        <Route exact path="/:campaignSlug/locations">
          <CampaignLocations />
        </Route>
        <Route exact path="/:campaignSlug/locations/:locationSlug/edit">
          {isDungeonMaster ? <CampaignLocationEdit /> : <Redirect to={"/"} />}
        </Route>
        <Route exact path="/:campaignSlug/locations/:locationSlug">
          <CampaignLocation />
        </Route>
      </Switch>
      <Route exact path="/:campaignSlug">
        <Campaign />
      </Route>
      {isDungeonMaster ? (
        <SensoFab />
      ) : null}
    </Container>
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

