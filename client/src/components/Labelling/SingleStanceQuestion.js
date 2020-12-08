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
