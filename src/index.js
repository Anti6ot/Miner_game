import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";

const store = createStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
const history = createBrowserHistory();

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
