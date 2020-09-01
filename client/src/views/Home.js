import React from "react";
import {Button, Col, Container} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";
import Footer from "../components/Footer";

class Home extends React.Component {
    render() {
        return (<>
            <Header/>
            <Container>
                <Row><Col><h2>Projekt Emotionen & Standpunkt - Labelling-Tool</h2></Col></Row>
                <Row>
                    <Col>
                        <p>
                            Willkommen beim Labelling-Tool für das Projekt Emotionen- und Standpunkterkennung des
                            ETH <a target="_blank" rel="noopener noreferrer" href="https://mtc.ethz.ch">
                            Media Technology Center (MTC)</a>. Dieses Online-Tool hat den Zweck, die für das Projekt
                            notwendigen Daten zu sammeln. Um dies zu erreichen, werden Menschen Zeitungsartikel
                            gezeigt und gebeten, diese einer Emotion und einem Standpunkt zuzuordnen.
                        </p>
                        <h4>Beschreibung des Projekts</h4>
                        <p>Ziel des Projekts ist es, ein Tool mittels künstlichen Intelligenz (KI) zu schaffen,
                            das automatisch den Standpunkt und die Emotion von Zeitungsartikeln erkennt. Welche
                            Emotionen vermittelt der Artikel? Welche Standpunkt nimmt er zu einem bestimmten Thema ein?
                            <br/>
                            Die Erkennung von Emotionen und Standpunkten kann helfen, Inhalte zu kuratieren und
                            Reaktionen, Verhaltensweisen, Meinungen und Gefühle der Leser zu verstehen. Darüber
                            hinaus kann sie dazu beitragen, das Problem der Polarisierung und der Verzerrung von
                            Meinungen in den Medien zu mildern.<br/>
                            Im englischen Sprachraum konnten bereits grosse Fortschritte bei der Bestimmung von
                            Emotionen und Standpunkten erzielt werden, im deutschsprachigen Raum hingegen ist die
                            Technologie noch nicht so weit. Unser Ziel ist es, diese Lücke zu schließen.
                        </p>

                        <h4>Ihre Rolle als Beschrifter und Ihre Aufgabens</h4>
                        <p>
                            Um das KI-Tool zu trainieren, benötigen wir einen Datensatz von Nachrichtenartikeln,
                            gepaart mit Standpunkt- und Emotionsbeschriftungen. Ein Label ist ein Tag oder eine
                            Kategorie, die einem Text zugeordnet ist. Im Zusammenhang mit Emotionen könnte zum Beispiel
                            das Label "<i>Freude</i>" dem Text "<i>Ich bin so glücklich</i>” zugeordnet werden.
                            Sie werden bei dieser Beschriftungsarbeit eine entscheidende Rolle spielen.<br/>
                            Für jeden Artikel werden Sie gebeten, jedem Absatz ein Label mit einem Emotionstag
                            zuzuordnen und eine Frage bezüglich des Standpunkts eines Artikels zu beantworten. <br/>
                            Weitere Einzelheiten über die Aufgabe und die Vergütung finden Sie auf der
                            <a href={"/instructions"}> Anleitungsseite</a>.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="p-1"
                                size={"lg"}
                                href={"/register"} block>
                            Als Beschrifter registrieren
                        </Button>
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Button className="p-1"
                                href={"/authenticatelabeller"} block>
                            Beschriftung fortsetzen (Ihr Token ist erforderlich)
                        </Button>
                    </Col>
                </Row>
        </Container>
            <Footer/>
            </>);
    }
}

export default Home;
