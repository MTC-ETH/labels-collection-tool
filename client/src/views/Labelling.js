import React from "react";
import axios from 'axios';
import queryString from 'query-string';
import Article from "../components/Labelling/Article";
import ArticleInstructions from "../components/Labelling/ArticleInstructions";
import ArticleStanceQuestion from "../components/Labelling/ArticleStanceQuestion";
import SubmitInstructionsAndButton from "../components/Labelling/SubmitInstructionsAndButton";
import {Col, Container, UncontrolledAlert} from "reactstrap";
import Row from "reactstrap/es/Row";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArticleEmotionQuestion from "../components/Labelling/ArticleEmotionQuestion";
import {browserName, browserVersion, deviceType, osName, osVersion} from "react-device-detect";
import PlutchikSelector from "../components/Labelling/PlutchikSelector";
import ContainedHr from "../components/ContainedHr";
import Cookies from "js-cookie";

// const labellerID = "5f199424dcf1cfe56a7436a7";
function getDeviceSpecs() {
    return  {
        osName: osName,
        osVersion: osVersion,
        browserName: browserName,
        browserVersion: browserVersion,
        deviceType: deviceType
    };
}

class Labelling extends React.Component {

    static defaultProps = {
        contentBackgroundColor: "#f2f0e6",
        instructionsTextColor: "#1e0ead"
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            labellerID: null,
            labelledArticlesCount: null,
            article: null,
            paragraphsEmotionLabel: {},
            paragraphsError: {},
            stanceArticleQuestionLabel: {label: null, notSure: false},
            stanceArticleQuestionError: false,
            emotionArticleLabel: {label: null, intensity: null, notSure: false},
            emotionArticleError: false,
            serverFetchError: null,
        };

        this.handleEmotionArticle = this.handleEmotionArticle.bind(this);
        this.handleStanceArticle = this.handleStanceArticle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postToBackendStatus = this.postToBackendStatus.bind(this);
        this.fetchDataAndUpdateState = this.fetchDataAndUpdateState.bind(this);
        this.fetchLabelledArticlesCount = this.fetchLabelledArticlesCount.bind(this);
        this.handleEmotionParagraph = this.handleEmotionParagraph.bind(this);
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        let token = params.token;
        const fromEmail = Boolean(params.email);

        if(token && fromEmail) {
            Cookies.set('token', token);
        }
        else {
            const cookieToken = Cookies.get('token');
            if (cookieToken && token && cookieToken !== token) {
                Cookies.set('token', token);
            }

            if (!token) {
                if (cookieToken) {
                    token = Cookies.get('token');
                } else {
                    this.props.history.push("/authenticatelabeller?target=labelling");
                }
            }
        }
        this.setState({labellerID: token});

        this.fetchDataAndUpdateState(token);
        this.fetchLabelledArticlesCount(token);
    }

    fetchLabelledArticlesCount(labellerID) {
        return axios.get("/labelling/ntagged?labellerID=" + labellerID)
            .then(res => {
                this.setState({labelledArticlesCount: res.data.count})
            })
            .catch(err => console.log(err));
    }

    fetchDataAndUpdateState(labellerID) {
        return axios.get(`/labelling/article?labellerID=${labellerID}`)
            .then(res => {
                const {status, article} = res.data;
                const paragraphsError = {};
                article.paragraphs.forEach((par) => {
                    paragraphsError[par.consecutiveID] = false;
                });

                return this.setState({
                    article: article,
                    paragraphsEmotionLabel: status.paragraphsEmotionLabel,
                    paragraphsError: paragraphsError,
                    stanceArticleQuestionLabel: status.stanceArticleQuestionLabel,
                    stanceArticleQuestionError: false,
                    emotionArticleLabel: status.emotionArticleLabel,
                    emotionArticleError: false
                });
            })
            .catch(err => {
                console.log(err);
                if(err.response && err.response.data.message) {
                    console.log(err.response.data); // => the response payload
                    this.setState({
                        serverFetchError: err.response.data.message,
                    });
                }
                else {
                    this.setState({
                        serverFetchError: "Server error:\n" + JSON.stringify(err)
                    });
                }
            });
    }

    handleEmotionParagraph(event, fieldToUpdate, data, paragraph) {
        let paragraphsEmotionLabel = {...this.state.paragraphsEmotionLabel};
        paragraphsEmotionLabel[paragraph.consecutiveID][fieldToUpdate] = data;
        paragraphsEmotionLabel[paragraph.consecutiveID].enteredAt = Date.now();
        if(data === PlutchikSelector.emotionlessLabel) {
            paragraphsEmotionLabel[paragraph.consecutiveID].intensity = -1
        }
        else if(fieldToUpdate === "label" && paragraphsEmotionLabel[paragraph.consecutiveID].intensity === -1) {
            paragraphsEmotionLabel[paragraph.consecutiveID].intensity = null;
        }
        let paragraphsError = {...this.state.paragraphsError};
        paragraphsError[paragraph.consecutiveID] = paragraphsError[paragraph.consecutiveID] &&
            (this.state.paragraphsEmotionLabel[paragraph.consecutiveID] === null ||
                this.state.paragraphsEmotionLabel[paragraph.consecutiveID].label === null ||
                this.state.paragraphsEmotionLabel[paragraph.consecutiveID].intensity === null);
        this.setState({paragraphsEmotionLabel, paragraphsError});
        this.postToBackendStatus('/labelling/tag/paragraph/emotion', paragraph.consecutiveID, paragraphsEmotionLabel[paragraph.consecutiveID]);
    }

    handleStanceArticle(event, fieldToUpdate, data) {
        const stanceArticleQuestionLabel = this.state.stanceArticleQuestionLabel;
        stanceArticleQuestionLabel[fieldToUpdate] = data;
        stanceArticleQuestionLabel.enteredAt = Date.now();
        this.setState({stanceArticleQuestionLabel, stanceArticleQuestionError: false});
        this.postToBackendStatus('/labelling/tag/article/stance', null, stanceArticleQuestionLabel);
    }

    handleEmotionArticle(event, fieldToUpdate, data) {
        const emotionArticleLabel = this.state.emotionArticleLabel;
        emotionArticleLabel[fieldToUpdate] = data;
        emotionArticleLabel.enteredAt = Date.now();
        if(data === PlutchikSelector.emotionlessLabel) {
            emotionArticleLabel.intensity = -1
        }
        else if(fieldToUpdate === "label" && emotionArticleLabel.intensity === -1) {
            emotionArticleLabel.intensity = null;
        }

        this.setState({emotionArticleLabel,
            emotionArticleError: this.state.emotionArticleError &&
                (emotionArticleLabel.label === null || emotionArticleLabel.intensity === null)});
        this.postToBackendStatus('/labelling/tag/article/emotion', null, emotionArticleLabel);
    }

    postToBackendStatus(entryPoint, elemID, data) {
        axios.post(entryPoint, {
            labeller: this.state.labellerID,
            article: this.state.article._id,
            elemID: elemID,
            data: data
        })
            .catch(error => {
                console.log(error);
            });
    }

    handleSubmit(event) {
        let error = false;

        let paragraphsError = {...this.state.paragraphsError};
        Object.entries(this.state.paragraphsEmotionLabel).forEach(
            ([key, status]) => {
                if(status === null || status.label === null || status.intensity === null) {
                    error = true;
                    paragraphsError[key] = true;
                }
            }
        );

        let stanceArticleQuestionError = this.state.stanceArticleQuestionError;
        if(this.state.stanceArticleQuestionLabel === null) {
            stanceArticleQuestionError = true;
        }

        let emotionArticleError = this.state.emotionArticleError;
        if(this.state.emotionArticleLabel === null ||
            this.state.emotionArticleLabel.label === null ||
            this.state.emotionArticleLabel.intensity === null) {
            emotionArticleError = true;
            error = true;
        }

        if(error) {
            this.setState({paragraphsError, stanceArticleQuestionError, emotionArticleError});
            alert("Please fill-in the missing entries (now in red) and try again");
            return;
        }

        axios.post("/labelling/submit", {
            labeller: this.state.labellerID,
            article: this.state.article._id,
            paragraphsEmotionLabel: this.state.paragraphsEmotionLabel,
            stanceArticleQuestionLabel: this.state.stanceArticleQuestionLabel,
            emotionArticleLabel: this.state.emotionArticleLabel,
            deviceSpecs: getDeviceSpecs(),
        })
            .then(response => {
                if(this.state.labelledArticlesCount) {
                    this.setState({labelledArticlesCount: this.state.labelledArticlesCount + 1});
                }
                else {
                    this.fetchLabelledArticlesCount(this.state.labellerID); //there was an error before, retry
                }
                this.fetchDataAndUpdateState(this.state.labellerID).then(() =>
                    window.scrollTo(0, 0));
            })
            .catch(error => {
                alert("Server error, please try again");
                console.log(error);
            });
    }

    render() {
        if(this.state.serverFetchError !== null) {
            return (            <>
                <Header selectedPage={"labelling"}/>
                <Container>
                <Row>
                    <Col>
                        <UncontrolledAlert color="danger" fade={true}>
                                        <span className="alert-inner--icon">
                                            <i className="ni ni-support-16" />
                                        </span>
                            <span className="alert-inner--text ml-1">
                            <strong>Error!</strong> {this.state.serverFetchError}
                                        </span>
                        </UncontrolledAlert>
                    </Col>
                </Row>
            </Container>
                <Footer/>
                <>);
        }

        if(this.state.article === null) {
            return null;
        }
        return (
            <>
                <Header selectedPage={"labelling"}/>
                <Container>
                    <Row>
                        <Col xs={12} sm={9} md={9} lg={10} xl={10}>
                            <h2>Labelling Procedure</h2>
                        </Col>
                        <Col xs={12} sm={3} md={3} lg={2} xl={2} className={"text-center"}>
                            {this.state.labelledArticlesCount ?
                                <div style={{color: this.props.instructionsTextColor}}>
                                    # labelled articles: {this.state.labelledArticlesCount}
                                </div>
                                : null}
                        </Col>
                    </Row>
                </Container>

                <ArticleInstructions token={this.state.labellerID}
                                     instructionsTextColor={this.props.instructionsTextColor}
                />
                <Article articleJson={this.state.article}
                         paragraphsEmotionLabel={this.state.paragraphsEmotionLabel}
                         paragraphsError={this.state.paragraphsError}
                         onClickEmotionParagraph={this.handleEmotionParagraph}
                         contentBackgroundColor={this.props.contentBackgroundColor}
                         instructionsTextColor={this.props.instructionsTextColor}
                />
                <ContainedHr/>
                <ArticleEmotionQuestion question={this.state.article.stanceQuestion}
                                        onClick={this.handleEmotionArticle}
                                        emotionStatus={this.state.emotionArticleLabel}
                                        error={this.state.emotionArticleError}
                                        instructionsTextColor={this.props.instructionsTextColor}
                />
                <ContainedHr/>
                <ArticleStanceQuestion question={this.state.article.stanceQuestion}
                                       onClick={this.handleStanceArticle}
                                       stanceStatus={this.state.stanceArticleQuestionLabel}
                                       error={this.state.stanceArticleQuestionError}
                                       instructionsTextColor={this.props.instructionsTextColor}
                />
                <ContainedHr/>
                <SubmitInstructionsAndButton onClick={this.handleSubmit}
                                             instructionsTextColor={this.props.instructionsTextColor}
                />
                <Footer/>
            </>
        );
    }
}

export default Labelling;
