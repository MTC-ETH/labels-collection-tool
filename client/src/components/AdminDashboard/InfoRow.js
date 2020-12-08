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
import {Badge, Col, Row} from "reactstrap";

class InfoRow extends React.Component {

    static defaultProps = {
        color: "primary",
    };

    render() {
        return <Row>
            <Col xs={12} sm={8} md={7} lg={7} xl={7}>{this.props.children}</Col>
            <Col xs={12} sm={4} md={5} lg={5} xl={5}>{this.props.counter !== null && this.props.counter !== undefined ?
                (<Badge color={this.props.color}>{this.props.counter}</Badge>)
                : ((this.props.fallback !== null && this.props.fallback !== undefined) ?
                    <Badge color={this.props.color}>{this.props.fallback}</Badge> : null)}
            </Col>
        </Row>;
    }
}

export default InfoRow;
