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

import {Button, Col, Container, Row} from "reactstrap";

class SubmitInstructionsAndButton extends React.Component {

    static defaultProps = {
        instructionsTextColor: "#1e0ead"
    };

    render() {
        return (
            <>
                <Container className="shape-container align-items-center pt-2" style={{
                    color: this.props.instructionsTextColor
                }}>
                    <Row>
                        <Col>
                            <h3>Einreichen</h3>
                            <p>Wenn alles für Sie gut aussieht, reichen Sie es ein und gehen Sie zum nächsten Artikel,
                                der beschriftet werden soll</p>
                        </Col>
                    </Row>
                    <Button className="p-1"
                            style={{
                                width: "100%",
                                fontSize: "25px"
                            }}
                            onClick={this.props.onClick}>
                        <b>
                            <span role="img" aria-label="arrow left">➡️ </span>
                             Einreichen und zum nächsten Artikel gehen
                            <span role="img" aria-label="arrow left"> ➡️</span>️
                        </b>
                    </Button>
                </Container>
            </>
        );
    }
}

export default SubmitInstructionsAndButton;
