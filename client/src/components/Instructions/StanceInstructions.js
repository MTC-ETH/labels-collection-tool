import React from "react";

import {Col, Row} from "reactstrap";
import StanceSelectorOrizontal from "../Labelling/StanceSelectorOrizontal";
import Labelling from "../../views/Labelling";

class StanceInstructions extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {stanceArticleQuestionLabel: {label: null, notSure: false}}

        this.handleStanceArticle = this.handleStanceArticle.bind(this);
    }

    handleStanceArticle(event, fieldToUpdate, data) {
        const stanceArticleQuestionLabel = this.state.stanceArticleQuestionLabel;
        stanceArticleQuestionLabel[fieldToUpdate] = data;
        this.setState({stanceArticleQuestionLabel});
    }

    render() {
        return <Row>
            <Col>
                <h3>3 - Stance of the article towards a topic</h3>
                <h5>Task definition</h5>
                <p>You are then asked to select the stance of the article towards
                    a given topic. You are given a question and 4 possible answers <i>in favour, discussing,
                        against</i> and <i>unrelated</i>. An example question can be: <i>Should abortion be legal?</i>.
                    The meaning of the four possible answers follows:</p>
                <ul>
                    <li>
                        <i>Ja, dafür</i> means the article agrees with the question and
                        has a positive stance towards the topic
                    </li>
                    <li>
                        <i>Diskutierend</i> means the article talks about the topic, but does not take
                        a clear stance
                    </li>
                    <li>
                        <i>Nein, gegen</i> means the article disagrees with the question and
                        has a negative stance towards the topic
                    </li>
                    <li>
                        <i>Kein Bezug</i> means the article does not talk about the topic and does not address the
                        question.
                    </li>
                </ul>
                <h5>User interface example</h5>
                Below you can find an example of how the user interface looks. Again, feel free to
                play with the interface.
                <div className={"mt-2"}>
                    <h5 style={{color: Labelling.defaultProps.instructionsTextColor}}>Should abortion be legal?</h5>
                </div>
                <StanceSelectorOrizontal onClick={this.handleStanceArticle}
                                         stanceStatus={this.state.stanceArticleQuestionLabel}/>
            </Col>
        </Row>;
    }
}

export default StanceInstructions;
