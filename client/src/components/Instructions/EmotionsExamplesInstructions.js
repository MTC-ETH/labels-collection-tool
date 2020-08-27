import React from "react";

import {Col, Row, Table, Container, Media} from "reactstrap";
import PlutchikSelector from "../Labelling/PlutchikSelector";
import Labelling from "../../views/Labelling";

class ExampleTableLine extends React.Component {
    render() {
        return <tr>
            <EmotionCell emotionName={this.props.emotionName}/>
            {/*<td className={"text-center align-middle"}>{this.props.strength}</td>*/}
            <IntensityCell intensityName={this.props.intensityName}/>
            <td className={"align-middle"} style={{background: Labelling.defaultProps.contentBackgroundColor}}>
                {this.props.children}
            </td>
        </tr>;
    }
}

class EmotionCell extends React.Component {
    render() {
        const emotion = PlutchikSelector.emotionsMap[this.props.emotionName];
        return <td className={"text-center align-middle"} style={{background: emotion.color + "8A"}}>
            <Container>
                <Row>
                    <Col>
                        <span role="img"
                              style={{fontSize: 28}}
                              aria-label={this.props.emotionName + " emoji"}>
                            {emotion.emoji}
                        </span>
                    </Col>
                </Row>
                <Row className={"mt-n1 mb-1"}>
                    <Col>
                        <b>{this.props.emotionName}</b>
                    </Col>
                </Row>
            </Container>
        </td>;
    }
}

class IntensityCell extends React.Component {
    render() {
        console.log(PlutchikSelector.intensitiesMap);
        const intensity = PlutchikSelector.intensitiesMap[this.props.intensityName];
        return <td className={"text-center align-middle"} style={{background: intensity.backgroundColor + "AA"}}>
            <Container>
                <Row>
                    <Col className={"p-0"}>
                        <Media left>
                            <Media object style={{
                                maxWidth: '21px',
                                opacity: "80%"
                            }}
                                   src={intensity.image} alt={intensity.label} />
                        </Media>
                    </Col>
                </Row>
                <Row className={"mt-n1"}>
                    <Col className={"p-0"}>
                        <b>{intensity.label}</b>
                    </Col>
                </Row>
            </Container>
        </td>;
    }
}


class EmotionsExamplesInstructions extends React.Component {
    render() {
        return <Container className={"p-0"}>
            <Row>
                <Col>
                    <h4>Beispiele für Emotionen</h4>
                    <h5>Definitionen von Emotionen</h5>
                    <Table>
                        <thead>
                        <tr>
                            <th>Emotion</th>
                            <th>Definition</th>
                            <th>Beispiel-Absatz</th>
                        </tr>
                        </thead>
                        <tbody>
                        <ExampleTableLine emotionName={"Angst"} intensityName={"stark"}>
                            Die täglichen Todesfälle, die monatelange Isolation und die Zukunftsangst schlagen auf
                            die Psyche. Amerikanische Experten warnen vor einer historischen Welle mentale
                            Gesundheitsprobleme, die dem Land bevorsteht: Depressionen, Drogenmissbrauch,
                            posttraumatische Belastungsstörung und Selbstmord.</ExampleTableLine>
                        <ExampleTableLine emotionName={"Angst"} intensityName={"mittel"}>
                            Das Problem: Das Parlament verlangt nun ein Sondergesetz. Und riskiert damit, dass ganz viel
                            wertvolle Zeit verloren geht. Und die Kurve wieder steigt.
                        </ExampleTableLine>
                        <ExampleTableLine emotionName={"Angst"} intensityName={"schwach"}>
                            Stattdessen öffnete die Regierung die Grenzen – und gab gleichzeitig die ­Verantwortung an
                            die Kantone ab. Diese sind mit der Aufgabe ganz offensichtlich überfordert, wie sich diese
                            Woche zeigte. So fehlen ihnen etwa die Passagier­listen all jener, die per Flugzeug oder
                            Bus aus Risikoländern kommen.
                        </ExampleTableLine>
                        </tbody>
                    </Table>
                    <h5>Intensität</h5>
                    <p>Beispiele für Kommentare mit <i>Angst</i>-Emotion, aber mit unterschiedlicher Intensität.
                        Das Thema ist die Schweizer Reaktion auf den Coronavirus.</p>
                    <Table>
                        <thead>
                        <tr>
                            <th>Emotion</th>
                            <th>Intensität</th>
                            <th>Beispiel-Absatz</th>
                        </tr>
                        </thead>
                        <tbody>
                        <ExampleTableLine emotionName={"Angst"} intensityName={"stark"}>
                        Die täglichen Todesfälle, die monatelange Isolation und die Zukunftsangst schlagen auf
                            die Psyche. Amerikanische Experten warnen vor einer historischen Welle mentale
                            Gesundheitsprobleme, die dem Land bevorsteht: Depressionen, Drogenmissbrauch,
                            posttraumatische Belastungsstörung und Selbstmord.</ExampleTableLine>
                        <ExampleTableLine emotionName={"Angst"} intensityName={"mittel"}>
                            Das Problem: Das Parlament verlangt nun ein Sondergesetz. Und riskiert damit, dass ganz viel
                            wertvolle Zeit verloren geht. Und die Kurve wieder steigt.
                        </ExampleTableLine>
                        <ExampleTableLine emotionName={"Angst"} intensityName={"schwach"}>
                            Stattdessen öffnete die Regierung die Grenzen – und gab gleichzeitig die ­Verantwortung an
                            die Kantone ab. Diese sind mit der Aufgabe ganz offensichtlich überfordert, wie sich diese
                            Woche zeigte. So fehlen ihnen etwa die Passagier­listen all jener, die per Flugzeug oder
                            Bus aus Risikoländern kommen.
                        </ExampleTableLine>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>;
    }
}

export default EmotionsExamplesInstructions;
