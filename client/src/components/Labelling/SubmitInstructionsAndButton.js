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
