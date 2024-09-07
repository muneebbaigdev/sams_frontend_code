import React from "react";
import { Route,Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Login from './Login';
import Admin from 'layouts/Admin';
import RTL from 'layouts/RTL'


export const publicroutes = [
     <Route key={1} path="/login" component={Login} />,
     <Redirect from="/" to="/login" />
     ]
export const privateroutes = [
     <Route key={2} path="/admin" component={Admin} />,
     <Route key={3} path="/rtl" component={RTL} />,
     <Redirect from="/" to="/admin" />
     ]