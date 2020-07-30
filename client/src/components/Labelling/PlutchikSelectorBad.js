import React from "react";
import {Button, Col, Container, Media, Row} from "reactstrap";
import SelectorAbstract from "./SelectorAbstract";
import arrowDown from "../../assets/imgs/IntensityArrowDown.png";

class PlutchikSelectorBad extends SelectorAbstract {

    // options = [
    //     [{name: "serenity", color: "FFF0A1"}, {name: "joy", color: "FFDE7A"}, {name: "ecstasy", color: "FFCC08"},
    //     {name: "grief", color: "2884C7"}, {name: "sadness", color: "74A9DB"}, {name: "pensiveness", color: "A1C2E7"}],
    //     [{name: "acceptance", color: "CBE08C"}, {name: "trust", color: "ACD46A"}, {name: "admiration", color: "8BC84F"},
    //         {name: "loathing", color: "8A73B3"}, {name: "disgust", color: "A490C6"}, {name: "boredom", color: "BAABD3"}],
    //     [{name: "apprehension", color: "7BC798"}, {name: "fear", color: "2FB774"}, {name: "terror", color: "00A651"},
    //         {name: "rage", color: "F15A61"}, {name: "anger", color: "F3736D"}, {name: "annoyance", color: "F58F81"}],
    // [{name: "interest", color: "FDC788"}, {name: "anticipation", color: "FBAF64"}, {name: "vigilance", color: "F7933C"},
    //     {name: "amazement", color: "009BCF"}, {name: "surprise", color: "2CB0D9"}, {name: "distraction", color: "8ACAE8"}]
    // ];

    emotions = [
        [{name: "serenity", color: "FFF0A1"}, {name: "acceptance", color: "CBE08C"}, {name: "apprehension", color: "7BC798"}, {name: "interest", color: "FDC788"}],
            [{name: "joy", color: "FFDE7A"}, {name: "trust", color: "ACD46A"}, {name: "fear", color: "2FB774"}, {name: "anticipation", color: "FBAF64"}],
            [{name: "ecstasy", color: "FFCC08"}, {name: "admiration", color: "8BC84F"}, {name: "terror", color: "00A651"}, {name: "vigilance", color: "F7933C"}],

        [{name: "grief", color: "2884C7"}, {name: "loathing", color: "8A73B3"}, {name: "rage", color: "F15A61"}, {name: "amazement", color: "009BCF"}],
            [{name: "sadness", color: "74A9DB"}, {name: "disgust", color: "A490C6"}, {name: "anger", color: "F3736D"}, {name: "surprise", color: "2CB0D9"}],
            [{name: "pensiveness", color: "A1C2E7"}, {name: "boredom", color: "BAABD3"}, {name: "annoyance", color: "F58F81"}, {name: "distraction", color: "8ACAE8"}]
    ];

    getEmotionButton = (name, selectedColor, isPrimary=false) => {
        let color, fontColor;
        if(this.props.selectedEmotion === null || this.props.selectedEmotion === name) {
            color = selectedColor;
            fontColor = "black";
        }
        else {
            color = this.neutralColor;
            fontColor = "#" + this.neutralFontColor;
        }

        return <Button className="p-1" block
                                                      style={{background: "#" + color,
                                                          // width: "100%",
                                                          color: fontColor,
                                                          fontSize: (isPrimary ? "13px" : "12px"),
                                                          borderRadius: 0}}
                                                      onClick={(e) => this.props.onClick(e, name)}
                                                      rounded={false}>
            {isPrimary ? <b>{name}</b> : name}
        </Button>;
    }

    render() {
        return (
            <Container fluid >
                <Row >
                    <Col xs={11} sm={11} md={11} lg={11} xl={11} >
                        <Row>
                    <Col >
                        <Row>
                            {this.getEmotionButton("serenity", "FFF0A1")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("joy", "FFDE7A", true)}
                        </Row>
                        <Row>
                            {this.getEmotionButton("ecstasy", "FFCC08")}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            {this.getEmotionButton("acceptance", "CBE08C")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("trust", "ACD46A", true)}
                        </Row>
                        <Row>
                            {this.getEmotionButton("admiration", "8BC84F")}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            {this.getEmotionButton("apprehension", "7BC798")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("fear", "2FB774", true)}
                        </Row>
                        <Row>
                            {this.getEmotionButton("terror", "00A651")}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            {this.getEmotionButton("interest", "FDC788")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("anticipation", "FBAF64", true)}
                        </Row>
                        <Row>
                            {this.getEmotionButton("vigilance", "F7933C")}
                        </Row>
                    </Col>
                        </Row>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1} xl={1} >
                        <Row>
                    <Col>
                        <Row>
                            <Col >
                            <Media object
                                   style={{
                                width:10,
                                maxHeight: 'auto',
                                maxWidth: '20%',
                            }}
                                   src={arrowDown} alt="intensity decreases" />
                            </Col>
                        </Row>
                    </Col>
                        </Row>
                    </Col>
                </Row>
                <Row >
                    <Col xs={11} sm={11} md={11} lg={11} xl={11} >
                        <Row>
                    <Col>
                        <Row>
                            {this.getEmotionButton("grief", "2884C7")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("sadness", "74A9DB", true)}
                        </Row>
                        <Row>
                            {this.getEmotionButton("pensiveness", "A1C2E7")}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            {this.getEmotionButton("loathing", "8A73B3")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("disgust", "A490C6", true)}
                        </Row>
                        <Row>
                            {this.getEmotionButton("boredom", "BAABD3")}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            {this.getEmotionButton("rage", "F15A61")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("anger", "F3736D", true)}
                        </Row>
                        <Row>
                            {this.getEmotionButton("annoyance", "F58F81")}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            {this.getEmotionButton("amazement", "009BCF")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("surprise", "2CB0D9")}
                        </Row>
                        <Row>
                            {this.getEmotionButton("distraction", "8ACAE8")}
                        </Row>
                    </Col>
                        </Row>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1} xl={1} >
                        <Row>
                    <Col>
                        <Row>
                            <Media object style={{
                                maxHeight: 'auto',
                                maxWidth: '56%',
                            }}
                                   src={arrowDown} alt="intensity decreases" />
                        </Row>
                    </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PlutchikSelectorBad;
