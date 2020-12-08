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
import {Button, Container, Form, FormGroup, Input, Label, UncontrolledAlert} from "reactstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

class AuthenticateLabeller extends React.Component {

    static selectText = "Wählen Sie...";

    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            surname: "",
            email: "",
            affiliation: AuthenticateLabeller.selectText,
            acceptedConditions: false,
            surnameError: false,
            nameError: false,
            emailError: false,
            affiliationError: false,
            acceptedConditionError: false,
            errorMessage: "",
            success: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            success: false,
            [event.target.name]: event.target.value,
            [event.target.name + "Error"]: false
        });
    }

    handleCheckedChange(event) {
        this.setState({
            success: false,
            [event.target.name]: event.target.checked,
            [event.target.name + "Error"]: false
        });
    }

    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    handleSubmit(event) {
        event.preventDefault();
        let errorMessage = "";
        if(this.state.name.length === 0) {
            errorMessage += "Ungültiger Name. ";
            this.setState({
                nameError: true});
        }
        if(this.state.surname.length === 0) {
            errorMessage += "Ungültiger Familienname. ";
            this.setState({
                surnameError: true});
        }
        if(!this.validateEmail(this.state.email)) {
            errorMessage += "Ungültige E-Mail. ";
            this.setState({
                emailError: true});
        }
        if(this.state.affiliation === AuthenticateLabeller.selectText) {
            errorMessage += "Ungültige Zugehörigkeit. ";
            this.setState({
                affiliationError: true});
        }
        if(!this.state.acceptedConditions) {
            errorMessage += "Bitte akzeptieren Sie die Bedingungen. ";
            this.setState({
                acceptedConditionsError: true});
        }
        this.setState({
            errorMessage: errorMessage});

        if(!errorMessage) {
            axios.post("/register", {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                affiliation: this.state.affiliation,
            })
            .then(res => {
                this.setState({
                    success: true
                });
                setTimeout(() => {
                    this.props.history.push('/authenticatelabeller');
                }, 7000)
            })
            .catch(err => {
                console.log(JSON.stringify(err));
                console.log(err.response);
                if(err.response && err.response.status === 400) {
                    console.log(err.response.data); // => the response payload
                    this.setState({
                        success: false,
                        errorMessage: err.response.data.message,
                    });
                }
                else {
                    this.setState({
                        success: false,
                        errorMessage: "Server error" + err.toString(),
                    });
                }

            });
        }
    }

    render() {
        return (<>
            <Header/>
            <Container className="shape-container align-items-center">
                <h2>Anmeldung</h2>

                {!(this.state.errorMessage) ? null :
                    <UncontrolledAlert color="danger" fade={true}>
                                        <span className="alert-inner--icon">
                                            <i className="ni ni-support-16" />
                                        </span>
                        <span className="alert-inner--text ml-1">
                            <strong>Error!</strong> {this.state.errorMessage}
                                        </span>
                    </UncontrolledAlert>}
                {!this.state.success ? null :
                    <UncontrolledAlert color="success" fade={true}>
                                        <span className="alert-inner--icon">
                                        <i className="ni ni-like-2" />
                                        </span>
                        <span className="alert-inner--text ml-1">
                            <strong>Erfolg!</strong>
                            Bitte überprüfen Sie Ihre E-Mail ({this.state.email}), dort finden Sie einen Link,
                            mit dem Sie die Studie beginnen können. Sie werden bald auf die Authentifizierungsseite
                            weitergeleitet. Falls die Weiterleitung nicht funktioniert, klicken Sie bitte
                            <a href={"/authenticatelabeller"}> hier</a>.
                        </span>
                    </UncontrolledAlert>}
                {this.state.success ? null : (<>
                    <p>Bitte füllen Sie die Felder aus. Nach dem Absenden erhalten Sie eine E-Mail mit dem Link,
                        um mit der Teilnahme an der Studie zu beginnen.
                    </p>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input onChange={this.handleInputChange}
                               type="text" name="name" id="nameID"
                               placeholder="Name"
                               className={this.state.nameError ? "is-invalid" : null}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Nachname</Label>
                        <Input onChange={this.handleInputChange}
                               type="text" name="surname" id="surnameID"
                               placeholder="Surname"
                               className={this.state.surnameError ? "is-invalid" : null}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email, bitte verwenden Sie E-Mail ihrer Institution</Label>
                        <Input onChange={this.handleInputChange}
                               type="email" name="email" id="exampleEmail"
                               placeholder="example@student.ethz.ch"
                               className={this.state.emailError ? "is-invalid" : null}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="affiliation">Ihre Zugehörigkeit</Label>
                        <Input onChange={this.handleInputChange}
                               type="select" name="affiliation" id="affiliationID"
                               className={this.state.affiliationError ? "is-invalid" : null}
                        >
                            <option>{AuthenticateLabeller.selectText}</option>
                            <option>ETH</option>
                            <option>UZH</option>
                            <option>NZZ</option>
                            <option>Ringier</option>
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input onChange={this.handleCheckedChange}
                                   className={this.state.acceptedConditionsError ? "is-invalid" : null}
                                   name="acceptedConditions" type="checkbox" />{' '}
                            Ich habe die
                            <a href={"/termsandconditions"} target={"_blank"} rel="noopener noreferrer"> Bedingungen </a>
                            dieser Studie gelesen und akzeptiere sie.
                        </Label>
                    </FormGroup>
                    <Button onClick={this.handleSubmit} className={"mt-3"} block>Anmelden</Button>
                    </Form>
                    </>
                    )}
            </Container>
                <Footer/>
            </>
        );
    }
}

export default AuthenticateLabeller;
