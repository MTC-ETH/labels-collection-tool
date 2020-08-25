import React from "react";
import SelectorAbstract from "./SelectorAbstract";
import {Button, Container, Row, Col} from "reactstrap";

class StanceSelectorAbstract extends SelectorAbstract {


    constructor(props, context) {
        super(props, context);

        this.getButtonObject = this.getButtonObject.bind(this);
    }

    options = [
        {name: "In favour", color: "2FB774", emoji: "👍"},
        {name: "Discussing", color: "FBAF64", emoji: "☝️"},//👐🏽☝️👐
        {name: "Against", color: "F15A61", emoji: "👎"},
        {name: "Unrelated", color: "E7E6E6", emoji: String.fromCodePoint(0x2049)}, //⁉️️
    ];

    getButtonObject(option, fontSize) {
        let color, fontColor;
        if(this.props.stanceStatus === null || this.props.stanceStatus.label === null ||
            this.props.stanceStatus.label === option.name) {
            color = option.color;
            fontColor = "black";
        }
        else {
            color = this.neutralColor;
            fontColor = "#" + this.neutralFontColor;
        }

        return (<Button className="p-0"
                       style={{background: "#" + color + "DA",
                           width: "100%",
                           color: fontColor,
                           fontSize: fontSize.toString() + "px",
                           borderRadius: 0
                       }}
                       onClick={(e) => this.props.onClick(e, "label", option.name)}>
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
