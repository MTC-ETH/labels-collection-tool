import React from "react";

import {Col, Row} from "reactstrap";

class TechnicalInstructions extends React.Component {
    render() {
        return <>
            <Row>
                <Col>
                    <h3>Technische Anweisungen und Vergütung</h3>
                    <h5>Technisch Anweisungen</h5>
                    <p>
                        Sobald Sie mit einem Artikel fertig sind, steht es Ihnen frei, den nächsten und so viele
                        Artikel zu beschriften, wie Sie möchten, bis zu einer Höchstzahl von XX. Wie bereits erwähnt,
                        können Sie die Arbeit jederzeit unterbrechen und später dort weitermachen, wo Sie aufgehört
                        haben. Die Antworten, die Sie für den aktuellen Artikel gegeben haben, werden gespeichert und
                        wieder geladen.
                    </p>
                    <p>
                        Um eine hohe Datenqualität zu gewährleisten, ist es nicht möglich, die Website von mobilen
                    Geräten aus zu benutzen (Tablets sind erlaubt).
                    </p>

                    <h5>Vergütung</h5>
                    <p>
                        Auf der Grundlage unserer internen Studien haben wir gemessen, dass die Beurteilung eines
                        Artikels im Durchschnitt XX Minuten dauert. Bei einem Lohn von XX CHF pro Stunde bedeutet
                        dies XX CHF für jeden beschrifteten Artikel. Ein Artikel gilt als abgeschlossen, wenn alle
                        Antworten richtig eingegeben und der Submit-Knopf gedrückt wurde. Für Artikel, die nur zur
                        Hälfte etikettiert sind, wird kein Geld ausgehändigt.
                    </p>
                </Col>
            </Row>
        </>;
    }
}

export default TechnicalInstructions;
