import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Labelling from "./views/Labelling";

ReactDOM.render(
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={props => <Labelling {...props} />} />
                {/*<Route component={NoMatch}/>*/}
            </Switch>
        </BrowserRouter>
    </>,
    document.getElementById("root")
);
