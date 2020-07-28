import React from "react";
import {Button, Col, Container} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";

class Home extends React.Component {



    render() {
        return (<>
            <Header/>
            <Container>
                <Row><Col><h2>Emotions & Stance Project - Labelling Tool</h2></Col></Row>
                <Row>
                    <Col>
                        <p>
                            Welcome to the labelling tool related to the project emotion & stance detection
                            from the ETH <a target="_blank" rel="noopener noreferrer" href="https://mtc.ethz.ch">
                            Media Technology Center (MTC)</a>.
                            This online tool has the propose of collection the manual labels for the datasets
                            related to the project.
                        </p>
                        <p>Please choose what to do:</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="p-1"
                                size={"lg"}
                                style={{width: "100%"}}
                                // color={"primary"}
                                onClick={() =>  this.props.history.push("/register")}>
                            Register as labeller
                        </Button>
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Button className="p-1"
                                size={"lg"}
                                style={{width: "100%"}}
                                // color={"primary"}
                                onClick={() =>  this.props.history.push("/authenticatelabeller")}>
                            Continue labelling authenticating with your token
                        </Button>
                    </Col>
                </Row>
        </Container>
            </>);
    }
}

export default Home;
