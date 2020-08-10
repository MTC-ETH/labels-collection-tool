import React from "react";
import {Button, Col, Container, Media, Row} from "reactstrap";
import SelectorAbstract from "./SelectorAbstract";
import arrowDown from "../../assets/imgs/IntensityArrowDown.png";
import arrowUp from "../../assets/imgs/IntensityArrowUp.png";


class PlutchikSelector8WithIntensityCompact extends SelectorAbstract {

    emotions = [
            [{name: "joy", color: "FFDE7A", emoji: "😊"}, {name: "trust", color: "ACD46A", emoji: "🤝"}, {name: "fear", color: "2FB774", emoji: "😨"}, {name: "anticipation", color: "FBAF64", emoji: "👀"}],
            [{name: "sadness", color: "74A9DB", emoji: "😞"}, {name: "disgust", color: "A490C6", emoji: "🤢"}, {name: "anger", color: "F3736D", emoji: "😡"}, {name: "surprise", color: "2CB0D9", emoji: "😮"}],
    ];

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                {this.emotions.map((row, rowI) => {
                    return <Row key={rowI} className={"mt-2"}>
                        {row.map((emotion, colI) => {
                            let color, fontColor;
                            if(this.props.selectedEmotion === null || this.props.selectedEmotion === emotion.name) {
                                color = emotion.color;
                                fontColor = "black";
                            }
                            else {
                                color = this.neutralColor;
                                fontColor = "#" + this.neutralFontColor;
                            }

                            let className = "pr-2 pl-0";
                            if(rowI === 3) {
                                className += " pt-2"
                            }
                            return <Col key={colI} className={className}>
                                <Container>
                                    <Row>
                                        <Col className={"p-0"}>
                                <Button className="p-0"
                                                style={{
                                                    background: "#" + color + "8A",
                                                    // backgroundOpacity: 0.5,
                                                    width: "100%",
                                                color: fontColor,
                                                fontSize: "15px",
                                                    borderRadius: 0}}
                            onClick={(e) => this.props.onClick(e, emotion.name)}
                                        rounded={false}><span role="img" style={{fontSize: 28}} aria-label={emotion.name + " emoji"}>{emotion.emoji}</span><br/><b>{emotion.name}</b></Button>
                            </Col>
                                    </Row>
                                    <Row >
                                        <Col className={"p-0"}>
                                            <Button block style={{background: "#" + emotion.color + "FF",
                                                color: "#000000", fontSize: 12, borderRadius: 0,
                                                borderTop: "none",
                                                borderRight: "none"}} size={"sm"}>⬆️</Button>
                                        </Col >
                                                <Col className={"p-0"}>
                                                    <Button block style={{background: "#" + emotion.color + "8A",
                                                    color: "#000000", fontSize: 12, borderRadius: 0,
                                                        borderTop: "none",
                                                        borderRight: "none"}}
                                                            size={"sm"}>
                                                        <span >⏺</span>
                                                    </Button>
                                                </Col>
                                                <Col className={"p-0"}>
                                                    <Button
                                                        block style={{background: "#" + emotion.color + "3A",
                                                        color: "#000000", fontSize: 12, borderRadius: 0,
                                                        borderTop: "none"}}
                                                        size={"sm"}
                                                    >⬇️</Button>
                                                </Col>
                                    </Row>
                                </Container>
                            </Col>;
                        })}
                    </Row>;
                })
                }
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PlutchikSelector8WithIntensityCompact;
