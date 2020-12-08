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
import SelectorAbstract from "./SelectorAbstract";
import {Button, Container, Row, Col} from "reactstrap";

class StanceSelectorAbstract extends SelectorAbstract {

    constructor(props, context) {
        super(props, context);
        this.getButtonObject = this.getButtonObject.bind(this);
    }

    static options = [
        {name: "Ja, dafür", color: "#2FB774", emoji: "👍"},
        {name: "Diskutierend", color: "#FBAF64", emoji: "☝️"},//👐🏽☝️👐
        {name: "Nein, gegen", color: "#F15A61", emoji: "👎"},
        {name: "Kein Bezug", color: "#E7E6E6", emoji: String.fromCodePoint(0x2049)}, //⁉️️
    ];

    static optionsMap = Object.assign({}, ...StanceSelectorAbstract.options.map(em => {
        return {[em.name]: em}
    }));

    getButtonObject(option, fontSize) {
        let color, fontColor;

        if(this.props.stanceStatus === undefined || this.props.stanceStatus === null
            || this.props.stanceStatus.label === null ||
            this.props.stanceStatus.label === option.name) {
            color = option.color;
            fontColor = "black";
        }
        else {
            color = SelectorAbstract.neutralColor;
            fontColor = SelectorAbstract.neutralFontColor;
        }

        return (<Button className="p-0"
                       style={{background: color + "DA",
                           width: "100%",
                           color: fontColor,
                           fontSize: fontSize.toString() + "px",
                           borderRadius: 0
                       }}
                       onClick={this.props.onClick ? (e) => this.props.onClick(e, "label", option.name) : () => null}>
            <Container >
                <Row className={"align-items-center"}>
                    <Col xs={12} sm={2} md={2} lg={2} xl={2} className={"p-0"} style={{
                        background: "#FFFFFFBB"}}>
                        <span role="img" style={{fontSize: (fontSize*1.5)}} aria-label={option.emoji + " emoji"}>{option.emoji}</span>
                    </Col>
                    <Col xs={12} sm={10} md={10} lg={10} xl={10} className={"p-0 mt-1 mb-1"}><b>{option.name}</b></Col>
                </Row>
            </Container>


        </Button>);
    }
}

export default StanceSelectorAbstract;
