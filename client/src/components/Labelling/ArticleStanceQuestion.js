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
            <Container className="shape-container align-items-center pt-4" >
                <Row style={{
                    color: this.props.instructionsTextColor
                }}>
                    <Col>
                        <h5>Stance of article towards topic</h5>
                        <p>Please now select how the article replies to the following question:</p>
                    </Col>
                </Row>
                <Row className={"pb-1"} style={{background: this.props.error ? "#FF9991" : null,
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
