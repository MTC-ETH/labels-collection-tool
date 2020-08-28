import React from "react";

import {Col, Row} from "reactstrap";

class EmotionWholeArticleInstructions extends React.Component {
    render() {
        return <Row>
                <Col>
                    <h3>2 - Emotion of the whole article</h3>
                    <p>After reading and labelling all the paragraphs of the article you will be asked also to assign
                        an emotion label to the whole article. This should answer the question
                        "<i><b>What emotion better summarizes the one conveyed by all the text of the article?</b></i>".
                        <br/>
                        To answer this question you will be presented the same user interface used to label the
                        paragraphs.
                        </p>
                </Col>
            </Row>;
    }
}

export default EmotionWholeArticleInstructions;
