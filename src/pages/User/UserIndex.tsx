import React, { FunctionComponent, useMemo, } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
    Route,
    Switch,
    useLocation,
} from "react-router-dom";



import "react-tiny-fab/dist/styles.css";


import CampaignEdit from "../CampaignEdit.tsx/CampaignEdit";
import UserHome from "./UserHome";
import { setCampaigns } from "../../store/campaign/campaignCreator";
import { database } from "../../services/Firebase/firebase";
import CampaignIndex from "./Campaign/CampaignIndex";
import useOwner from "../../store/hooks/useOwner";
import NotFound from "../NotFound/NotFound";

type UserIndexProps = {};
const UserIndex: FunctionComponent<UserIndexProps> = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const owner = useOwner()

    useMemo(() => {
        if (location) {
            database.ref(`users/${owner}/campaigns`).on("value", (campaigns) => {
                dispatch(setCampaigns(campaigns.val()))
            }
            )
        }
    }, [location, owner, dispatch])


    return (
        <Container >

            <Switch>
                < Route exact path="/user/:username/newcampaign">
                    <CampaignEdit isNew={true} />
                </Route>
                <Route path="/user/:username/campaigns">
                    <CampaignIndex />
                </Route>
                <Route exact path="/user/:username/">
                    <UserHome />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>

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
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export default UserIndex;

