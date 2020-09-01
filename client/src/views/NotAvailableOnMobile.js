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
