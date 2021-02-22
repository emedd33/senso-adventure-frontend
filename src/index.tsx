import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Helmet } from "react-helmet";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Senso Adventure</title>
        <link rel="icon" type="image/png" href="home_crest.png" sizes="16x16" />
      </Helmet>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
