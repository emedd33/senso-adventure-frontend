import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MapMakerIndex from "./pages/Mapmaker/MapmakerIndex"
import "./App.scss";
import AlertDialog from "./components/AlertDialog/AlertDialog";
import LoginIndex from "./pages/Login/LoginIndex";
import NotFound from "./pages/NotFound/NotFound";
import StickyFooter from "./components/Footer/StickyFooter";
import ProfileIndex from "./pages/Profile/ProfileIndex";
import Home from "./pages/Home/Home";
import { getAuthUser, getAuthUserPath } from "./store/admin/adminSelectors";
import styled from "styled-components";
import { authentication } from "./services/Firebase/firebase";
import { setAuthUser } from "./store/admin/adminCreator";
import UserIndex from "./pages/User/UserIndex";
import { useTranslation } from "react-i18next";
import backgroundImage from "./assets/Images/background_home.jpg"
export default function App() {
  const dispatch = useDispatch();
  const translate = useTranslation()
  const authUser = useSelector(getAuthUser);
  const authUserPath = useSelector(getAuthUserPath);
  useMemo(() => {
    authentication.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setAuthUser(user));
      }
    });
  }, [dispatch]);
  useMemo(() => {
    const cachedLanguage = window.localStorage.getItem("language")
    if (cachedLanguage) {
      translate.i18n.changeLanguage(cachedLanguage)
    }
  }, [translate.i18n])
  return (
    <Router>
      <AlertDialog />
      <Navbar />
      <Container>

        <Switch>
          <Route exact path="/profile">
            {authUser && authUser.displayName ? (
              <ProfileIndex />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/login">
            {authUser && authUser.displayName ? (
              <Redirect to="/" />
            ) : (
              <LoginIndex />
            )}
          </Route>
          <Route path="/user/:username/">
            <UserIndex />
          </Route>
          <Route exact path="/mapmaker">
            <MapMakerIndex />
          </Route>
          <Route exact path="/">
            {authUserPath ? <Redirect to={authUserPath} /> : <Home />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Container>
      <StickyFooter />
    </Router>
  );
}
const Container = styled.div`
background: linear-gradient(to right, transparent,transparent, black), linear-gradient(to left, transparent,transparent, black), no-repeat url(${backgroundImage});
background-attachment: fixed;
background-size: cover;
min-height:100vh;
`