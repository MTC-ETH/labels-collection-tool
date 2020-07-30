import React from "react";
import axios from 'axios';
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import Header from "../components/Header";

class AuthenticateLabeller extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            token: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    this.props.history.push("/labelling?token=" + this.state.token);
                } else {
                    alert(response.data.message);
                }
            });
    }

    render() {
        return (<>
            <Header/>
            <Container className="shape-container align-items-center">
                <h2>Labeller Authentication</h2>
                <Form>
                    <FormGroup>
                        <Label for="token">Please enter you personal token, sent to you in the registration email:</Label>
                        <Input onChange={this.handleInputChange} type="text" name="tokenInput" id="tokenInput" placeholder="Personal token" />
                    </FormGroup>
                    <Button onClick={this.handleSubmit} block>Start labelling</Button>
                </Form>
            </Container>
            </>
        );
    }
}

export default AuthenticateLabeller;
