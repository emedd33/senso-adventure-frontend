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
import AlertDialog from "./components/AlertDialog/AlertDialog";
import LoginIndex from "./pages/Login/LoginIndex";
import NotFound from "./pages/NotFound/NotFound"
import StickyFooter from "./components/Footer/StickyFooter";
import ProfileIndex from "./pages/Profile/ProfileIndex";
import Home from "./pages/Home/Home";
import { getAuthUser, getAuthUserPath, getIsLoading } from "./store/admin/adminSelectors";
import { isDungeonMasterSelector } from "./store/selected/selectedSelectors";
import styled from "styled-components";
import { authentication } from "./services/Firebase/firebase";
import { setAuthUser } from "./store/admin/adminCreator";
import UserIndex from "./pages/User/UserIndex";
export default function App() {
  const dispatch = useDispatch();

  const authUser = useSelector(getAuthUser);
  const authUserPath = useSelector(getAuthUserPath)
  useEffect(() => {
    authentication.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setAuthUser(user));
      }
    });
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
          <UserIndex />
        </Route>
        <Route path="/user/:username/">
          <Switch>

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
            
            <Route path="/user/:username/">
              <CampaignHome />
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