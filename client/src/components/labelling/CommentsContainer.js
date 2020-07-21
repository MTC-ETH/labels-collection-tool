import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";
import Paragraph from "./Paragraph";
import Comment from "./Comment";

class CommentsContainer extends React.Component {

  render() {
      if (!this.props.commentsJson) {
          return null;
      }
      const { commentsJson } = this.props;

      return (
          <>
            <Container className="shape-container align-items-center">
                <Container className="mt-3">
                <Row>
                    <Col>
                        <h3>Comments:</h3>
                    </Col>
                </Row>
                {commentsJson.map(com => {
                    return (<Comment>
                        {com.text}
                    </Comment>);
                })}
                </Container>
            </Container>
        </>
    );
  }
}

export default CommentsContainer;
