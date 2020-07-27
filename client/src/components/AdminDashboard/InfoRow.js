import React from "react";
import {Badge, Col, Row} from "reactstrap";

class InfoRow extends React.Component {
    render() {
        return <Row>
            <Col>{this.props.children}</Col>
            <Col>{this.props.counter !== null ? (<Badge color="primary">{this.props.counter}</Badge>) : null}</Col>
        </Row>;
    }
}

export default InfoRow;
