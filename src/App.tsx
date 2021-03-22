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
import CampaignIndex from "./pages/Campaign/CampaignIndex";
import LoginIndex from "./pages/Login/LoginIndex";
import StickyFooter from "./components/Footer/StickyFooter";
import ProfileIndex from "./pages/Profile/ProfileIndex";
import CampaignEdit from "./pages/CampaignEdit.tsx/CampaignEdit";
import CampaignHome from "./pages/Campaign/CampaignHome"
import Home from "./pages/Home/Home";
import { getAuthUser } from "./store/admin/adminSelectors";
export default function App() {
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthUser);
  useEffect(() => {
    dispatch(fetchFromFirebase);
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: "100%" }}>
        <AlertDialog />
        <Switch>
          <Route exact path="/login">
            {authUser ? <Redirect to="/" /> : <LoginIndex />}
          </Route>
          {authUser ?
            <Switch>
              <Route exact path="/profile">
                <ProfileIndex />
              </Route>
              <Route exact path="/newcampaign">
                <CampaignEdit isNew={true} />
              </Route>
              <Route path="/:id">
                <CampaignIndex />
              </Route>
              <Route path="/">
                <CampaignHome />
              </Route>

            </Switch>
            :
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          }
        </Switch>
      </div>
      <StickyFooter />
    </Router>
  );
}
