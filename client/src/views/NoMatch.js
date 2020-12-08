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
import {Button, Col, Container, UncontrolledAlert} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";
import Footer from "../components/Footer";

class NoMatch extends React.Component {
    render() {
        return (<>
            <Header/>
            <Container>
                <Row><Col><h2>Fehler 404</h2></Col></Row>
            <Row>
                <Col>
                    <UncontrolledAlert color="danger" fade={true}>
                                    <span className="alert-inner--icon">
                                        <i className="ni ni-support-16" />
                                    </span>
                        <span className="alert-inner--text ml-1">
                        <strong>Fehler 404</strong> Die von Ihnen gesuchte Seite kann nicht gefunden werden.
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
                        Gehen Sie auf die Homepage.
                    </Button>
                </Col>
            </Row>
        </Container>
            <Footer/>
            </>);
    }
}

export default NoMatch;
