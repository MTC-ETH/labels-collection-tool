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
