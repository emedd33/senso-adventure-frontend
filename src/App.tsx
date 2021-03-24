import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import { fetchFromFirebase } from "./store/campaign/campaignCreators";
import AlertDialog from "./components/AlertDialog/AlertDialog";
import LoginIndex from "./pages/Login/LoginIndex";
import NotFound from "./pages/NotFound/NotFound"
import StickyFooter from "./components/Footer/StickyFooter";
import ProfileIndex from "./pages/Profile/ProfileIndex";
import CampaignEdit from "./pages/CampaignEdit.tsx/CampaignEdit";
import CampaignHome from "./pages/Campaign/CampaignHome"
import Home from "./pages/Home/Home";
import { getAuthUser, getAuthUserPath, getIsLoading } from "./store/admin/adminSelectors";
import { isDungeonMasterSelector } from "./store/selected/selectedSelectors";
import styled from "styled-components";
import IsLoading from "./components/IsLoading/IsLoading";
export default function App() {
  const dispatch = useDispatch();

  const authUser = useSelector(getAuthUser);
  const authUserPath = useSelector(getAuthUserPath)
  useEffect(() => {
    if (authUser.displayName) {
      dispatch((dispatch: any) => fetchFromFirebase(dispatch, authUser.displayName));
    }
  }, [dispatch, authUser]);
  return (
    <Router>
      <AlertDialog />
      <Navbar />
      <LeftGradientDiv style={{ left: 0 }} />
      <RightGradientDiv style={{ right: 0 }} />
      <Switch>
        <Route exact path="/profile">
          {authUser ? <ProfileIndex /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {authUser && authUser.displayName ? <Redirect to="/" /> : <LoginIndex />}
        </Route>
        <Route path="/user/:username/">
          <Switch>
            <Route exact path="/user/:username/">
              <CampaignHome />
            </Route>
            <Route exact path="/user/:username/newcampaign">
              <CampaignEdit isNew={true} />
            </Route>
          </Switch>
        </Route>
        <Route exact path="/">
          {authUserPath ? <Redirect to={authUserPath} /> : <Home />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {/*
          <Switch>
            
            <Route path="/user/:username/:campaignId">
              <CampaignIndex />
            </Route>
            <Route path="/user/:username/">
              <CampaignHome />
            </Route> 
<Route path="/">
            {authUser ? <Redirect to={`/user/${authUser.username}`} /> : <Home />}
          </Route> 
        </Switch>*/}
      <StickyFooter />
    </Router >
  );
}


const LeftGradientDiv = styled.div`
  background: linear-gradient(to right, #000, transparent);
  width: 10vw;
  height: 100%;
  position: fixed;
  top: 0;
  backgroundcolor: black;
`;
const RightGradientDiv = styled.div`
  background: linear-gradient(to left, #000, transparent);
  width: 10vw;
  height: 100%;
  position: fixed;
  top: 0;
  backgroundcolor: black;
`;