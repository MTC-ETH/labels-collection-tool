import React from "react";
import axios from 'axios';
import FileDownload from 'js-file-download';

import {Button, Col, Container, Row} from "reactstrap";
import InfoRow from "../components/AdminDashboard/InfoRow";
import Header from "../components/Header";
import Footer from "../components/Footer";

class AdminDashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            nRegisteredLabellers: null,
            nTaggedArticles: null,
            nTaggedUniqueArticles: null,
            nTaggedComments: null,
            commentsPerArticle: null,
            labbellersPerArticle: null,
            multiLabelledArticles: null
        }
    }

    componentDidMount() {
        axios.get("/admindashboard/status")
            .then(res => {
                this.setState({
                    nRegisteredLabellers: res.data.nRegisteredLabellers,
                    nTaggedArticles: res.data.nTaggedArticles,
                    nTaggedUniqueArticles: res.data.nTaggedUniqueArticles,
                    nTaggedComments: res.data.nTaggedComments,
                    commentsPerArticle: res.data.commentsPerArticle,
                    labbellersPerArticle: res.data.interrater.labbellersPerArticle,
                    multiLabelledArticles: res.data.interrater.multiLabelledArticles,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleDownloadLabelled() {
        axios.get("/admindashboard/labelled?token=" + "temporarytoken")
            .then((response) => {
                FileDownload(JSON.stringify(response.data, null, 4), 'labelled.json');
            });
    }

    handleDownloadLabellers() {
        axios.get("/admindashboard/labellers?token=" + "temporarytoken")
            .then((response) => {
                FileDownload(JSON.stringify(response.data, null, 4), 'labellers.json');
            });
    }


    render() {
        return ( <>
            <Header/>
            <Container><Row><Col><h2>Admin Dashboard</h2></Col></Row></Container>
        <Container className="shape-container align-items-center">
                <Row className={"pt-2"}>
                    <Col>
                    <h3>Infos</h3>
                    </Col>
                </Row>
                <InfoRow counter={this.state.nRegisteredLabellers}>Number of registered labellers:</InfoRow>
                <InfoRow counter={this.state.nTaggedArticles}>Number of labelled articles:</InfoRow>
                <InfoRow counter={this.state.nTaggedUniqueArticles}>Number of uniquely labelled articles:</InfoRow>
                <InfoRow counter={this.state.nTaggedComments}>Number of labelled comments:</InfoRow>

            <Row className={"pt-2"}>
                <Col>
                    <h3>Preferences</h3>
                </Col>
            </Row>
            <InfoRow color={"warning"} counter={this.state.commentsPerArticle}>Number of comments per article:</InfoRow>
            <InfoRow color={"warning"} counter={this.state.labbellersPerArticle}>Number of labellers per article (interrater):</InfoRow>
            <InfoRow color={"warning"} fallback={"All"} counter={this.state.multiLabelledArticles}>Maximum number of interrated articles:</InfoRow>

            <Row className={"pt-4"}>
                    <Col>
                    <h3>Actions</h3>
                </Col>
                </Row>
                <Row>
                    <Col><Button onClick={this.handleDownloadLabelled}>Download Labelled Data</Button></Col>
                </Row>
                <Row className={"mt-2"}>
                    <Col><Button onClick={this.handleDownloadLabellers}>Download Labellers Data</Button></Col>
                </Row>
            </Container>
                <Footer/>
            </>
        );
    }
}

export default AdminDashboard;
