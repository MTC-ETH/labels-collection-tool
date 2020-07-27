import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Labelling from "./views/Labelling";
import AdminDashboard from "./views/AdminDashboard";
import AuthenticateLabeller from "./views/AuthenticateLabeller";

ReactDOM.render(
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={props => <Labelling {...props} />} />
                <Route path="/labelling" exact render={props => <Labelling {...props} />} />
                <Route path="/admindashboard" exact render={props => <AdminDashboard {...props} />} />
                <Route path="/authenticatelabeller" exact render={props => <AuthenticateLabeller {...props} />} />
                {/*<Route component={NoMatch}/>*/}
            </Switch>
        </BrowserRouter>
    </>,
    document.getElementById("root")
);
