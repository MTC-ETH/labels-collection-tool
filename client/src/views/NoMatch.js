import React from "react";
import {Button, Col, Container, UncontrolledAlert} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";

class NoMatch extends React.Component {



    render() {
        return (<>
            <Header/>
            <Container>
                <Row><Col><h2>Error 404</h2></Col></Row>
            <Row>
                <Col>
                    <UncontrolledAlert color="danger" fade={true}>
                                    <span className="alert-inner--icon">
                                        <i className="ni ni-support-16" />
                                    </span>
                        <span className="alert-inner--text ml-1">
                        <strong>Error 404!</strong> The page you're searching for cannot be found.
                                    </span>
                    </UncontrolledAlert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="p-1"
                            size={"lg"}
                            style={{width: "100%"}}
                            color={"primary"}
                            href={"/"}>
                        Go to Home
                    </Button>
                </Col>
            </Row>
        </Container>
            </>);
    }
}

export default NoMatch;
