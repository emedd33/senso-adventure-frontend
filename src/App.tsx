import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GlobalStyle from './assets/themes/globalStyles';
import Home from "./pages/home/home";

function App() {
  return (
    <Router>
      <GlobalStyle/>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
