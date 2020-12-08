// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

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
                                 checked={this.props.checked === null || this.props.checked === undefined ?
                                     false : this.props.checked}
                                 onChange={(e) => this.props.onClick ?
                                     this.props.onClick(e, "notSure", !this.props.checked) : () => null}/>{' '}
                          <div style={{fontSize: this.props.fontSize}}>{ImNotSureCheckboxRow.text}</div>
                      </Label>
                  </FormGroup>
              </Col>
          </Row>
    ;
  }
}

export default ImNotSureCheckboxRow;
