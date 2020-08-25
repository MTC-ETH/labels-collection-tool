import React from "react";
import {Button, Col, Container, FormGroup, Input, Label, Media, Row} from "reactstrap";
import SelectorAbstract from "./SelectorAbstract";

import highVolSrc from "../../assets/imgs/speakerIconHigh.svg";
import mediumVolSrc from "../../assets/imgs/speakerIconMedium.svg";
import lowVolSrc from "../../assets/imgs/speakerIconLow.svg";
import ImNotSureCheckboxRow from "./ImNotSureCheckboxRow";


class PlutchikSelector extends SelectorAbstract {

    static defaultProps = {
        instructionsTextColor: "#1e0ead",
        imNotSureFontSize: 16
    };

    constructor(props, context) {
        super(props, context);
        this.getIntensityRow = this.getIntensityRow.bind(this);
        this.getPurelyFactualButton = this.getPurelyFactualButton.bind(this);
    }

    emotions = [
        [{name: "joy", color: "FFDE7A", emoji: "😊"}, {name: "trust", color: "ACD46A", emoji: "🤝"}, {name: "fear", color: "2FB774", emoji: "😨"}, {name: "anticipation", color: "FBAF64", emoji: "👀"}],
        [{name: "sadness", color: "74A9DB", emoji: "😞"}, {name: "disgust", color: "A490C6", emoji: "🤢"}, {name: "anger", color: "F3736D", emoji: "😡"}, {name: "surprise", color: "2CB0D9", emoji: "😮"}],
    ];

    render() {
        console.log(this.props.emotionStatus);
        return (
            <Container>
                <Row className={"align-items-center"}>
                    <Col xs={10} sm={8} md={8} lg={8} xl={8}>
                        {this.emotions.map((row, rowI) => {
                            return <Row key={rowI}>
                                {row.map((emotion, colI) => {
                                    let color, fontColor;
                                    if (this.props.emotionStatus === null || this.props.emotionStatus === undefined
                                        || this.props.emotionStatus.label === null
                                        || this.props.emotionStatus.label === emotion.name) {
                                        color = emotion.color;
                                        fontColor = "black";
                                    } else {
                                        color = this.neutralColor;
                                        fontColor = "#" + this.neutralFontColor;
                                    }

                                    let className = "p-0";
                                    if (rowI === 1) {
                                        className += " mt-1"
                                    }
                                    return <Col key={colI} className="p-0 mr-1">
                                        <Button className={className}  block
                                                style={{
                                                    background: "#" + color + "8A",
                                                    // backgroundOpacity: 0.5,
                                                    width: "100%",
                                                    color: fontColor,
                                                    fontSize: 14,
                                                    borderRadius: 0
                                                }}
                                                onClick={(e) => this.props.onClick ? this.props.onClick(e, "label", emotion.name) : () => null}
                                                rounded={"false"}>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                                                    <span role="img"
                                                                                          style={{fontSize: 32}}
                                                                                          aria-label={emotion.name + " emoji"}>
                                        {emotion.emoji}
                                    </span>
                                                    </Col>
                                                </Row>
                                            </Container>

                                            <Row className={"mt-n1 mb-1"}>
                                                <Col>
                                                    <b>{emotion.name}</b>
                                                </Col>
                                            </Row>
                                        </Button>
                                    </Col>;
                                })}
                            </Row>;
                        })
                        }
                    </Col>
                    <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                        {this.getIntensityRow(highVolSrc, "strong", 2,true, "#a9a9a9")}
                        {this.getIntensityRow(mediumVolSrc, "medium", 1,false, "#c3c3c3")}
                        {this.getIntensityRow(lowVolSrc, "weak", 0,false,"#e3e3e3")}
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} className={"p-0 pl-1"}>
                        <div style={{textAlign: "center", color: this.props.instructionsTextColor}}><b>or</b></div>
                        {this.getPurelyFactualButton()}
                    </Col>
                </Row>
                <ImNotSureCheckboxRow fontSize={this.props.imNotSureFontSize}
                                      checked={this.props.emotionStatus.notSure}
                                      onClick={this.props.onClick}/>
            </Container>
        );
    }

    getPurelyFactualButton() {
        let backgroundColor = "#b09d6d";
        let fontColor = "black";
        if(this.props.emotionStatus !== undefined && this.props.emotionStatus !== null
            && this.props.emotionStatus.label !== null
            && this.props.emotionStatus.label !== "purely factual") {
            backgroundColor = "#" + this.neutralColor;
            fontColor = "#" + this.neutralFontColor;
        }
        const style = {
            background: backgroundColor,
                // backgroundOpacity: 0.5,
                width: "100%",
                color: fontColor,
                fontSize: 14,
                borderRadius: 0,
        };
        return <Button block className={"p-0"}
                style={style}
                onClick={(e) => this.props.onClick ? this.props.onClick(e, "label", "purely factual") : () => null}
                rounded={"false"}>
            <Container>
                <Row>
                    <Col>
                                                    <span role="img"
                                                          style={{fontSize: 32}}
                                                          aria-label={"purely factual emoji"}>
                                                    🔩
                                                </span>
                    </Col>
                </Row>
            </Container>

            <Row className={"mt-n1 mb-1"}>
                <Col>
                    <b>purely factual</b>
                </Col>
            </Row>
        </Button>
    }

    getIntensityRow(imgSrc, text, intensity, margitTop=false, color="#d1d1d1") {
        let fontColor = "black";
        let newColor = color;
        if (this.props.emotionStatus !== undefined && this.props.emotionStatus !== null
            && this.props.emotionStatus.intensity !== null
            && this.props.emotionStatus.intensity !== intensity) {
            newColor = "#" + this.neutralColor;
            fontColor = "#" + this.neutralFontColor;
        }

        const styleDict = {
            background: newColor,
            color: fontColor,
            height: "100%",
            width: "100%",
            borderRadius: 0,
            fontSize: 14,
        };
        if(!margitTop) {
            styleDict.borderTop = "none";
        }
        return <Row >
            <Col className={"pl-2 pr-2"} >
                <Button block className={""}
                        style={styleDict}
                        size={"sm"}
                        onClick={(e) => this.props.onClick ? this.props.onClick(e, "intensity", intensity) : () => null}
                        disabled={this.props.emotionStatus.intensity === -1}
                >
                    <Container>
                        <Row>
                            <Col className={"p-0"}>
                                <Media left>
                                    <Media object style={{
                                        maxWidth: '21px',
                                        opacity: "80%"
                                    }}
                                           src={imgSrc} alt={text} />
                                </Media>
                            </Col>
                        </Row>
                        <Row className={"mt-n1"}>
                            <Col className={"p-0"}>
                                <b>{text}</b>
                            </Col>
                        </Row>
                    </Container></Button>
            </Col>
        </Row>;
    }
}

export default PlutchikSelector;
