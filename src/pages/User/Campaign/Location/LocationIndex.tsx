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


import { dispatchSelectedLocationByUrl } from "../../../../store/selected/dispatchSelectedByUrl";
import Locations from "./Locations";
import LocationEdit from "./LocationEdit";
import Location from "./Location";
import NotFound from "../../../NotFound/NotFound";




type LocationIndexProps = {};
const LocationIndex: FunctionComponent<LocationIndexProps> = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const selectedCampaign = useSelector(getSelectedCampaign)

    useMemo(() => {
        if (selectedCampaign && selectedCampaign.campaign.locations) {
            let pathArray = location.pathname.split("/");
            dispatchSelectedLocationByUrl(pathArray, dispatch, selectedCampaign.campaign.locations)
        }

    }, [selectedCampaign, dispatch, location]);

    return (
        <Switch>
            <Route exact path="/user/:username/campaigns/:campaignslug/locations/:locationslug">
                <Location />
            </Route>
            <Route exact path="/user/:username/campaigns/:campaignslug/locations">
                <Locations />
            </Route>
            <Route exact path="/user/:username/campaigns/:campaignslug/locations/:locationslug/edit">
                <LocationEdit />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
};

export default LocationIndex;

