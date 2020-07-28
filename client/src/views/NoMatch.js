import React from "react";
import axios from 'axios';
import queryString from 'query-string';
import Article from "../components/Labelling/Article";
import Comments from "../components/Labelling/CommentsContainer";
import ArticleInstructions from "../components/Labelling/ArticleInstructions";
import CommentsInstructions from "../components/Labelling/CommentsInstructions";
import ArticleStanceQuestion from "../components/Labelling/ArticleStanceQuestion";
import SubmitInstructionsAndButton from "../components/Labelling/SubmitInstructionsAndButton";
import {Button, Col, Container, UncontrolledAlert} from "reactstrap";
import Row from "reactstrap/es/Row";

// const labellerID = "5f199424dcf1cfe56a7436a7";

class NoMatch extends React.Component {



    render() {
        return (<Container className={"pt-4"}>
            <Row>
                <Col>
                    <UncontrolledAlert color="danger" fade={true}>
                                    <span className="alert-inner--icon">
                                        <i className="ni ni-support-16" />
                                    </span>
                        <span className="alert-inner--text ml-1">
                        <strong>Error 404!</strong> The page you're searching for cannot be found.
                                    </span>
                    </UncontrolledAlert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="p-1"
                            size={"lg"}
                            style={{width: "100%"}}
                            color={"primary"}
                            onClick={() =>  this.props.history.push("/")}>
                        Go to Home
                    </Button>
                </Col>
            </Row>
        </Container>);
    }
}

export default NoMatch;
