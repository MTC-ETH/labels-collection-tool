import React from "react";

import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import EmotionsExamples from "../Instructions/EmotionsExamples";
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
                            <h3>Instructions</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={9} md={9} lg={10} xl={10}>
                            <p>Please read the article carefully. For each paragraph, select an emotion on the right
                                side that best replies to the question: <b>"Which is the emotion conveyed in this paragraph?"</b>.
                                It’s possible to select only one emotion per paragraph. If in doubt, select the emotion which is conveyed in a stronger manner by the text.</p>
                        </Col>
                        <Col xs={12} sm={3} md={3} lg={2} xl={2}>
                            <Button
                                // href={"/instructions?token=" + this.props.token}
                                    style={{backgroundColor: this.props.instructionsTextColor + "AF"}}
                                    onClick={this.toggleModal}
                                    block>
                                Show me examples</Button>
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
                                                <h3>Stance</h3>
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
                        <h5>Title and subtitle of the article:</h5>
                    </Col>
                </Row>
            </Container>
        </>
    );
  }
}

export default ArticleInstructions;
