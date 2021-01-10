import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CurseOfStrahd from "./pages/CurseOfStrahd";
import "./App.css"
import { fetchCampaigns } from "./store/campaign/campaignCreators";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AlertDialog from "./components/AlertDialog/AlertDialog";
export default function App() {
  const dispatch = useDispatch()
  const authUser = useSelector((state: RootReducerProp) => state.admin.authUser)
  useEffect(() => {
    dispatch(fetchCampaigns)
  }, [dispatch])
  return (
    <Router>
      <Navbar />
      <div style={{}}>
        <AlertDialog />

        <Switch>
          <Route exact path="/curseOfStrahd">
            <CurseOfStrahd />
          </Route>
          <Route exact path="/login">
            {authUser ?
              <Redirect to="/" /> :
              <Login />}
          </Route>
          <Route exact path="/login/signup">

            {authUser ?
              <Redirect to="/" /> :
              <SignUp />}
          </Route>
          <Route path="/">

            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
