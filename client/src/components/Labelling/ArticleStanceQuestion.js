import React from "react";

import {Col, Container, Row} from "reactstrap";
import StanceSelectorOrizontal from "./StanceSelectorOrizontal";

class ArticleStanceQuestion extends React.Component {
    static defaultProps = {
        instructionsTextColor: "#1e0ead"
    };

  render() {
      return (
          <>
            <Container className="shape-container align-items-center" >
                <Row style={{
                    color: this.props.instructionsTextColor
                }}>
                    <Col>
                        <h3>Standpunkt des Artikels zum Thema</h3>
                        <h6>Bitte wählen Sie nun aus, wie der Artikel auf die folgende Frage antwortet:</h6>
                    </Col>
                </Row>
                <Row style={{background: this.props.error ? "#FF9991" : null,
                    color: this.props.instructionsTextColor}}>
                    <Col>
                    <h5>{this.props.question}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                <StanceSelectorOrizontal onClick={this.props.onClick}
                                         stanceStatus={this.props.stanceStatus}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
  }
}

export default ArticleStanceQuestion;
