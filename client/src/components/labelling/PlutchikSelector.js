import {Card, CardBody} from "reactstrap";
import React from "react";
import {Button, Col, Container, Row} from "reactstrap";

class PlutchikSelector extends React.Component {

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


    constructor(props, context) {
        super(props, context);
        
    }

    emotions = [
        [{name: "serenity", color: "FFF0A1"}, {name: "acceptance", color: "CBE08C"}, {name: "apprehension", color: "7BC798"}, {name: "interest", color: "FDC788"}],
            [{name: "joy", color: "FFDE7A"}, {name: "trust", color: "ACD46A"}, {name: "fear", color: "2FB774"}, {name: "anticipation", color: "FBAF64"}],
            [{name: "ecstasy", color: "FFCC08"}, {name: "admiration", color: "8BC84F"}, {name: "terror", color: "00A651"}, {name: "vigilance", color: "F7933C"}],
            [{name: "grief", color: "2884C7"}, {name: "loathing", color: "8A73B3"}, {name: "rage", color: "F15A61"}, {name: "amazement", color: "009BCF"}],
            [{name: "sadness", color: "74A9DB"}, {name: "disgust", color: "A490C6"}, {name: "anger", color: "F3736D"}, {name: "surprise", color: "2CB0D9"}],
            [{name: "pensiveness", color: "A1C2E7"}, {name: "boredom", color: "BAABD3"}, {name: "annoyance", color: "F58F81"}, {name: "distraction", color: "8ACAE8"}]
    ];

    render() {
        return (
            <Container>
                {this.emotions.map(row => {
                    return <Row>
                        {row.map(emotion => {
                            return <Col className="pr-1 pl-0"><Button className="p-1"
                                                style={{background: "#" + emotion.color,
                                                    width: "100%",
                                                color: "black",
                                                fontSize: "12px"}}>
                                <b>{emotion.name}</b>
                            </Button></Col>;
                        })}
                    </Row>;
                })
                }

            </Container>
        );
    }
}

export default PlutchikSelector;
