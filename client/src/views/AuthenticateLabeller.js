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

import React from "react";
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from 'js-cookie';
import queryString from "query-string";

class AuthenticateLabeller extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            token: null,
            target: "labelling"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = Cookies.get('token');
        console.log("Token in cookies: ");
        console.log(token);
        if(token) {
            this.setState({token});
        }
        const params = queryString.parse(this.props.location.search);
        let target = params.target;
        if(target) {
            this.setState({target});
        }
    }

    handleInputChange(event) {
        this.setState({
            token: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.get("/authenticatelabeller/valid?token=" + this.state.token)
            .then(response => {
                if(response.data.valid) {
                    Cookies.set("token", this.state.token);
                    this.props.history.push("/" + this.state.target + "?token=" + this.state.token);
                } else {
                    console.log(response);
                    alert(response.data.message);
                }
            });
    }

    render() {
        return (<>
                <Header selectedPage={"authenticatelabeller"}/>
                <Container className="shape-container align-items-center">
                    <h2>Authentifizierung zur Beschriftung</h2>
                    <Form>
                        <FormGroup>
                            <Label for="token">Bitte geben Sie Ihr persönliches Kürzel ein, das Sie im
                                Registrierungs-E-Mail erhalten haben. Wenn Sie Ihr Token verloren haben,
                                <a href={"/register"}> registrieren</a> Sie sich bitte mit der gleichen E-Mail und
                                es wird für Sie wiederhergestellt.
                            </Label>
                            <Input onChange={this.handleInputChange}
                                   value={this.state.token === null || this.state.token === undefined ?
                                       "" : this.state.token}
                                   type="text"
                                   name="tokenInput"
                                   id="tokenInput"
                                   placeholder="Personal token"/>
                        </FormGroup>
                        <Button onClick={this.handleSubmit} block>Anmelden</Button>
                    </Form>
                </Container>
                <Footer/>
            </>
        );
    }
}

export default AuthenticateLabeller;
