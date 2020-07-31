import React from "react";
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input, Label, UncontrolledAlert} from "reactstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

class AuthenticateLabeller extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            surname: "",
            email: "",
            affiliation: "Select...",
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
        console.log('Current values: ');
        console.log(this.state);

        let errorMessage = "";
        if(this.state.name.length === 0) {
            errorMessage += "Invalid name. ";
            this.setState({
                nameError: true});
        }
        if(this.state.surname.length === 0) {
            errorMessage += "Invalid surname. ";
            this.setState({
                surnameError: true});
        }
        if(!this.validateEmail(this.state.email)) {
            errorMessage += "Invalid email. ";
            this.setState({
                emailError: true});
        }
        if(this.state.affiliation === "Select...") {
            errorMessage += "Invalid affiliation. ";
            this.setState({
                affiliationError: true});
        }
        if(!this.state.acceptedConditions) {
            errorMessage += "Please accept term and conditions. ";
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
                console.log(res);
                this.setState({
                    success: true
                });
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
                <h2>Registration</h2>

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
                            <strong>Success!</strong> Please check your email ({this.state.email}), you'll find a link to begin the study.
                                        </span>
                    </UncontrolledAlert>}
                {this.state.success ? null : (<>
                    <p>Please fill in the fields. Once submitted you will receive an
                email with the link to start participating to the study.</p>
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
                        <Label for="surname">Surname</Label>
                        <Input onChange={this.handleInputChange}
                               type="text" name="surname" id="surnameID"
                               placeholder="Surname"
                               className={this.state.surnameError ? "is-invalid" : null}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email, please use your institutional email</Label>
                        <Input onChange={this.handleInputChange}
                               type="email" name="email" id="exampleEmail"
                               placeholder="example@student.ethz.ch"
                               className={this.state.emailError ? "is-invalid" : null}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="affiliation">Select</Label>
                        <Input onChange={this.handleInputChange}
                               type="select" name="affiliation" id="affiliationID"
                               className={this.state.affiliationError ? "is-invalid" : null}
                        >
                            <option>Select...</option>
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
                            I've read and I accept the <a href={"/termsandconditions"} target={"_blank"}>terms of conditions</a> of this study.
                        </Label>
                    </FormGroup>
                    <Button onClick={this.handleSubmit} className={"mt-3"} block>Register</Button>
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
