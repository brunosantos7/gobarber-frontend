import React from "react";

import { Switch } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

import Route from "./route";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" component={SignIn} exact></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/forgot-password" component={ForgotPassword}></Route>
            <Route path="/reset-password" component={ResetPassword}></Route>

            <Route path="/dashboard" component={Dashboard} isPrivate></Route>
            <Route path="/profile" component={Profile} isPrivate></Route>
        </Switch>
    );
};

export default Routes;
