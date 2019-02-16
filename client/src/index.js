import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./store/reducers/reducers";
import reduxThunk from "redux-thunk";

//Importing react-notifications
import "react-notifications/lib/notifications.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
  <Provider
    store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}
  >
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
