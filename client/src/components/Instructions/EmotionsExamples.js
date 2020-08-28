import React from "react";

import {Col, Row, Container, Button, UncontrolledCollapse} from "reactstrap";
import EmotionsExampleBodyRow from "./EmotionsExamplesBodyRow";

class EmotionsExamples extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {show: false}
    }

    render() {
        return <Container className={"p-0"}>
            <Row>
                <Col>
                    <h5>Definitionen und Beispiele von Emotionen</h5>
                    <Button id="toggler" onClick={() => this.setState({show: !this.state.show})}>
                        {this.state.show ? "Beispiele ausblenden" : "Beispiele einblenden"}
                    </Button>
                </Col>
            </Row>
            <UncontrolledCollapse toggler="#toggler"><EmotionsExampleBodyRow/></UncontrolledCollapse>
        </Container>;
    }
}

export default EmotionsExamples;
