import React from "react";
import axios from 'axios';
import queryString from 'query-string';
import Article from "../components/Labelling/Article";
import Comments from "../components/Labelling/CommentsContainer";
import ArticleInstructions from "../components/Labelling/ArticleInstructions";
import CommentsInstructions from "../components/Labelling/CommentsInstructions";
import ArticleStanceQuestion from "../components/Labelling/ArticleStanceQuestion";
import SubmitInstructionsAndButton from "../components/Labelling/SubmitInstructionsAndButton";
import {Col, Container, UncontrolledAlert} from "reactstrap";
import Row from "reactstrap/es/Row";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const labellerID = "5f199424dcf1cfe56a7436a7";

class Labelling extends React.Component {

    static defaultProps = {
        contentBackgroundColor: "#f2f0e6",
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            labellerID: null,
            labelledArticlesCount: null,
            article: null,
            comments: null,
            paragraphsEmotionLabel: {},
            paragraphsError: {},
            stanceArticleQuestionLabel: null,
            stanceArticleQuestionError: false,
            commentsStanceLabel: {},
            commentsEmotionLabel: {},
            commentsError: {},
            serverFetchError: null,
        };

        this.handleEmotionArticle = this.handleEmotionArticle.bind(this);
        this.handleStanceArticle = this.handleStanceArticle.bind(this);
        this.handleStanceComments = this.handleStanceComments.bind(this);
        this.handleEmotionComments = this.handleEmotionComments.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postToBackendStatus = this.postToBackendStatus.bind(this);
        this.fetchDataAndUpdateState = this.fetchDataAndUpdateState.bind(this);
        this.fetchLabelledArticlesCount = this.fetchLabelledArticlesCount.bind(this);
        this.handleEmotionIntensityArticle = this.handleEmotionIntensityArticle.bind(this);
        this.handleEmotionIntensityComments = this.handleEmotionIntensityComments.bind(this);
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.setState({labellerID: params.token});
        if(!params.token) {
            this.props.history.push("/authenticatelabeller");
        }

        this.fetchDataAndUpdateState(params.token);
        this.fetchLabelledArticlesCount(params.token);
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
                const paragraphsEmotionLabel = {};
                const paragraphsError = {};
                status.paragraphsEmotionLabel.forEach(entry => {
                    paragraphsEmotionLabel[entry.paragraphConsecutiveID] = {label: entry.label, intensity: entry.intensity};
                });
                article.paragraphs.forEach((par) => {
                    if (!(par.consecutiveID in paragraphsEmotionLabel)) {
                        paragraphsEmotionLabel[par.consecutiveID] = {label: null, intensity: null};
                    }
                    paragraphsError[par.consecutiveID] = false;
                });

                const commentsStanceLabel = {};
                const commentsEmotionLabel = {};
                const commentsError = {};

                status.commentsStanceLabel.forEach(entry => {
                    commentsStanceLabel[entry.commentID] = entry.label;
                });
                status.commentsEmotionLabel.forEach(entry => {
                    commentsEmotionLabel[entry.commentID] = {label: entry.label, intensity: entry.intensity};
                });
                article.comments.forEach((com) => {
                    if (!(com.commentID in commentsStanceLabel)) {
                        commentsStanceLabel[com.commentID] = null;
                    }
                    if (!(com.commentID in commentsEmotionLabel)) {
                        commentsEmotionLabel[com.commentID] = {label: null, intensity: null};
                    }
                    commentsError[com.commentID] = false;
                });
                console.log(article.title);
                return this.setState({
                    article: article,
                    comments: article.comments,
                    paragraphsEmotionLabel: paragraphsEmotionLabel,
                    paragraphsError: paragraphsError,
                    stanceArticleQuestionLabel: status.stanceArticleQuestionLabel || null,
                    commentsStanceLabel: commentsStanceLabel,
                    commentsEmotionLabel: commentsEmotionLabel,
                    commentsError: commentsError,
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

    handleEmotionArticle(event, emotion, paragraph) {
        event.preventDefault();
        let paragraphsEmotionLabel = {...this.state.paragraphsEmotionLabel};
        paragraphsEmotionLabel[paragraph.consecutiveID].label = emotion;
        let paragraphsError = {...this.state.paragraphsError};
        paragraphsError[paragraph.consecutiveID] = paragraphsError[paragraph.consecutiveID] &&
            (this.state.paragraphsEmotionLabel[paragraph.consecutiveID] === null ||
                this.state.paragraphsEmotionLabel[paragraph.consecutiveID].intensity === null);
        this.setState({paragraphsEmotionLabel, paragraphsError});
        this.postToBackendStatus('/labelling/tag/paragraph/label', paragraph.consecutiveID, emotion);
    }

    handleEmotionIntensityArticle(event, intensity, paragraph) {
        event.preventDefault();
        let paragraphsEmotionLabel = {...this.state.paragraphsEmotionLabel};
        paragraphsEmotionLabel[paragraph.consecutiveID].intensity = intensity;
        let paragraphsError = {...this.state.paragraphsError};
        paragraphsError[paragraph.consecutiveID] = paragraphsError[paragraph.consecutiveID] &&
            (this.state.paragraphsEmotionLabel[paragraph.consecutiveID] === null ||
                this.state.paragraphsEmotionLabel[paragraph.consecutiveID].label === null);
        this.setState({paragraphsEmotionLabel, paragraphsError});
        this.postToBackendStatus('/labelling/tag/paragraph/intensity', paragraph.consecutiveID, intensity);
    }

    handleStanceArticle(event, stance) {
        event.preventDefault();
        this.setState({stanceArticleQuestionLabel: stance, stanceArticleQuestionError: false});
        this.postToBackendStatus('/labelling/tag/article', null, stance);
    }

    handleStanceComments(event, stance, comment) {
        event.preventDefault();
        let commentsStanceLabel = {...this.state.commentsStanceLabel};
        commentsStanceLabel[comment.commentID] = stance;
        let commentsError = {...this.state.commentsError};
        commentsError[comment.commentID] = commentsError[comment.commentID] &&
            (this.state.commentsEmotionLabel[comment.commentID] === null ||
                this.state.commentsEmotionLabel[comment.commentID].label === null
                || this.state.commentsEmotionLabel[comment.commentID].intensity === null);
        this.setState({commentsStanceLabel, commentsError});
        this.postToBackendStatus('/labelling/tag/comment/stance', comment.commentID, stance);
    }

    postToBackendStatus(entryPoint, elemID, data) {
        axios.post(entryPoint, {
            labeller: this.state.labellerID,
            article: this.state.article._id,
            elemID: elemID,
            data: data
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleEmotionComments(event, emotion, comment) {
        console.log(emotion);
        event.preventDefault();
        let commentsEmotionLabel = {...this.state.commentsEmotionLabel};
        commentsEmotionLabel[comment.commentID].label = emotion;
        let commentsError = {...this.state.commentsError};
        commentsError[comment.commentID] = commentsError[comment.commentID] &&
            (this.state.commentsStanceLabel[comment.commentID] === null ||
                this.state.commentsEmotionLabel[comment.commentID] ||
                this.state.commentsEmotionLabel[comment.commentID].intensity === null);
        this.setState({commentsEmotionLabel, commentsError});

        this.postToBackendStatus('/labelling/tag/comment/emotion/label', comment.commentID, emotion);
    }

    handleEmotionIntensityComments(event, intensity, comment) {
        event.preventDefault();
        let commentsEmotionLabel = {...this.state.commentsEmotionLabel};
        commentsEmotionLabel[comment.commentID].intensity = intensity;
        let commentsError = {...this.state.commentsError};
        commentsError[comment.commentID] = commentsError[comment.commentID] &&
            (this.state.commentsStanceLabel[comment.commentID] === null ||
            this.state.commentsEmotionLabel[comment.commentID] === null ||
            this.state.commentsEmotionLabel[comment.commentID].intensity === null);
        this.setState({commentsEmotionLabel, commentsError});

        this.postToBackendStatus('/labelling/tag/comment/emotion/intensity', comment.commentID, intensity);
    }

    handleSubmit(event) {
        event.preventDefault();
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

        let commentsError = {...this.state.commentsError};
        Object.entries(this.state.commentsStanceLabel).forEach(
            ([key, label]) => {
                if(label == null) {
                    error = true;
                    commentsError[key] = true;
                }
            }
        );
        Object.entries(this.state.commentsEmotionLabel).forEach(
            ([key, status]) => {
                if(status === null || status.label === null || status.intensity === null) {
                    error = true;
                    commentsError[key] = true;
                }
            }
        );

        if(error) {
            this.setState({commentsError, paragraphsError, stanceArticleQuestionError});
            alert("Please fill-in the missing entries (now in red) and try again");
            return;
        }

        axios.post("/labelling/submit", {
            labeller: this.state.labellerID,
            article: this.state.article._id,
            paragraphsEmotionLabel: this.state.paragraphsEmotionLabel,
            stanceArticleQuestionLabel: this.state.stanceArticleQuestionLabel,
            commentsStanceLabel: this.state.commentsStanceLabel,
            commentsEmotionLabel: this.state.commentsEmotionLabel,
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
            return (<Container>
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
            </Container>);
        }

        if(this.state.article === null) {
            return null;
        }
        return (
            <>
                <Header/>
                <Container>
                    <Row>
                        <Col xs={12} sm={9} md={9} lg={10} xl={10}>
                            <h2>Labelling Procedure</h2>
                        </Col>
                        <Col xs={12} sm={3} md={3} lg={2} xl={2} className={"text-center"}>
                            {/*<Button href={"/instructions"} color={"primary"} block>More instructions</Button>*/}
                            {this.state.labelledArticlesCount ? <># labelled articles: {this.state.labelledArticlesCount}</> : null}
                        </Col>
                    </Row>
                </Container>

                <ArticleInstructions token={this.state.labellerID}/>
                <Article articleJson={this.state.article}
                         paragraphsEmotionLabel={this.state.paragraphsEmotionLabel}
                         paragraphsError={this.state.paragraphsError}
                         onClick={this.handleEmotionArticle}
                         onClickIntensity={this.handleEmotionIntensityArticle}
                        contentBackgroundColor={this.props.contentBackgroundColor}
                />
                <ArticleStanceQuestion question={this.state.article.stanceQuestion}
                                       onClick={this.handleStanceArticle}
                                       stanceArticleQuestionLabel={this.state.stanceArticleQuestionLabel}
                                       error={this.state.stanceArticleQuestionError}/>
                <CommentsInstructions/>
                <Comments commentsJson={this.state.comments}
                          commentsStanceLabel={this.state.commentsStanceLabel}
                          commentsEmotionLabel={this.state.commentsEmotionLabel}
                          commentsError={this.state.commentsError}
                          onClickStance={this.handleStanceComments}
                          onClickEmotion={this.handleEmotionComments}
                          onClickEmotionIntensity={this.handleEmotionIntensityComments}
                          contentBackgroundColor={this.props.contentBackgroundColor}
                />
                <SubmitInstructionsAndButton onClick={this.handleSubmit}/>
                <Footer/>
            </>
        );
    }
}

export default Labelling;
