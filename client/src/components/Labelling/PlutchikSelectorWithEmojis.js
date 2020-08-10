import React from "react";
import {Button, Col, Container, Media, Row} from "reactstrap";
import SelectorAbstract from "./SelectorAbstract";
import arrowDown from "../../assets/imgs/IntensityArrowDown.png";
import arrowUp from "../../assets/imgs/IntensityArrowUp.png";


class PlutchikSelectorWithEmojis extends SelectorAbstract {

    emotions = [
        [{name: "serenity", color: "FFF0A1"}, {name: "acceptance", color: "CBE08C"}, {name: "apprehension", color: "7BC798"}, {name: "interest", color: "FDC788"}],
            [{name: "joy", color: "FFDE7A", emoji: "😊"}, {name: "trust", color: "ACD46A", emoji: "🤝"}, {name: "fear", color: "2FB774", emoji: "😨"}, {name: "anticipation", color: "FBAF64", emoji: "👀"}],
            [{name: "ecstasy", color: "FFCC08"}, {name: "admiration", color: "8BC84F"}, {name: "terror", color: "00A651"}, {name: "vigilance", color: "F7933C"}],
            [{name: "grief", color: "2884C7"}, {name: "loathing", color: "8A73B3"}, {name: "rage", color: "F15A61"}, {name: "amazement", color: "009BCF"}],
            [{name: "sadness", color: "74A9DB", emoji: "😞"}, {name: "disgust", color: "A490C6", emoji: "🤢"}, {name: "anger", color: "F3736D", emoji: "😡"}, {name: "surprise", color: "2CB0D9", emoji: "😮"}],
            [{name: "pensiveness", color: "A1C2E7"}, {name: "boredom", color: "BAABD3"}, {name: "annoyance", color: "F58F81"}, {name: "distraction", color: "8ACAE8"}]
    ];

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={11} sm={12} md={12} lg={11} xl={11} >
                {this.emotions.map((row, rowI) => {
                    return <Row key={rowI}>
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
                            return <Col key={colI} className={className}><Button className="p-1"
                                                style={{background: "#" + color + "8A",
                                                    // backgroundOpacity: 0.5,
                                                    width: "100%",
                                                color: fontColor,
                                                fontSize: (rowI === 1 || rowI === 4 ? "13px" : "12px"),
                                                    borderRadius: 0}}
                            onClick={(e) => this.props.onClick(e, emotion.name)}
                            rounded={false}>
                                {emotion.emoji ? <><span role="img" style={{fontSize: 28}} aria-label={emotion.name + " emoji"}>{emotion.emoji}</span><br/></>
                                    : null}
                                {rowI === 1 || rowI === 4 ? <b>{emotion.name}</b> : emotion.name}
                            </Button></Col>;
                        })}
                    </Row>;
                })
                }
                    </Col>
                    <Col xs={1} sm={0} md={0} lg={1} xl={1} className="d-xs-block d-none d-lg-block d-xl-block">
                        <Row>
                            <Media object style={{
                                maxHeight: 'auto',
                                maxWidth: '50%',
                                position: "absolute",
                                top: 0
                            }}
                                   src={arrowDown} alt="intensity decreases" />
                        </Row>
                        <Row>
                            <Media object style={{
                                maxHeight: 'auto',
                                maxWidth: '50%',
                                position: "absolute",
                                bottom: 0
                            }}
                                   src={arrowUp} alt="intensity increases" />
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PlutchikSelectorWithEmojis;
