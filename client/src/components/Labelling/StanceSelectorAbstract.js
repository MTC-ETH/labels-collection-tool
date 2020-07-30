import React from "react";
import SelectorAbstract from "./SelectorAbstract";
import {Button} from "reactstrap";

class StanceSelectorAbstract extends SelectorAbstract {


    constructor(props, context) {
        super(props, context);

        this.getButtonObject = this.getButtonObject.bind(this);
    }

    options = [
        {name: "In favour", color: "2FB774"},
        {name: "Discussing", color: "FBAF64"},
        {name: "Against", color: "F15A61"},
        {name: "Unrelated", color: "E7E6E6"},
        ];

    getButtonObject(option, fontSize) {
        let color, fontColor;
        if(this.props.selectedStance === null || this.props.selectedStance === option.name) {
            color = option.color;
            fontColor = "black";
        }
        else {
            color = this.neutralColor;
            fontColor = "#" + this.neutralFontColor;
        }

        return (<Button className="p-1"
                       style={{background: "#" + color,
                           width: "100%",
                           color: fontColor,
                           fontSize: fontSize.toString() + "px",
                           borderRadius: 0
                       }}
                       onClick={(e) => this.props.onClick(e, option.name)}>
            <b>{option.name}</b>
        </Button>);
    }
}

export default StanceSelectorAbstract;
