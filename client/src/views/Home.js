import React from "react";
import {Button, Col, Container} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";
import Footer from "../components/Footer";

class Home extends React.Component {



    render() {
        return (<>
            <Header/>
            <Container>
                <Row><Col><h2>Emotions & Stance Project - Labelling Tool</h2></Col></Row>
                <Row>
                    <Col>
                        <p>
                            Welcome to the labelling tool related to the project emotion & stance detection
                            from the ETH <a target="_blank" rel="noopener noreferrer" href="https://mtc.ethz.ch">
                            Media Technology Center (MTC)</a>.
                            This online tool has the purpose of collection the manual labels for the datasets
                            related to the project.</p>
                        <h4>Project description</h4>
                        <p>The goal of the project is to create a machine learning pipeline to automatically detect
                        the stance and the emotion of news paper articles and user comments. What emotions does the article
                        convey? What stance does a comment take towards its article?<br/>
                        Emotion and stance detection can help to curate content and to understand reactions, behaviors,
                        opinions and feelings of readers. Furthermore, it can help alleviating the problem of
                        polarization and opinion bias in the media.<br/>
                        While technologies to estimate emotion and stance for English have seen large
                            advances, they lack behind for German. We aim at closing this gap.</p>
                        <h4>Your role as the human labeller and your tasks</h4>
                        <p>To train the machine learning model we need a dataset of news articles and user comments
                        paired with stance and emotion labels. You will play a crucial role in this the work. <br/>
                        For article you will be asked to label every paragraph with an emotion tag, reply to a
                        question regarding the stance of an article towards a topic and for each comment select
                        an emotion and a stance. <br/>
                            For more details about the task and the remuneration please see the <a href={"/instructions"}>instructions page</a>.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="p-1"
                                size={"lg"}
                                // color={"primary"}
                                href={"/register"} block>
                            Register as labeller
                        </Button>
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Button className="p-1"
                                // size={"lg"}
                                // color={"primary"}
                                href={"/authenticatelabeller"} block>
                            Continue labelling (your token is required)
                        </Button>
                    </Col>
                </Row>
        </Container>
            <Footer/>
            </>);
    }
}

export default Home;
