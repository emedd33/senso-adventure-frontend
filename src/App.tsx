import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CurseOfStrahd from "./pages/CurseOfStrahd";
import Home from "./pages/Home";
import { Spin } from 'antd';
import "./App.css"
export default function App() {
  const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
  return (
    <Router>
      <Navbar />
      <div>
        {isLoading ?
          <div style={{ alignItems: "center", justifyContent: "center", display: "flex", height: "100vh" }}>
            <Spin />
          </div>
          : <Switch>
            <Route path="/Curse_of_strahd">
              <CurseOfStrahd />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        }
      </div>
    </Router>
  );
}
