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
import {Col, Container, Alert} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {isMobileOnly} from "react-device-detect";

export function checkMobile(Comp) {
    if (isMobileOnly) {
        return <NotAvailableOnMobile/>;
    }
    return Comp;
}

class NotAvailableOnMobile extends React.Component {
    render() {
        return (<>
            <Header/>
            <Alert color={"danger"}>
                <Container>
                <Row><Col><h2>Nicht verfügbar auf Mobiltelefonen</h2></Col></Row>
                <Row>
                    <Col>
                        <p>
                            Wie in der Anleitung beschrieben, ist es nicht möglich, die Website von mobilen Geräten
                            aus zu nutzen, um eine hohe Datenqualität zu gewährleisten.  <br/>
                            Bitte öffnen Sie die Seite von einem anderen Gerät aus.
                        </p>
                    </Col>
                </Row>
            </Container>
            </Alert>
            <Footer/>
        </>);
    }
}
export default NotAvailableOnMobile;
