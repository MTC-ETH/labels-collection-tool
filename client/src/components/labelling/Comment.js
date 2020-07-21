import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";
import PlutchikSelector from "./PlutchikSelector";
import StanceSelector from "./StanceSelector";

class Comment extends React.Component {

  render() {
      return (
            <Row className={"mt-3 mb-4 align-items-center"} >
                <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                    {this.props.children}
                </Col>
                <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                    <StanceSelector/>
                </Col>
                <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                    <PlutchikSelector/>
                </Col>
            </Row>
    );
  }
}

export default Comment;
