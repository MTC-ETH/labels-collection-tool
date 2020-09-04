import React from "react";
import axios from 'axios';
import FileDownload from 'js-file-download';

import {Button, Col, Container, Row, UncontrolledAlert} from "reactstrap";
import InfoRow from "../components/AdminDashboard/InfoRow";
import Header from "../components/Header";
import Footer from "../components/Footer";

import secrets from "../assets/json/secrets"
import queryString from "query-string";

function formatPercentage(perc) {
    if(perc === null || perc === undefined || isNaN(perc)) {
        return "Not computable";
    }
    return perc.toFixed(2) + " %";
}

function getSafely(obj, key) {
    return key.split(".").reduce(function(o, x) {
        return (typeof o == "undefined" || o === null || o === undefined) ? o : o[x];
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
                    // nRegisteredLabellers: res.data.nRegisteredLabellers,
                    // nTaggedArticles: res.data.nTaggedArticles,
                    // nTaggedUniqueArticles: res.data.nTaggedUniqueArticles,
                    // labbellersPerArticle: res.data.interrater.labbellersPerArticle,
                    // multiLabelledArticles: res.data.interrater.multiLabelledArticles,
                    // averageTaggingTime: res.data.averageTaggingTime,
                    // averageTaggingTimePerParagraph: res.data.averageTaggingTimePerParagraph,
                    // notSureParagraphsPercentage: res.data.notSureParagraphsPercentage,
                    // notSureEmotionArticlePercentage: res.data.notSureEmotionArticlePercentage,
                    // notSureStanceArticlePercentage: res.data.notSureStanceArticlePercentage

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
                Percentage of not sure ticked on paragraph emotion:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "notSureEmotionArticlePercentage"))}>
                Percentage of not sure ticked on article emotion:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "notSureStanceArticlePercentage"))}>
                Percentage of not sure ticked on article stance:
            </InfoRow>
            <br/>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "changedIdeaParagraphsPercentage"))}>
                Percentage of paragraph emotion on which idea was changed:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "changedIdeaEmotionArticlePercentage"))}>
                Percentage of article emotion on which idea was changed:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "changedIdeaStanceArticlePercentage"))}>
                Percentage of article stance on which idea was changed:
            </InfoRow>


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
