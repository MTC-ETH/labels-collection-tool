import React from "react";
import {Button, Col, Container} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";
import queryString from 'query-string';
import EmotionsParagraphsInstructions from "../components/Instructions/EmotionsParagraphsInstructions";
import TechnicalInstructions from "../components/Instructions/TechnicalInstructions";
import Footer from "../components/Footer";
import EmotionsExamples from "../components/Instructions/EmotionsExamples";
import StanceInstructions from "../components/Instructions/StanceInstructions";
import ContainedHr from "../components/ContainedHr";
import EmotionWholeArticleInstructions from "../components/Instructions/EmotionWholeArticleInstructions";
import StanceExamples from "../components/Instructions/StanceExamples";


class Instructions extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {token: null};
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.setState({token: params.token});
    }

    render() {
        return (<>
            <Header selectedPage={"instructions"}/>
            <Container>
                <Row><Col><h2>Instructions</h2></Col></Row>
                <Row>
                    <Col>
                        <p>For each page you are given an article divided in paragraphs. You will be asked to:</p>
                        <ol>
                            <li>Assign an <b>emotion</b> label to each <b>paragraph</b></li>
                            <li>Assign an <b>emotion</b> label to the <b>whole article</b></li>
                            <li>Assess the <b>stance</b> of the <b>article</b> towards a given topic</li>
                        </ol>
                         <p>
                            At any time of the process if you're feeling tired or strained feel free to stop and
                            continue
                            later, all your inputs are saved and nothing will be lost, also when stopping in the middle
                            of an article.</p>
                    </Col>
                </Row>
                <EmotionsParagraphsInstructions/>
                <EmotionsExamples/>
                <ContainedHr/>
                <EmotionWholeArticleInstructions/>
                <ContainedHr margins={"mt-n2 mb-4"}/>
                <StanceInstructions/>
                <StanceExamples/>
                <ContainedHr margins={"mb-4"}/>
                <TechnicalInstructions/>
                <Row>
                    <Col>
                        <Button className="p-1"
                                size={"lg"}
                                href={this.state.token ? "/labelling?token=" + this.state.token : "/labelling"} block>
                            Start or continue labelling
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>);
    }
}

export default Instructions;
