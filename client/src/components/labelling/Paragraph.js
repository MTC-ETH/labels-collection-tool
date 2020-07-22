import React from "react";

// reactstrap components
import {Col, Row} from "reactstrap";
import PlutchikSelector from "./PlutchikSelector";

class Paragraph extends React.Component {

  render() {
      return (
            <Row className={"mt-3 mb-4 align-items-center"} >
                <Col xs={12} sm={7} md={7} lg={7} xl={7}>
                    {this.props.children}
                </Col>
                <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                    <PlutchikSelector onClick={this.props.onClick}/>
                </Col>
            </Row>
    );
  }
}

export default Paragraph;
