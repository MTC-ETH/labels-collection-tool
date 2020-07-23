import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";
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
                <Row style={{
                color: "blue",
                // fontSize: "12px"
            }} className={"text-center mt-3 mb-n2"}>
                <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                    <h5>Comment</h5>
                </Col>
                <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                    <h5>Stance?</h5>
                </Col>
                    <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                    <h5>Emotion?</h5>
                </Col>
            </Row>
                {commentsJson.map((com) => {
                    return (<Comment key={com.commentID}
                                     selectedStance={this.props.commentsStanceLabel[com.commentID]}
                                     selectedEmotion={this.props.commentsEmotionLabel[com.commentID]}
                                     onClickStance={(event, stance) => {return this.props.onClickStance(event, stance, com)}}
                                     onClickEmotion={(event, emotion) => {return this.props.onClickEmotion(event, emotion, com)}}
                                     error={this.props.commentsError[com.commentID]}>
                        {com.text}
                    </Comment>);
                })}
            </Container>
        </>
    );
  }
}

export default CommentsContainer;
