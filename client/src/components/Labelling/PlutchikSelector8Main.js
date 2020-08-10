import React from "react";
import {Button, Col, Container, Media, Row} from "reactstrap";
import SelectorAbstract from "./SelectorAbstract";
import arrowDown from "../../assets/imgs/IntensityArrowDown.png";
import arrowUp from "../../assets/imgs/IntensityArrowUp.png";


class PlutchikSelector8Main extends SelectorAbstract {

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
                            return <Row key={rowI}>
                                {row.map((emotion, colI) => {
                                    let color, fontColor;
                                    if (this.props.selectedEmotion === null || this.props.selectedEmotion === emotion.name) {
                                        color = emotion.color;
                                        fontColor = "black";
                                    } else {
                                        color = this.neutralColor;
                                        fontColor = "#" + this.neutralFontColor;
                                    }

                                    let className = "pr-2 pl-0";
                                    if (rowI === 3) {
                                        className += " pt-2"
                                    }
                                    return <Col key={colI} className={className}><Button className="p-1"
                                                                                         style={{
                                                                                             background: "#" + color + "8A",
                                                                                             width: "100%",
                                                                                             color: fontColor,
                                                                                             fontSize: (rowI === 1 || rowI === 4 ? "13px" : "12px"),
                                                                                             borderRadius: 0
                                                                                         }}
                                                                                         onClick={(e) => this.props.onClick(e, emotion.name)}
                                                                                         rounded={false}>
                                        {emotion.emoji ? <><span role="img" style={{fontSize: 32}}
                                                                 aria-label={emotion.name + " emoji"}>{emotion.emoji}</span><br/></>
                                            : null}
                                        <b>{emotion.name}</b>
                                    </Button></Col>;
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

export default PlutchikSelector8Main;
