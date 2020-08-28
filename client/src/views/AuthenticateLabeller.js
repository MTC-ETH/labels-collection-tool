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
            rememberMe: true,
            target: "labelling"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = Cookies.get('tokenRemember');
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
            // success: false,
            token: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.get("/authenticatelabeller/valid?token=" + this.state.token)
            .then(response => {
                if(response.data.valid) {
                    Cookies.set("token", this.state.token);
                    if(this.state.rememberMe) {
                        Cookies.set("tokenRemember", this.state.token);
                    } else {
                        Cookies.remove("tokenRemember");
                    }
                    this.props.history.push("/" + this.state.target + "?token=" + this.state.token);
                } else {
                    alert(response.data.message);
                }
            });
    }

    render() {
        return (<>
                <Header selectedPage={"authenticatelabeller"}/>
                <Container className="shape-container align-items-center">
                    <h2>Labeller Authentication</h2>
                    <Form>
                        <FormGroup>
                            <Label for="token">Please enter you personal token, sent to you in the registration email.
                                If you lost your token, please <a href={"/register"}>register</a> with the same email and it will be recovered for you.
                            </Label>
                            <Input onChange={this.handleInputChange}
                                   value={this.state.token === null || this.state.token === undefined ?
                                       "" : this.state.token}
                                   type="text"
                                   name="tokenInput"
                                   id="tokenInput"
                                   placeholder="Personal token"/>
                            <div className={"ml-4 mt-2"}>
                            <Input type="checkbox"
                                   id={"rememberMe"}
                                   checked={this.state.rememberMe}
                                   onChange={() => this.setState({rememberMe: !this.state.rememberMe})}/>{' '}
                            Remember the token next time
                            </div>
                        </FormGroup>
                        <Button onClick={this.handleSubmit} block>Log in</Button>
                    </Form>
                </Container>
                <Footer/>
            </>
        );
    }
}

export default AuthenticateLabeller;
