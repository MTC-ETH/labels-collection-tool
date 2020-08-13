import React from "react";
import {Button, Col, Container, Row} from "reactstrap";
import SelectorAbstract from "./SelectorAbstract";


class PlutchikSelector8WithIntensitySlider extends SelectorAbstract {

    constructor(props, context) {
        super(props, context);
        this.getIntensityRow = this.getIntensityRow.bind(this);
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
                    <Col xs={12} sm={10} md={10} lg={10} xl={10}>
                        {this.emotions.map((row, rowI) => {
                            return <Row key={rowI}>
                                {row.map((emotion, colI) => {
                                    let color, fontColor;
                                    if (this.props.emotionStatus === null
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
                                    return <Col key={colI} className="p-0 mr-1 mr-1">
                                        <Button className={className}  block
                                                style={{
                                                    background: "#" + color + "8A",
                                                    // backgroundOpacity: 0.5,
                                                    width: "100%",
                                                    color: fontColor,
                                                    fontSize: 14,
                                                    borderRadius: 0
                                                }}
                                                onClick={(e) => this.props.onClick(e, emotion.name)}
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
                        {this.getIntensityRow("⬆️", "high️", 2,true, "#a9a9a9")}
                        {/*🌕*/}
                        {/*🌔*/}
                        {/*❗️❗️❗*/}
                        {this.getIntensityRow("⏺", "medium", 1,false, "#c3c3c3")}
                        {/*🌗*/}
                        {/*🌗*/}
                        {/*❗️❗️*/}
                        {this.getIntensityRow("⬇️", "low", 0,false,"#e3e3e3")}
                        {/*🌒*/}
                        {/*🌑*/}
                        {/*❗️*/}
                    </Col>
                </Row>
            </Container>
        );
    }

    getIntensityRow(emoji, text, intensity, margitTop=false, color="#d1d1d1") {
        let fontColor = "black";
        let newColor = color;
        if (this.props.emotionStatus !== null
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
            <Col className={"p-0"} >
                <Button block className={"pr-0 pl-0"}
                        style={styleDict}
                        size={"sm"}
                        onClick={(e) => this.props.onClickIntensity(e, intensity)}
                >
                    <Container>
                        <Row>
                            <Col className={"p-0"}>
                                <span role="img"
                                      style={{fontSize: 14}}
                                      aria-label={text + " emoji"}>
                                    {emoji}
                                </span>
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

export default PlutchikSelector8WithIntensitySlider;
