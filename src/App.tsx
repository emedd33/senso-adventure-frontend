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
import AlertDialog from "./components/AlertDialog/AlertDialog";
import IsLoading from "./components/IsLoading/IsLoading"
import CampaignIndex from "./pages/Campaign/CampaignIndex";
import LoginIndex from "./pages/Login/LoginIndex";
import StickyFooter from "./components/Footer/StickyFooter";
import ProfileIndex from "./pages/Profile/ProfileIndex";
import CampaignEdit from "./pages/CampaignEdit.tsx/CampaignEdit";
import Home from "./pages/Home/Home";
import { getAuthUser, getIsLoading } from "./store/admin/adminSelectors";
export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading)
  const authUser = useSelector(getAuthUser);
  useEffect(() => {
    dispatch(fetchFromFirebase);
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <>
        <AlertDialog />
        {isLoading ? <IsLoading /> : null}
        <Switch>
          <Route exact path="/login">
            {authUser ? <Redirect to="/" /> : <LoginIndex />}
          </Route>
          <Route exact path="/profile">
            {!authUser ? <Redirect to="/login" /> : <ProfileIndex />}
          </Route>
          <Route exact path="/editcampaign">
            <CampaignEdit />
          </Route>
          <Route path="/:id">
            <CampaignIndex />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <StickyFooter />
      </>
    </Router>
  );
}
