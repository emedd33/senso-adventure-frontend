import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import GlobalStyle from "./assets/themes/globalStyles";
import SideBar from "./components/SideBar";
import Adventure from "./pages/Adventure";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <SideBar />
      <Switch>
        <Route path="/adventure">
          <Adventure />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
