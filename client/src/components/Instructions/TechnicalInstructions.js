// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

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
