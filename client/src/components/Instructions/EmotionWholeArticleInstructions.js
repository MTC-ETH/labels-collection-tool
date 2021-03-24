//   Copyright 2021 ETH Zurich, Media Technology Center
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

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
