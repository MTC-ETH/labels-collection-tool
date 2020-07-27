import React from "react";
import axios from 'axios';
import Article from "../components/labelling/Article";
import Comments from "../components/labelling/CommentsContainer";
import ArticleInstructions from "../components/labelling/ArticleInstructions";
import CommentsInstructions from "../components/labelling/CommentsInstructions";
import ArticleStanceQuestion from "../components/labelling/ArticleStanceQuestion";
import SubmitInstructionsAndButton from "../components/labelling/SubmitInstructionsAndButton";

const labellerID = "5f199424dcf1cfe56a7436a7";

class Labelling extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            article: null,
            comments: null,
            paragraphsEmotionLabel: {},
            paragraphsError: {},
            stanceArticleQuestionLabel: null,
            stanceArticleQuestionError: false,
            commentsStanceLabel: {},
            commentsEmotionLabel: {},
            commentsError: {},
        };

        this.handleEmotionArticle = this.handleEmotionArticle.bind(this);
        this.handleStanceArticle = this.handleStanceArticle.bind(this);
        this.handleStanceComments = this.handleStanceComments.bind(this);
        this.handleEmotionComments = this.handleEmotionComments.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postToBackendStatus = this.postToBackendStatus.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                const {status, article} = res;
                let paragraphsEmotionLabel = {};
                let paragraphsError = {};
                status.paragraphsEmotionLabel.forEach(entry => {
                    paragraphsEmotionLabel[entry.paragraphConsecutiveID] = entry.label;
                });
                article.paragraphs.forEach((par) => {
                    if(!(par.consecutiveID in paragraphsEmotionLabel)) {
                        paragraphsEmotionLabel[par.consecutiveID] = null; }
                    paragraphsError[par.consecutiveID] = false;
                });

                let commentsStanceLabel = {};
                let commentsEmotionLabel = {};
                let commentsError = {};

                status.commentsStanceLabel.forEach(entry => {
                    commentsStanceLabel[entry.commentID] = entry.label;
                });
                status.commentsEmotionLabel.forEach(entry => {
                    commentsEmotionLabel[entry.commentID] = entry.label;
                });
                article.comments.forEach((com) => {
                    if(!(com.commentID in commentsStanceLabel)) {
                        commentsStanceLabel[com.commentID] = null; }
                    if(!(com.commentID in commentsEmotionLabel)) {
                        commentsEmotionLabel[com.commentID] = null; }
                    commentsError[com.commentID] = false;
                });
                this.setState({
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
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch(`/labelling/article?labellerID=${labellerID}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleEmotionArticle(event, emotion, paragraph) {
        event.preventDefault();
        console.log(emotion);
        console.log(paragraph);
        let paragraphsEmotionLabel = {...this.state.paragraphsEmotionLabel};
        paragraphsEmotionLabel[paragraph.consecutiveID] = emotion;
        let paragraphsError = {...this.state.paragraphsError};
        paragraphsError[paragraph.consecutiveID] = false;
        this.setState({paragraphsEmotionLabel, paragraphsError});
        this.postToBackendStatus('/labelling/tag/paragraph', paragraph.consecutiveID, emotion);
    }

    handleStanceArticle(event, stance) {
        event.preventDefault();
        console.log(stance);
        this.setState({stanceArticleQuestionLabel: stance, stanceArticleQuestionError: false});
        this.postToBackendStatus('/labelling/tag/article', null, stance);
    }

    handleStanceComments(event, stance, comment) {
        event.preventDefault();
        console.log(stance);
        console.log(comment);
        let commentsStanceLabel = {...this.state.commentsStanceLabel};
        commentsStanceLabel[comment.commentID] = stance;
        let commentsError = {...this.state.commentsError};
        commentsError[comment.commentID] = commentsError[comment.commentID] &&
            this.state.commentsEmotionLabel[comment.commentID] === null;
        this.setState({commentsStanceLabel, commentsError});
        this.postToBackendStatus('/labelling/tag/comment/stance', comment.commentID, stance);
    }

    postToBackendStatus(entryPoint, elemID, label) {
        axios.post(entryPoint, {
            labeller: labellerID,
            article: this.state.article._id,
            elemID: elemID,
            label: label
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleEmotionComments(event, emotion, comment) {
        event.preventDefault();
        console.log(emotion);
        console.log(comment.commentID);
        let commentsEmotionLabel = {...this.state.commentsEmotionLabel};
        commentsEmotionLabel[comment.commentID] = emotion;
        let commentsError = {...this.state.commentsError};
        commentsError[comment.commentID] = commentsError[comment.commentID] &&
            this.state.commentsStanceLabel[comment.commentID] === null;
        this.setState({commentsEmotionLabel, commentsError});

        this.postToBackendStatus('/labelling/tag/comment/emotion', comment.commentID, emotion);
    }

    handleSubmit(event) {
        event.preventDefault();
        let error = false;

        let paragraphsError = {...this.state.paragraphsError};
        Object.entries(this.state.paragraphsEmotionLabel).forEach(
            ([key, label]) => {
                if(label == null) {
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
            ([key, label]) => {
                if(label == null) {
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
            labeller: labellerID,
            article: this.state.article._id,
            paragraphsEmotionLabel: this.state.paragraphsEmotionLabel,
            stanceArticleQuestionLabel: this.state.stanceArticleQuestionLabel,
            commentsStanceLabel: this.state.commentsStanceLabel,
            commentsEmotionLabel: this.state.commentsEmotionLabel,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                alert("Server error, please try again");
                console.log(error);
            });
    }

    render() {
        if(this.state.article === null) {
            return null;
        }
        return (
            <>
                <ArticleInstructions/>
                <Article articleJson={this.state.article}
                         paragraphsEmotionLabel={this.state.paragraphsEmotionLabel}
                         paragraphsError={this.state.paragraphsError}
                         onClick={this.handleEmotionArticle}/>
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
                />
                <SubmitInstructionsAndButton onClick={this.handleSubmit}/>
            </>
        );
    }
}

export default Labelling;
