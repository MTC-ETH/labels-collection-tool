import React from "react";

import {Col, Row} from "reactstrap";
import StanceSelectorOrizontal from "./StanceSelectorOrizontal";

class SingleStanceQuestion extends React.Component {
    static defaultProps = {
        instructionsTextColor: "#1e0ead"
    };

  render() {
      return (
          <>
                <Row style={{background: this.props.error ? "#FF9991" : null,
                    color: this.props.instructionsTextColor}}>
                    <Col>
                    <h5>{this.props.children}</h5>
                    </Col>
                </Row>
                <Row className={"mb-4"}>
                    <Col>
                <StanceSelectorOrizontal onClick={this.props.onClick}
                                         stanceStatus={this.props.stanceStatus}/>
                    </Col>
                </Row>
        </>
    );
  }
}

export default SingleStanceQuestion;
