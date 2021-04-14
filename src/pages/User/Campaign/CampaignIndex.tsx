import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Route, Switch, useLocation } from "react-router-dom";
import Campaign from "./Campaign";
import CampaignEdit from "./CampaignEdit";
import Campaigns from "./Campaigns";
import SensoFab from "../../../components/SensoFab/SensoFab";
import {
  isDungeonMasterSelector,
  getSelectedCampaignStoragePath,
} from "../../../store/selected/selectedSelectors";

import { setIsLoading } from "../../../store/admin/adminCreator";
import { getUrlFromStorage } from "../../../services/Firebase/storage";
import { dispatchSelectedCampaignByUrl } from "../../../store/selected/dispatchSelectedByUrl";
import { getAllCampaigns } from "../../../store/campaign/campaignSelectors";
import PlayerNew from "./Player/PlayerNew";
import MonsterNew from "./Monster/MonsterNew";
import SessionNew from "./Session/SessionNew";
import LocationNew from "./Location/LocationNew";
import MonsterIndex from "./Monster/MonsterIndex";
import SessionIndex from "./Session/SessionIndex";
import PlayerIndex from "./Player/PlayerIndex";
import LocationIndex from "./Location/LocationIndex";
import NotFound from "../../NotFound/NotFound";
import CampaignIndexTabs from "./CampaignIndexTabs";
type UserIndexProps = {};
const UserIndex: FunctionComponent<UserIndexProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isDungeonMaster = useSelector(isDungeonMasterSelector);
  const campaigns = useSelector(getAllCampaigns);
  const selectedCampaignStoragePath = useSelector(
    getSelectedCampaignStoragePath
  );
  const [imageUrl, setImageUrl] = useState("");
  
  useMemo(() => {
    if (campaigns) {
      let pathArray = location.pathname.split("/");
      dispatchSelectedCampaignByUrl(pathArray, dispatch, campaigns);
    }
 
  }, [dispatch, campaigns, location]);

  useEffect(() => {
    setIsLoading(true);
    if (selectedCampaignStoragePath) {
      getUrlFromStorage(selectedCampaignStoragePath + "/BackgroundImage")
        .then((url: string) => {
          setImageUrl(url);
        })
        .catch((e) => console.log("could not fetch background image"))
        .finally(() => dispatch(setIsLoading(false)));
    }
  }, [dispatch, selectedCampaignStoragePath]);

  return (
    <Container style={imageUrl ? {
      background: `
      linear-gradient(to right, transparent,transparent, black),
      linear-gradient(to left, transparent,transparent, black),
      no-repeat url(${imageUrl})`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",

    } : {}}>
      <CampaignIndexTabs />
      <Switch>
        <Route exact path="/user/:username/campaigns/:campaignId/new-player">
          <PlayerNew />
        </Route>
        <Route exact path="/user/:username/campaigns/:campaignId/new-monster">
          <MonsterNew />
        </Route>
        <Route exact path="/user/:username/campaigns/:campaignId/new-location">
          <LocationNew />
        </Route>
        <Route exact path="/user/:username/campaigns/:campaignId/new-session">
          <SessionNew />
        </Route>
        <Route exact path="/user/:username/campaigns">
          <Campaigns />
        </Route>
        <Route exact path="/user/:username/campaigns/:campaignId">
          <Campaign />
        </Route>
        <Route exact path="/user/:username/campaigns/:campaignId/edit">
          <CampaignEdit />
        </Route>
        <Route path="/user/:username/campaigns/:campaignId/players">
          <PlayerIndex />
        </Route>
        <Route path="/user/:username/campaigns/:campaignId/monsters">
          <MonsterIndex />
        </Route>
        <Route path="/user/:username/campaigns/:campaignId/locations">
          <LocationIndex />
        </Route>
        <Route path="/user/:username/campaigns/:campaignId/sessions">
          <SessionIndex />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {isDungeonMaster ? <SensoFab /> : null}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  width:100%;
  height:100%;
  flex-direction: column;
  min-height: 100vh
`;

export default UserIndex;
