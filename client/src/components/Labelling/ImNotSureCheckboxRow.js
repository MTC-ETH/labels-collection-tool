import React from "react";

// reactstrap components
import {Col, FormGroup, Input, Label, Row} from "reactstrap";

class ImNotSureCheckboxRow extends React.Component {
    static defaultProps = {
        fontSize: 16
    };
  render() {
      return <Row className={"align-items-center mt-1"}>
              <Col className={"p-0"}>
                  <FormGroup check>
                      <Label check>
                          <Input type="checkbox"
                                 id={"test-id"}
                                 checked={this.props.checked}
                                 onChange={(e) =>
                                     this.props.onClick(e, "notSure", !this.props.checked)}/>{' '}
                          <div style={{fontSize: this.props.fontSize}}>I'm not sure of my answer</div>
                      </Label>
                  </FormGroup>
              </Col>
          </Row>
    ;
  }
}

export default ImNotSureCheckboxRow;
