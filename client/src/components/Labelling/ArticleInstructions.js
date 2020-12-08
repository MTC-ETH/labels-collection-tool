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

import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import EmotionsExampleBodyRow from "../Instructions/EmotionsExamplesBodyRow";
import StanceExamplesBodyRow from "../Instructions/StanceExamplesBodyRow";
import ContainedHr from "../ContainedHr";

class ArticleInstructions extends React.Component {
    static defaultProps = {
        instructionsTextColor: "#1e0ead"
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            modal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({modal: !this.state.modal});
    }

    render() {
      return (
          <>
            <Container className="shape-container align-items-center pt-2" style={{
                color: this.props.instructionsTextColor
            }}>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                            <h3>Anleitungen</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={9} md={9} lg={10} xl={10}>
                            <p>
                                Bitte lesen Sie den Artikel sorgfältig durch. Wählen Sie für jeden Absatz auf der
                                rechten Seite eine Emotion aus, die die folgende Frage am Besten beantwortet:
                                "<b><i>Welches ist das Gefühl, das in diesem Absatz vermittelt wird?</i></b>". Es ist
                                nur eine Emotion pro Absatz möglich. Wählen Sie im Zweifelsfall die Emotion aus, die
                                durch den Text am Stärksten vermittelt wird.
                            </p>
                        </Col>
                        <Col xs={12} sm={3} md={3} lg={2} xl={2}>
                            <Button
                                    style={{backgroundColor: this.props.instructionsTextColor + "AF"}}
                                    onClick={this.toggleModal}
                                    block>
                                Zeigen Sie mir Beispiele</Button>
                            <Modal size="lg" style={{maxWidth: '1250px', width: '80%'}} isOpen={this.state.modal} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Biespiele</ModalHeader>
                                <ModalBody>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <h3>Emotionen</h3>
                                            </Col>
                                        </Row>
                                        <EmotionsExampleBodyRow/>
                                        <ContainedHr/>
                                        <Row>
                                            <Col>
                                                <h3>Standpunkt</h3>
                                            </Col>
                                        </Row>
                                        <StanceExamplesBodyRow/>
                                    </Container>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary"
                                            href={"/instructions?token=" + this.props.token}
                                    target={"_blank"}>
                                        Open instructions page</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                        </Row>
                        <h5>Titel und Untertitel des Artikels:</h5>
                    </Col>
                </Row>
            </Container>
        </>
    );
  }
}

export default ArticleInstructions;
