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
import { fetchCampaigns } from "./store/campaign/campaignCreators";
import HomeIndex from "./pages/Home/HomeIndex";
import AlertDialog from "./components/AlertDialog/AlertDialog";
import { SET_AUTH_USER } from "./store/admin/adminActions";
import CampaignIndex from "./pages/Campaign/CampaignIndex";
import LoginIndex from "./pages/Login/LoginIndex";
import { firebaseAuth } from "./firebase";
export default function App() {
  const dispatch = useDispatch()
  const authUser = useSelector((state: RootReducerProp) => state.admin.authUser)
  useEffect(() => {
    dispatch(fetchCampaigns)
    firebaseAuth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch({
          type: SET_AUTH_USER,
          payload: {
            username: user.displayName,
            email: user.email
          }
        })
      }
    });
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
