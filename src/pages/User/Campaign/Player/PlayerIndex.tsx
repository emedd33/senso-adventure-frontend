import React, { FunctionComponent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";

import { getSelectedCampaign } from "../../../../store/selected/selectedSelectors";

import { dispatchSelectedPlayerByUrl } from "../../../../store/selected/dispatchSelectedByUrl";
import Players from "./Players";
import Player from "./Player";
import PlayerEdit from "./PlayerEdit";

type PlayerIndexProps = {};
const PlayerIndex: FunctionComponent<PlayerIndexProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedCampaign = useSelector(getSelectedCampaign);

  useMemo(() => {
    if (selectedCampaign && selectedCampaign.campaign.players) {
      let pathArray = location.pathname.split("/");
      dispatchSelectedPlayerByUrl(
        pathArray,
        dispatch,
        selectedCampaign.campaign.players
      );
    }
  }, [selectedCampaign, dispatch, location]);

  return (
    <Switch>
      <Route exact path="/user/:username/campaigns/:campaignslug/players">
        <Players />
      </Route>

      <Route
        exact
        path="/user/:username/campaigns/:campaignslug/players/:playerslug"
      >
        <Player />
      </Route>

      <Route
        exact
        path="/user/:username/campaigns/:campaignslug/players/:playerslug/edit"
      >
        <PlayerEdit />
      </Route>
    </Switch>
  );
};

export default PlayerIndex;
