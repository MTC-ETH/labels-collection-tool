import React from "react";

// reactstrap components
import {Col, Row} from "reactstrap";
import PlutchikSelector from "./PlutchikSelector";
import StanceSelectorVertical from "./StanceSelectorVertical";

class Comment extends React.Component {

  render() {
      return (
            <Row className={"m1-3 mb-2 pt-1 pb-1 align-items-center"}
                style={{background: this.props.error ? "#FF9991" : null}}
            >
                <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                    {this.props.children}
                </Col>
                <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                    <StanceSelectorVertical selectedStance={this.props.selectedStance}
                                            onClick={this.props.onClickStance}/>
                </Col>
                <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                    <PlutchikSelector selectedEmotion={this.props.selectedEmotion}
                                        onClick={this.props.onClickEmotion}/>
                </Col>
            </Row>
    );
  }
}

export default Comment;
