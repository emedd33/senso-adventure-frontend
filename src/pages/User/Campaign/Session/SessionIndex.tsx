import React, { FunctionComponent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Route,
    Switch,
    useLocation,
} from "react-router-dom";

import {
    getSelectedCampaign,
} from "../../../../store/selected/selectedSelectors";

import { dispatchSelectedSessionByUrl } from "../../../../store/selected/dispatchSelectedByUrl";
import Sessions from "./Sessions";
import Session from "./Session";
import SessionEdit from "./SessionEdit"



type SessionIndexProps = {};
const SessionIndex: FunctionComponent<SessionIndexProps> = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const selectedCampaign = useSelector(getSelectedCampaign)

    useMemo(() => {
        if (selectedCampaign && selectedCampaign.campaign.sessions) {
            let pathArray = location.pathname.split("/");
            dispatchSelectedSessionByUrl(pathArray, dispatch, selectedCampaign.campaign.sessions)
        }

    }, [selectedCampaign, dispatch, location]);

    return (
        <Switch>

            <Route exact path="/user/:username/campaigns/:campaignslug/sessions">
                <Sessions />
            </Route>


            <Route exact path="/user/:username/campaigns/:campaignslug/sessions/:sessionslug">
                <Session />
            </Route>

            <Route exact path="/user/:username/campaigns/:campaignslug/sessions/:sessionslug/edit">
                <SessionEdit />
            </Route>


        </Switch>
    );
};

export default SessionIndex;

