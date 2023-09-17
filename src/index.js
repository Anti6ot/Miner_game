import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const root = ReactDOM.createRoot(document.getElementById("root"));
const history = createBrowserHistory();

root.render(
  <Router history={history}>
    <App />
  </Router>
);
