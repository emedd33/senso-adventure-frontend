import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
    Redirect,
    Route,
    Switch,
    useLocation,
} from "react-router-dom";
import Campaign from "./Campaign/Campaign";

import {
    getSelectedCampaign,
    getSelectedCampaignSlug,
    getSelectedMonster,
    getSelectedLocation,
    getSelectedPlayer,
    getSelectedSession,
} from "../../store/selected/selectedSelectors";

import IsLoading from "../../components/IsLoading/IsLoading";
import "react-tiny-fab/dist/styles.css";


import CampaignEdit from "../CampaignEdit.tsx/CampaignEdit";
import SensoFab from "../../components/SensoFab/SensoFab"
import UserHome from "./UserHome";
import { setCampaigns } from "../../store/campaign/campaignCreator";
import { database } from "../../services/Firebase/firebase";
import CampaignIndex from "./Campaign/CampaignIndex";

type UserIndexProps = {};
const UserIndex: FunctionComponent<UserIndexProps> = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const selectedCampaign = useSelector(getSelectedCampaign);
    const selectedSession = useSelector(getSelectedSession);
    const selectedLocation = useSelector(getSelectedLocation);
    const selectedMonster = useSelector(getSelectedMonster);
    const selectedPlayer = useSelector(getSelectedPlayer);
    const selectedCampaignSlug = useSelector(getSelectedCampaignSlug)
    const [imageUrl, setImageUrl] = useState("");

    // useMemo(() => {
    //     let pathArray = location.pathname.split("/");
    //     // dispatchSelectedByUrl(pathArray, dispatch, campaigns)

    // }, [dispatch, campaigns, location]);
    useMemo(async () => {
        if (location) {
            let owner = location.pathname.split("/")[2]
            database.ref(`users/${owner}/campaigns`).on("value", (campaigns) => dispatch(setCampaigns(campaigns.val()))
            )
        }
    }, [location])
    // useEffect(() => {
    //     setIsLoading(true);
    //     if (selectedCampaignSlug) {
    //         let campaignRef = storage
    //             .ref("Campaigns")
    //             .child(selectedCampaignSlug);

    //         // Fetching BackgroundImage
    //         campaignRef
    //             .child("BackgroundImage")
    //             .getDownloadURL()
    //             .then((url: string) => {
    //                 setImageUrl(url);
    //             })
    //             .catch((e) => console.log("could not fetch background image"))
    //             .finally(() => dispatch(setIsLoading(false)));

    //     }
    // }, [dispatch, selectedCampaignSlug]);
    let locationArray = location.pathname.split("/")
    // if (locationArray.length >= 2 && !selectedCampaign) {
    //     return <IsLoading />;
    // }
    // if (locationArray.length >= 4 && locationArray[3] !== "new") {
    //     if (!selectedSession && !selectedMonster && !selectedLocation && !selectedPlayer) {
    //         return <IsLoading />;
    //     }
    // }
    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
            <Switch>
                <Route path="/user/:username/">
                    <UserHome />
                </Route>
                <Route exact path="/user/:username/newcampaign">
                    <CampaignEdit isNew={true} />
                </Route>
                <Route path="/user/:username/campaigns/:campaignId">
                    <CampaignIndex />
                </Route>
            </Switch>

            <SensoFab />

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

