import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
    Route,
    Switch,
    useLocation,
} from "react-router-dom";
import Campaign from "./Campaign";
import SensoFab from "../../../components/SensoFab/SensoFab"

import {
    isDungeonMasterSelector,
    getSelectedCampaignStoragePath,
} from "../../../store/selected/selectedSelectors";

import { setIsLoading } from "../../../store/admin/adminCreator";
import { getUrlFromStorage } from "../../../services/Firebase/storage";
import dispatchSelectedByUrl from "../../../store/selected/dispatchSelectedByUrl";
import { getAllCampaigns } from "../../../store/campaign/campaignSelectors";



type UserIndexProps = {};
const UserIndex: FunctionComponent<UserIndexProps> = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const campaigns = useSelector(getAllCampaigns)
    const selectedCampaignStoragePath = useSelector(getSelectedCampaignStoragePath)
    const [imageUrl, setImageUrl] = useState("");

    useMemo(() => {
        if (campaigns) {

            let pathArray = location.pathname.split("/");
            dispatchSelectedByUrl(pathArray, dispatch, campaigns)
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

    // if (locationArray.length >= 4 && locationArray[3] !== "new") {
    //     if (!selectedSession && !selectedMonster && !selectedLocation && !selectedPlayer) {
    //         return <IsLoading />;
    //     }
    // }
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
            <Switch>

                <Route exact path="/user/:username/campaigns/:campaignId">
                    <Campaign />
                </Route>
            </Switch>

            {isDungeonMaster ?
                <SensoFab />
                : null}

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
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export default UserIndex;

