import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css"
import { fetchFromFirebase } from "./store/campaign/campaignCreators";
import HomeIndex from "./pages/Home/HomeIndex";
import AlertDialog from "./components/AlertDialog/AlertDialog";
import CampaignIndex from "./pages/Campaign/CampaignIndex";
import LoginIndex from "./pages/Login/LoginIndex";
export default function App() {
  const dispatch = useDispatch()
  const authUser = useSelector((state: RootReducerProp) => state.admin.authUser)
  useEffect(() => {
    dispatch(fetchFromFirebase)
  }, [dispatch])
  return (
    <Router>
      <Navbar />
      <div style={{}}>
        <AlertDialog />
        <Switch>
          <Route path="/campaign" >
            <CampaignIndex />
          </Route>
          <Route path="/login">
            {authUser ?
              <Redirect to="/" /> :
              <LoginIndex />}
          </Route>
          <Route path="/">
            <HomeIndex />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
