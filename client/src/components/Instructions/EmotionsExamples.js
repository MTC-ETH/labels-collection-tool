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
