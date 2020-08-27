import React from "react";
import {Button, Col, Container} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";
import queryString from 'query-string';
import ArticleSectionInstructions from "../components/Instructions/ArticleSectionInstructions";
import TechnicalInstructions from "../components/Instructions/TechnicalInstructions";
import Footer from "../components/Footer";
import EmotionsExamplesInstructions from "../components/Instructions/EmotionsExamplesInstructions";


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
            <Header/>
            <Container>
                <Row><Col><h2>Instructions</h2></Col></Row>
                <Row>
                    <Col>
                        <p>For each page you are given an article divided in paragraphs. <br/>
                            At any time of the process if you're feeling tired or strained feel free to stop and
                            continue
                            later, all your inputs are saved and nothing will be lost, also when stopping in the middle
                            of an article.</p>
                    </Col>
                </Row>
                <ArticleSectionInstructions/>
                {/*<EmotionsExamplesInstructions/>*/}
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
