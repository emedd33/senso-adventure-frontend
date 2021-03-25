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


import { dispatchSelectedMonsterByUrl } from "../../../../store/selected/dispatchSelectedByUrl";
import Monsters from "./Monsters";
import MonsterEdit from "./MonsterEdit";
import Monster from "./Monster";
import NotFound from "../../../NotFound/NotFound";
// import MonsterEdit from "./MonsterEdit" 



type MonsterIndexProps = {};
const MonsterIndex: FunctionComponent<MonsterIndexProps> = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const selectedCampaign = useSelector(getSelectedCampaign)

    useMemo(() => {
        if (selectedCampaign && selectedCampaign.campaign.monsters) {
            let pathArray = location.pathname.split("/");
            dispatchSelectedMonsterByUrl(pathArray, dispatch, selectedCampaign.campaign.monsters)
        }

    }, [selectedCampaign, dispatch, location]);

    return (
        <Switch>
            <Route exact path="/user/:username/campaigns/:campaignslug/monsters/:monsterslug">
                <Monster />
            </Route>
            <Route exact path="/user/:username/campaigns/:campaignslug/monsters">
                <Monsters />
            </Route>
            <Route exact path="/user/:username/campaigns/:campaignslug/monsters/:monsterslug/edit">
                <MonsterEdit />
            </Route>
            <Route>
                <NotFound />
            </Route>

        </Switch>
    );
};

export default MonsterIndex;

