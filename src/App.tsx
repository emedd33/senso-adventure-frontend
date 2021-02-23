import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import { fetchFromFirebase } from "./store/campaign/campaignCreators";
import HomeIndex from "./pages/Home/HomeIndex";
import AlertDialog from "./components/AlertDialog/AlertDialog";
import CampaignIndex from "./pages/Campaign/CampaignIndex";
import LoginIndex from "./pages/Login/LoginIndex";
import StickyFooter from "./components/Footer/StickyFooter";
import ProfileIndex from "./pages/Profile/ProfileIndex";
export default function App() {
  const dispatch = useDispatch();
  const authUser = useSelector(
    (state: RootReducerProp) => state.admin.authUser
  );
  useEffect(() => {
    dispatch(fetchFromFirebase);
  }, [dispatch]);
  return (
    <Router>
      <Navbar />

      <>
        <AlertDialog />
        <Switch>
          <Route exact path="/login">
            {authUser ? <Redirect to="/" /> : <LoginIndex />}
          </Route>
          <Route exact path="/profile">
            {!authUser ? <Redirect to="/login" /> : <ProfileIndex />}
          </Route>
          <Route exact path="/">
            <HomeIndex />
          </Route>
          <Route path="/:id">
            <CampaignIndex />
          </Route>
        </Switch>
        <StickyFooter />
      </>
    </Router>
  );
}
