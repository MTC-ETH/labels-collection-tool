import React from "react";

import {Col, FormGroup, Input, Label, Row} from "reactstrap";

class ImNotSureCheckboxRow extends React.Component {
    static defaultProps = {
        fontSize: 16
    };

    static text = "Ich bin mir meiner Antwort nicht sicher";

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
                          <div style={{fontSize: this.props.fontSize}}>{ImNotSureCheckboxRow.text}</div>
                      </Label>
                  </FormGroup>
              </Col>
          </Row>
    ;
  }
}

export default ImNotSureCheckboxRow;
