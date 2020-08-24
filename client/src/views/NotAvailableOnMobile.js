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
                <Row><Col><h2>Not available on mobile</h2></Col></Row>
                <Row>
                    <Col>
                        <p>
                            In order to retain high quality data, it's not possible to use the website
                            from mobile devices, as stated in the instructions page. <br/>
                            Please open the page from another device.
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
