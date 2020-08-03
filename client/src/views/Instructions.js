import React from "react";
import {Button, Col, Container} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";
import queryString from 'query-string';
import ArticleSectionInstructions from "../components/Instructions/ArticleSectionInstructions";
import CommentsSectionInstructions from "../components/Instructions/CommentsSectionInstructions";
import TechnicalInstructions from "../components/Instructions/TechnicalInstructions";
import Footer from "../components/Footer";


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
                        <p>For each page you are given an article divided in paragraphs and some comments
                            made by users under the respective article. <br/>
                            At any time of the process if you're feeling tired or strained feel free to stop and
                            continue
                            later, all your inputs are saved and nothing will be lost, also when stopping in the middle
                            of an article.</p>
                    </Col>
                </Row>
                <ArticleSectionInstructions/>
                <CommentsSectionInstructions/>
                <TechnicalInstructions/>
                <Row>
                    <Col>
                        <Button className="p-1"
                                size={"lg"}
                            // color={"primary"}
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
