import React from "react";
import axios from 'axios';
import FileDownload from 'js-file-download';

import {Button, Col, Container, Row, UncontrolledAlert} from "reactstrap";
import InfoRow from "../components/AdminDashboard/InfoRow";
import Header from "../components/Header";
import Footer from "../components/Footer";

import secrets from "../assets/json/secrets"
import queryString from "query-string";


class AdminDashboard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            authenticated: false,
            nRegisteredLabellers: null,
            nTaggedArticles: null,
            nTaggedUniqueArticles: null,
            labbellersPerArticle: null,
            multiLabelledArticles: null,
            averageTaggingTime: null
        }
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.setState({labellerID: params.token});
        if(!params.token || params.token !== secrets.admintoken) {
            this.setState({authenticated: false});
        }
        else {
            this.setState({authenticated: true});
        }

        axios.get("/admindashboard/status")
            .then(res => {
                this.setState({
                    nRegisteredLabellers: res.data.nRegisteredLabellers,
                    nTaggedArticles: res.data.nTaggedArticles,
                    nTaggedUniqueArticles: res.data.nTaggedUniqueArticles,
                    labbellersPerArticle: res.data.interrater.labbellersPerArticle,
                    multiLabelledArticles: res.data.interrater.multiLabelledArticles,
                    averageTaggingTime: res.data.averageTaggingTime,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleDownload(collectionName) {
        axios.get("/admindashboard/" + collectionName + "?token=" + secrets.admintoken)
            .then((response) => {
                FileDownload(JSON.stringify(response.data, null, 4), collectionName + '.json');
            });
    }

    render() {
        if(!this.state.authenticated) {
            return (<Container>
                <Row>
                    <Col>
                        <UncontrolledAlert color="danger" fade={true}>
                                        <span className="alert-inner--icon">
                                            <i className="ni ni-support-16" />
                                        </span>
                            <span className="alert-inner--text ml-1">
                            <strong>Error!</strong> Please provide valid authentication token in page query
                                        </span>
                        </UncontrolledAlert>
                    </Col>
                </Row>
            </Container>);
        }
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
                <InfoRow counter={this.state.averageTaggingTime}>Average tagging time per article:</InfoRow>

            <Row className={"pt-2"}>
                <Col>
                    <h3>Preferences</h3>
                </Col>
            </Row>
            <InfoRow color={"warning"} counter={this.state.labbellersPerArticle}>Number of labellers per article (interrater):</InfoRow>
            <InfoRow color={"warning"} fallback={"All"} counter={this.state.multiLabelledArticles}>Maximum number of interrated articles:</InfoRow>

            <Row className={"pt-4"}>
                    <Col>
                    <h3>Actions</h3>
                </Col>
                </Row>
                <Row>
                    <Col><Button block onClick={() => this.handleDownload("labelledentries")}>Download Labelled Data</Button></Col>
                    <Col><Button block onClick={() => this.handleDownload("labellers")}>Download Labellers Data</Button></Col>
                    <Col><Button onClick={() => this.handleDownload("articles")}>Download Articles Data</Button></Col>
                    <Col><Button color="warning" onClick={() => this.handleDownload("all")}>Download All Data</Button></Col>
                </Row>
                <Row className={"mt-2"}>
                </Row>
            </Container>
                <Footer/>
            </>
        );
    }
}

export default AdminDashboard;
