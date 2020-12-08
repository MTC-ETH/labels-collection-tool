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

class EmotionWholeArticleInstructions extends React.Component {
    render() {
        return <Row>
                <Col>
                    <h3>2 - Emotion des ganzen Artikels</h3>
                    <p>
                        Nachdem Sie alle Absätze des Artikels gelesen und beschriftet haben, werden Sie auch gebeten,
                        dem gesamten Artikel eine Emotionsbeschriftung zuzuweisen. Dies sollte die Frage beantworten:
                        "<i><b>Welche Emotion wird vom gesamten Text am Stärksten vermittelt?</b></i>"
                        <br/>
                        Um diese Frage zu beantworten, wird Ihnen die gleiche Benutzeroberfläche präsentiert,
                        die auch für die Beschriftung der Absätze verwendet wird.
                        </p>
                </Col>
            </Row>;
    }
}

export default EmotionWholeArticleInstructions;
