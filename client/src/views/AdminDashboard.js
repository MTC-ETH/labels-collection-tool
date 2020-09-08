import React from "react";
import axios from 'axios';
import FileDownload from 'js-file-download';

import {Button, Col, Container, Label, Row, UncontrolledAlert} from "reactstrap";
import InfoRow from "../components/AdminDashboard/InfoRow";
import Header from "../components/Header";
import Footer from "../components/Footer";

import secrets from "../assets/json/secrets"
import queryString from "query-string";

function formatPercentage(perc) {
    if(perc === null || perc === undefined || isNaN(perc)) {
        return null;
    }
    return perc.toFixed(2) + " %";
}

function getSafely(obj, key) {
    return key.split(".").reduce(function(o, x) {
        return (typeof o == "undefined" || o === null || o === undefined) ? o : o[x];
    }, obj);
}

function getAndFormatSafelyFloat(obj, key, digits=3) {
    return key.split(".").reduce(function(o, x) {
        return (typeof o == "undefined" || o === null || o === undefined) ? o : o[x].toFixed(digits);
    }, obj);
}

class AdminDashboard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            authenticated: false,
            data: null,
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
                console.log(res.data);
                this.setState({
                    data: res.data
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

    handleDownloadCsv(collectionName) {
        axios.get("/admindashboard/" + collectionName + "?token=" + secrets.admintoken)
            .then((response) => {
                FileDownload(response.data, collectionName + '.csv');
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
                <h3>Statistics</h3>
                </Col>
            </Row>

            <h5>Labelling advancement</h5>
            <InfoRow counter={getSafely(this.state.data, "nRegisteredLabellers")}>
                Number of registered labellers:
            </InfoRow>
            <InfoRow counter={getSafely(this.state.data, "nTaggedArticles")}>
                Number of labelled articles:
            </InfoRow>
            <InfoRow counter={getSafely(this.state.data, "nTaggedUniqueArticles")}>
                Number of uniquely labelled articles:
            </InfoRow>

            <h5 className={"mt-2"}>Time measurements</h5>
            <InfoRow counter={getSafely(this.state.data, "averageTaggingTime")}>
                Average tagging time per article:
            </InfoRow>
            <InfoRow counter={getSafely(this.state.data, "averageTaggingTimePerParagraph")}>
                Average tagging time per paragraph:
            </InfoRow>

            <h5 className={"mt-2"}>Not sure and changed answers</h5>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "notSureParagraphsPercentage"))}>
                % of not sure ticked on paragraph emotion:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "notSureEmotionArticlePercentage"))}>
                % of not sure ticked on article emotion:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "notSureStanceArticlePercentage"))}>
                % of not sure ticked on article stance:
            </InfoRow>
            <br/>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "changedIdeaParagraphsPercentage"))}>
                % of paragraph emotion on which idea was changed:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "changedIdeaEmotionArticlePercentage"))}>
                % of article emotion on which idea was changed:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "changedIdeaStanceArticlePercentage"))}>
                % of article stance on which idea was changed:
            </InfoRow>

            <h5 className={"mt-2"}>Interrater agreement</h5>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "percAtLeastOneDisagreesEmotionLabelParagraphs"))}>
                % of paragraph emotion label in which at least one disagrees:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "percAtLeastOneDisagreesEmotionIntensityParagraphs"))}>
                % of paragraph emotion intensity in which at least one disagrees*:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "percPerfectAgreementEmotionParagraphs"))}>
                % of paragraph emotion in which all agree both on label and intensity:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "percAtLeastOneDisagreesEmotionLabelArticles"))}>
                % of article emotion label in which at least one disagrees:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "percAtLeastOneDisagreesEmotionIntensityArticles"))}>
                % of article emotion intensity in which at least one disagrees*:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "percPerfectAgreementEmotionArticles"))}>
                % of article emotion in which all agree both on label and intensity:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "percAtLeastOneDisagreesStanceArticles"))}>
                % of article stance in which at least one disagrees:
            </InfoRow>

            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "fleissKEmotionLabelParagraphs")}>
                <a href={"https://en.wikipedia.org/wiki/Fleiss%27_kappa"} target={"_blank"} rel="noopener noreferrer">
                    Fleiss K </a> for paragraphs emotion label:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "fleissKEmotionIntensityParagraphs")}>
                <a href={"https://en.wikipedia.org/wiki/Fleiss%27_kappa"} target={"_blank"} rel="noopener noreferrer">
                    Fleiss K </a> for paragraphs emotion intensity*:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "fleissKEmotionLabelArticles")}>
                <a href={"https://en.wikipedia.org/wiki/Fleiss%27_kappa"} target={"_blank"} rel="noopener noreferrer">
                    Fleiss K </a> for articles emotion label:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "fleissKEmotionIntensityArticles")}>
                <a href={"https://en.wikipedia.org/wiki/Fleiss%27_kappa"} target={"_blank"} rel="noopener noreferrer">
                    Fleiss K </a> for articles emotion intensity*:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "fleissKStanceLabelArticles")}>
                <a href={"https://en.wikipedia.org/wiki/Fleiss%27_kappa"} target={"_blank"} rel="noopener noreferrer">
                    Fleiss K </a> for articles stance label:
            </InfoRow>


            <Row className={"mt-1"}><Col><p>* The intensity agreement is computed removing the entries that are tagged as
            "sachlich"</p></Col></Row>


            <Row className={"pt-2"}>
                <Col>
                    <h3>Preferences</h3>
                </Col>
            </Row>
            <InfoRow color={"warning"} counter={getSafely(this.state.data, "config.interrater.labbellersPerArticle")}>
                Number of labellers per article (interrater):
            </InfoRow>
            <InfoRow color={"warning"} fallback={"All"}
                     counter={getSafely(this.state.data, "config.interrater.multiLabelledArticles")}>
                Maximum number of interrated articles:
            </InfoRow>

            <Row className={"pt-4"}>
                    <Col>
                    <h3>Actions</h3>
                </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Download:</p>
                    </Col>
                </Row>
            <Row>
                    <Col><Button block onClick={() => this.handleDownload("labelledentries")}>Labelled Data</Button></Col>
                    <Col><Button color="info" block onClick={() => this.handleDownloadCsv("labelledentriescsv")}>Labelled Data (CSV)</Button></Col>
                    <Col><Button block onClick={() => this.handleDownload("labellers")}>Labellers Data</Button></Col>
                    <Col><Button block onClick={() => this.handleDownload("articles")}>Articles Data</Button></Col>
                </Row>
                <Row className={"mt-2"}>
                    <Col><Button block color="warning" onClick={() => this.handleDownload("all")}>Download All Data</Button></Col>
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
