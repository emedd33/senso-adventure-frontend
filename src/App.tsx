import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GlobalStyle from './assets/themes/globalStyles';
import Home from "./pages/home/home";
import SideBar from "./components/SideBar";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "stretch", alignItems: "stretch" }}>
        <SideBar />
        <div style={{ flex: 1, width: "100%" }}>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
