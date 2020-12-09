// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

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
import PersonalPage from "./views/PersonalPage";
import RegisterWithAutomaticEmail from "./views/RegisterWithAutomaticEmail";

// const clientConfig = require( "./assets/clientConfig.js");


ReactDOM.render(
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={props => <Home {...props} />} />
                <Route path="/labelling" exact render={props => checkMobile(<Labelling {...props}/>)} />
                <Route path="/admindashboard" exact render={props => <AdminDashboard {...props} />} />
                <Route path="/authenticatelabeller" exact render={props => checkMobile(<AuthenticateLabeller {...props} />)} />
                <Route path="/register" exact render={props => {
                    if (process.env.REACT_APP_AUTOMATIC_REGISTRATION) {
                        return <RegisterWithAutomaticEmail {...props} />;
                    }
                    return <Register {...props} />;
                }} />
                <Route path="/instructions" exact render={props => <Instructions {...props} />} />
                <Route path="/termsandconditions" exact render={props => <TermsAndConditions {...props} />} />
                <Route path="/personalpage" exact render={props => <PersonalPage {...props} />} />
                <Route component={NoMatch}/>
            </Switch>
        </BrowserRouter>
    </>,
    document.getElementById("root")
);
