import React from "react";

import {Col, Row, Container, Button, UncontrolledCollapse} from "reactstrap";
import StanceExamplesBodyRow from "./StanceExamplesBodyRow";

class StanceExamples extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {show: false}
    }

    render() {
        return <Container className={"p-0 mt-3"}>
            <Row>
                <Col>
                    <h5>Beispiele von Stance</h5>
                    <Button id="togglerStance" onClick={() => this.setState({show: !this.state.show})}>
                        {this.state.show ? "Beispiele ausblenden" : "Beispiele einblenden"}
                    </Button>
                </Col>
            </Row>
            <UncontrolledCollapse toggler="#togglerStance"><StanceExamplesBodyRow/></UncontrolledCollapse>
        </Container>;
    }
}

export default StanceExamples;
