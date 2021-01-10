import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CurseOfStrahd from "./pages/CurseOfStrahd";
import "./App.css"
import { fetchCampaigns } from "./store/campaign/campaignCreators";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCampaigns)
  }, [dispatch])
  return (
    <Router>
      <Navbar />
      <div style={{}}>

        <Switch>
          <Route exact path="/curseOfStrahd">
            <CurseOfStrahd />
          </Route>
          <Route exact path="/login">

            <Login />
          </Route>
          <Route exact path="/login/signup">

            <SignUp />
          </Route>
          <Route path="/">

            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
