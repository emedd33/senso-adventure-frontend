import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CurseOfStrahd from "./pages/CurseOfStrahd";
import { Spin } from 'antd';
import "./App.css"
import { fetchCampaigns } from "./store/campaign/campaignCreators";
import { Global } from "./assets/styles/global";
import Home from "./pages/Home";
export default function App() {
  const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCampaigns)
  }, [dispatch])
  return (
    <Router>
      <Global />
      <Navbar />
      <div style={{}}>
        {isLoading ?
          <div style={{ alignItems: "center", justifyContent: "center", display: "flex", height: "100vh" }}>
            <Spin />
          </div>
          : <Switch>
            <Route exact path="/curseOfStrahd">
              <CurseOfStrahd />
            </Route>
            <Route path="/">
              {/* <TodoPage /> */}
              <Home />
            </Route>
          </Switch>
        }
      </div>
    </Router>
  );
}
