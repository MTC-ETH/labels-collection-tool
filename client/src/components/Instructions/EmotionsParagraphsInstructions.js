import React from "react";

import {Col, Row} from "reactstrap";
import PlutchikSelector from "../Labelling/PlutchikSelector";
import Paragraph from "../Labelling/Paragraph";

class EmotionsParagraphsInstructions extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            emotionStatus: {label: null, intensity: null, notSure: false},
            correctEmotionStatus: {label: "Ärger", intensity: 1, notSure: false}
        };
        this.handleEmotionParagraph = this.handleEmotionParagraph.bind(this);
    }

    handleEmotionParagraph(event, fieldToUpdate, data) {
        console.log("handleEmotionParagraph");
        let emotionStatus = {...this.state.emotionStatus};
        emotionStatus[fieldToUpdate] = data;
        if(data === PlutchikSelector.emotionlessLabel) {
            emotionStatus.intensity = -1
        }
        else if(fieldToUpdate === "label" && emotionStatus.intensity === -1) {
            emotionStatus.intensity = null;
        }
        this.setState({emotionStatus});
    }

    render() {
        return <>
            <Row>
                <Col>
                    <h3>1 - Emotion of each paragraph</h3>
                    <h5>Task definition</h5>
                    <p>Read the article carefully; for each paragraph, select one emotion on the right
                        side that best replies to the question: "<i><b>Which is the emotion conveyed in this paragraph?</b></i>".
                        You can choose among one of the 8 primary emotions of the <a
                            href={"https://en.wikipedia.org/wiki/Robert_Plutchik#Plutchik's_wheel_of_emotions"}
                            target={"_blank"}
                            rel="noopener noreferrer"> Plutchik wheel of emotions</a>,
                        a definition of emotions widely used in the scientific literature. The 8 emotions are:
                        <i> Freude, Traurigkeit, Vertrauen, Ekel, Angst, Ärger, Antizipation, Überraschung</i>.
                        You can only select one emotion per paragraph. If in doubt, select the emotion which is
                        conveyed in a stronger manner by the text. <br/>
                        After selecting the emotion, select its intensity
                        among <i>wenig, mittel, stark</i>. <br/>
                        If you're unsure of your answer you can signal this by selecting the option "Ich bin mir meiner
                        Antwort nicht sicher."
                        </p>
                </Col>
                {/*<Col xs={12} sm={12} md={7} lg={7} xl={7} className={"p-0"}>*/}
                {/*    <div  className={"p-2"} style={{*/}
                {/*        border: "0.10em",*/}
                {/*        borderStyle: "dashed",*/}
                {/*    }}>*/}
                {/*        <PlutchikSelector/>*/}
                {/*    </div>*/}
                {/*</Col>*/}
            </Row>
            <Row>
                <Col>
                    <h5>User interface example</h5>
                    <p>Below you can find an example of how the user interface looks. On the left you find the paragraph
                        and on the right the widget which allows you to select the emotion and its strength.
                        Feel free to play with the widget and, for example, click on (<i>Ärger</i>) and then on
                        (<i>mittel</i>), which would be the correct answers for this paragraph.</p>
                </Col>
            </Row>
            <Row>
                <Col className={"pr-0"}>
                    <div  className={"p-2 pl-3 mb-4"} style={{
                        border: "0.10em",
                        borderStyle: "dashed",
                    }}>
                    <Paragraph margins={"pl-1"}
                    emotionStatus={this.state.emotionStatus}
                    onClick={this.handleEmotionParagraph}>
                        Dennoch gibt der Bund jedes Jahr Steuergelder aus, um den Schweizern noch mehr Appetit auf
                        Fleisch zu machen.	</Paragraph>
                    </div>
                </Col>
            </Row>
        </>;
    }
}

export default EmotionsParagraphsInstructions;
