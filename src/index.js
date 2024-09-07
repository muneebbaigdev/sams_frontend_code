import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/css/material-dashboard-react.css?v=1.9.0";
import { AuthWrapper } from "auth/AuthWrapper";
const hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={hist}>

    <AuthWrapper />
 
  </BrowserRouter>,
  document.getElementById("root")
);
