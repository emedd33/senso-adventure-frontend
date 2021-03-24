import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
    Redirect,
    Route,
    Switch,
    useLocation,
} from "react-router-dom";
import Campaign from "./Campaign";

import {
    getSelectedCampaign,
    getSelectedCampaignSlug,
    getSelectedMonster,
    getSelectedLocation,
    getSelectedPlayer,
    getSelectedSession,
} from "../../../store/selected/selectedSelectors";

import IsLoading from "../../../components/IsLoading/IsLoading";
import "react-tiny-fab/dist/styles.css";



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

                <Route exact path="/user/:username/campaigns/:campaignId">
                    <Campaign />
                </Route>
            </Switch>


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

