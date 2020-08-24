import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Labelling from "./views/Labelling";
import AdminDashboard from "./views/AdminDashboard";
import AuthenticateLabeller from "./views/AuthenticateLabeller";
import Register from "./views/Register";
import NoMatch from "./views/NoMatch";
import Home from "./views/Home";
import Instructions from "./views/Instructions";
import TermsAndConditions from "./views/TermsAndConditions";
import {checkMobile} from "./views/NotAvailableOnMobile";

ReactDOM.render(
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={props => <Home {...props} />} />
                <Route path="/labelling" exact render={props => checkMobile(<Labelling {...props}/>)} />
                <Route path="/admindashboard" exact render={props => <AdminDashboard {...props} />} />
                <Route path="/authenticatelabeller" exact render={props => checkMobile(<AuthenticateLabeller {...props} />)} />
                <Route path="/register" exact render={props => <Register {...props} />} />
                <Route path="/instructions" exact render={props => <Instructions {...props} />} />
                <Route path="/termsandconditions" exact render={props => <TermsAndConditions {...props} />} />
                <Route component={NoMatch}/>
            </Switch>
        </BrowserRouter>
    </>,
    document.getElementById("root")
);
