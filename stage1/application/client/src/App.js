import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import DashboardStudent from "./components/pages/Dashboard_student";
import React, { Component } from 'react';
import Login from "./components/auth/Login";
import StudentLogin from "./components/auth/studentLogin";
import NotFound from "./components/layout/NotFound";
import { Provider } from "react-redux";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Register from "./components/auth/Register";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/popper.js/dist/popper';

import User from "./components/pages/Users";
import Roles from "./components/pages/Role";
import SubmissionTypes from "./components/pages/SubmissionType";
import Markings from "./components/pages/Marking";

import Groups from "./components/pages/group";
import Topics from "./components/pages/Topic";
import Supervisor from "./components/pages/supervisor";
import CoSupervisor from "./components/pages/cosupervisor";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/login_student" component={StudentLogin} />
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                <PrivateRoute exact path="/dashboardStudent" component={DashboardStudent} />
                                <PrivateRoute exact path="/users" component={User} />
                                <PrivateRoute exact path="/roles" component={Roles} />
                                <PrivateRoute exact path="/submissionTypes" component={SubmissionTypes} />
                                <PrivateRoute exact path="/marking" component={Markings} />
                                <PrivateRoute exact path="/groups" component={Groups} />
                                <PrivateRoute exact path="/topic" component={Topics} />
                                <PrivateRoute exact path="/supervisor" component={Supervisor} />
                                <PrivateRoute exact path="/coSupervisor" component={CoSupervisor} />
                            </Switch>
                            <Route exact path="*" component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
