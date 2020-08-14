import React from "react";

// reactstrap components
import {Col, Media, Row} from "reactstrap";
import PlutchikWheelNoIntermediate from "../../assets/imgs/PlutchikWheelNoIntermediate.svg";

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
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <p>Read the article carefully; for each paragraph, select an emotion on the right
                        side that best replies to the question: "<i>Which is the emotion conveyed in this paragraph?</i>".
                        You can only select one emotion per paragraphs. If in doubt, select the emotion which is
                        conveyed in a stronger
                        manner by the text.</p>
                    <p>You can choose among one of the 24 emotions of the <a
                        href={"https://en.wikipedia.org/wiki/Robert_Plutchik#Plutchik's_wheel_of_emotions"}
                        target={"_blank"}
                        rel="noopener noreferrer"> Plutchik wheel of emotions</a>,
                        a definition of emotions widely used in the scientific literature
                        and visible on the right. The emotions are divided into 3 levels of intensity,
                        creating 8 clusters of similar emotions with different intensity.
                        For example, <i>serenity</i> is a lighter emotion than <i>joy</i>, while <i>ecstasy</i> is the
                        stronger
                        version of <i>joy</i>. Moreover, each of the 8 clusters can be represented as the opposite
                        of another cluster, meaning that the respective emotions are mutually exclusive.
                        For example <i>sadness</i> is mutually exclusive with <i>joy</i> and for this reason they are
                        represented as two opposite clusters.</p>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Media object style={{
                        maxHeight: "auto",
                        maxWidth: "110%",
                        overflow: "hidden",
                    }}
                           src={PlutchikWheelNoIntermediate} className={"m-n4"} alt="Plutchik wheel"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>For simplicity and space reasons, the Plutchik wheel is flattened into a table in the labelling
                        page.
                        To reduce cognitive load, it is often easier to first choose the cluster of emotions and then
                        select the intensity of the emotion, either by keeping it, strengthening it
                        or weakening it. For example one could select the <i>joy</i> cluster and then choose its stronger
                        version <i>ecstasy</i>.</p>
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
