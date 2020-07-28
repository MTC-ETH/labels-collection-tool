import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";

class ArticleInstructions extends React.Component {

  render() {
      return (
          <>
            <Container className="shape-container align-items-center pt-2" style={{
                color: "blue",
                // fontSize: "12px"
            }}>
                <Row>
                    <Col>
                        <h4>Instructions</h4>
                        <p>Please read the article carefully. For each paragraph, select an emotion on the right side that best represents the emotion conveyed in the paragraph.
                        It’s possible to select only one emotion per paragraph. If in doubt, select the emotion which is conveyed in a stronger manner by the text.</p>
                        <h5>Title and subtitle of the article:</h5>
                    </Col>
                </Row>
            </Container>
        </>
    );
  }
}

export default ArticleInstructions;
