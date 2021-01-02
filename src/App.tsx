import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GlobalStyle from "./assets/themes/globalStyles";
import Navbar from "./components/Navbar/Navbar";
import CurseOfStrahd from "./pages/CurseOfStrahd";
import Home from "./pages/Home";

export default function App() {
  const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <div>
        {isLoading ?
          <div style={{ alignItems: "center", justifyContent: "center", display: "flex", height: "100vh" }}>
            <h1 style={{ color: "white" }}>hei</h1>
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
