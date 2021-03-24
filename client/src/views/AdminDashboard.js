//   Copyright 2021 ETH Zurich, Media Technology Center
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

import React from "react";
import axios from 'axios';
import FileDownload from 'js-file-download';

import {Button, Col, Container, Label, Row, UncontrolledAlert} from "reactstrap";
import InfoRow from "../components/AdminDashboard/InfoRow";
import Header from "../components/Header";
import Footer from "../components/Footer";

import queryString from "query-string";
import TokenGeneratorRow from "../components/AdminDashboard/TokenGeneratorRow";

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
        if(typeof o == "undefined" || o === null || o === undefined) {
            return o;
        }
        if(typeof o[x] == "undefined" || o[x] === null || o[x] === undefined) {
            return o[x];
        }
        return o[x].toFixed(digits);
    }, obj);
}

function getAndFormatSafelyIRA(obj, key, digits=3) {
    const perc = getSafely(obj, key);
    const random = getSafely(obj, key + "Random");
    let res = "";
    if(perc !== null && perc !== undefined) {
        res += formatPercentage(perc);
        if(random !== null && random !== undefined) {
            res += " (" + formatPercentage(random) + ")"
        }
    }
    return res.length > 0 ? res : null;
}

class AdminDashboard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            token: null,
            authenticated: false,
            data: null,
        }
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        if(!params.token) {
            this.setState({token: null});
        }
        else {
            axios.get("/admindashboard/status"+ "?token=" + params.token)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        token: params.token,
                        data: res.data
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        token: null
                    });
                });
        }
    }

    handleDownload(collectionName) {
        axios.get("/admindashboard/" + collectionName + "?token=" + this.state.token)
            .then((response) => {
                FileDownload(JSON.stringify(response.data, null, 4), collectionName + '.json');
            });
    }

    handleDownloadCsv(collectionName) {
        axios.get("/admindashboard/" + collectionName + "?token=" + this.state.token)
            .then((response) => {
                FileDownload(response.data, collectionName + '.csv');
            });
    }

    render() {
        if(!this.state.token) {
            return (<Container>
                <Row>
                    <Col>
                        <UncontrolledAlert color="danger" fade={true}>
                                        <span className="alert-inner--icon">
                                            <i className="ni ni-support-16" />
                                        </span>
                            <span className="alert-inner--text ml-1">
                            <strong>Error!</strong> Please provide valid authentication token in page query and connect
                                from ETH VPN
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
                Number of labelled articles (with duplicated for interrater):
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
            <br/>
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
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "fleissKStanceQuestionsLabel")}>
                <a href={"https://en.wikipedia.org/wiki/Fleiss%27_kappa"} target={"_blank"} rel="noopener noreferrer">
                    Fleiss K </a> for articles stance label:
            </InfoRow>
            <br/>
            <p>IRA (Inter Rater Agreement) is calculated as the percentage of times each pair of annotators agree; in
            parenthesis the value if random answers were given</p>
            <InfoRow counter={getAndFormatSafelyIRA(this.state.data, "IRAEmotionLabelParagraphs")}>
                    IRA for paragraphs emotion label:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyIRA(this.state.data, "IRAEmotionIntensityParagraphs")}>
                    IRA for paragraphs emotion intensity*:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyIRA(this.state.data, "IRAEmotionLabelArticles")}>
                    IRA for articles emotion label:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyIRA(this.state.data, "IRAEmotionIntensityArticles")}>
                    IRA for articles emotion intensity*:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyIRA(this.state.data, "IRAStanceLabelArticles")}>
                    IRA for articles stance label:
            </InfoRow>

            <Row className={"mt-1"}><Col><p>* The intensity agreement is computed removing the entries that are tagged as
            "sachlich"; this, especially for K values, can make the measure unreliable, other measures can be explored.
            </p></Col></Row>

            <h5 className={"mt-2"}>Intensities</h5>
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "paragraphsIntensityMean")}>
                Mean of paragraphs emotion intensity:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "paragraphsIntensityStd")}>
                Std of paragraphs emotion intensity:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "articlesIntensityMean")}>
                Mean of articles emotion intensity:
            </InfoRow>
            <InfoRow counter={getAndFormatSafelyFloat(this.state.data, "articlesIntensityStd")}>
                Std of articles emotion intensity:
            </InfoRow>

            <h5 className={"mt-3"}>Unrelated and stance questions</h5>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "perc0StanceQuestions"))}>
                % of stance questions marked as <b>in favour</b>:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "perc1StanceQuestions"))}>
                % of stance questions marked as <b>discuss</b>:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "perc2StanceQuestions"))}>
                % of stance questions marked as <b>against</b>:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "perc3StanceQuestions"))}>
                % of stance questions marked as <b>unrelated</b>:
            </InfoRow>
            <Row className={"mt-2"}><Col><i>The first stance questions should be the one that were more safely matched to the article:</i></Col></Row>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "perc0FirstStanceQuestions"))}>
                % of first stance questions marked as <b>in favour</b>:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "perc1FirstStanceQuestions"))}>
                % of first stance questions marked as <b>discuss</b>:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "perc2FirstStanceQuestions"))}>
                % of first stance questions marked as <b>against</b>:
            </InfoRow>
            <InfoRow counter={formatPercentage(getSafely(this.state.data, "perc3FirstStanceQuestions"))}>
                % of first stance questions marked as <b>unrelated</b>:
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
            <TokenGeneratorRow adminToken={this.state.token}/>
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
