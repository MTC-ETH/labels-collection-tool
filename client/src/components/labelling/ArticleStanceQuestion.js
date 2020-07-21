import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";
import StanceSelectorOrizontal from "./StanceSelectorOrizontal";

class ArticleStanceQuestion extends React.Component {

  render() {
      return (
          <>
            <Container className="shape-container align-items-center pt-4" style={{
                color: "blue",
                // fontSize: "12px"
            }}>
                <Row>
                    <Col>
                        <h5>Stance of article towards topic</h5>
                        <p>Please now select how the article replies to the following question:</p>
                        <h5>{this.props.question}</h5>
                    </Col>
                </Row>
                <StanceSelectorOrizontal/>
            </Container>
        </>
    );
  }
}

export default ArticleStanceQuestion;
