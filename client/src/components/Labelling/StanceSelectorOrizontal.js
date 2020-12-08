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
import {Col, Container, Row} from "reactstrap";
import StanceSelectorAbstract from "./StanceSelectorAbstract";
import ImNotSureCheckboxRow from "./ImNotSureCheckboxRow";

class StanceSelectorOrizontal extends StanceSelectorAbstract {
    render() {
        return (
            <Container>
                <Row>
                {StanceSelectorAbstract.options.map((option, index) => {
                    let borders = "pr-1 pl-0";
                    if(option.name.toLowerCase() === "unrelated"){
                        borders += " ml-2"
                    }

                    return (
                       <Col key={index} className={borders}>
                           {this.getButtonObject(option,16)}
                       </Col>);
                })
                }
                    </Row>
                <ImNotSureCheckboxRow fontSize={18}
                                      checked={this.props.stanceStatus === null
                                      || this.props.stanceStatus === undefined
                                          ? false : this.props.stanceStatus.notSure}
                                      onClick={this.props.onClick}/>
            </Container>
        );
    }
}

export default StanceSelectorOrizontal;
