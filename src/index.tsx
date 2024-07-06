import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux";
import { Provider } from "react-redux";
import "./i18n";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
