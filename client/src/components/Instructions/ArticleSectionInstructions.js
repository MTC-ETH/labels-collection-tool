import React from "react";

// reactstrap components
import {Col, Row} from "reactstrap";
import PlutchikSelector from "../Labelling/PlutchikSelector";

class ArticleSectionInstructions extends React.Component {
    render() {
        return <>
            <Row>
                <Col>
                    <h4>Article section</h4>
                    <h5>Emotions</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <p>Read the article carefully; for each paragraph, select one emotion on the right
                        side that best replies to the question: "<i>Which is the emotion conveyed in this paragraph?</i>".
                        You can choose among one of the 8 primary emotions of the <a
                            href={"https://en.wikipedia.org/wiki/Robert_Plutchik#Plutchik's_wheel_of_emotions"}
                            target={"_blank"}
                            rel="noopener noreferrer"> Plutchik wheel of emotions</a>,
                        a definition of emotions widely used in the scientific literature.
                        </p>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <p>The widget which allows to select the emotion is visible on the right.
                        You can only select one emotion per paragraph. If in doubt, select the emotion which is
                        conveyed in a stronger manner by the text. After selecting the emotion, select its intensity
                        among <i>low, medium, high</i>.
                        </p>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div  className={"p-2"} style={{
                        border: "0.10em",
                        borderStyle: "dashed",
                        // borderWidth: "thin"
                    }}>
                        <PlutchikSelector/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Stance</h5>
                    <p>After reading the whole article you are asked to select the stance of the article towards
                        a given topic. You are given a question and 4 possible answers <i>in favour, discussing,
                            against</i> and <i>unrelated</i>. An example question can be: <i>Should abortion be legal?</i>.
                        The meaning of the four possible answers follows:</p>
                        <ul>
                            <li>
                                <i>in favour</i> means the article agrees with the question and
                                has a positive stance towards the topic
                            </li>
                            <li>
                                <i>discussing</i> means that the article talks about the topic, but doesn't take
                                a clear stance
                            </li>
                            <li>
                                <i>against</i> means the article disagrees with the question and
                                has a negative stance towards the topic
                            </li>
                            <li>
                                <i>unrelated</i> means the article doesn't talk about the topic and doens't address the
                                question.
                            </li>
                        </ul>
                </Col>
            </Row>
        </>;
    }
}

export default ArticleSectionInstructions;
