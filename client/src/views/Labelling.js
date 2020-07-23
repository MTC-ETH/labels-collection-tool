import React from "react";
// import exampleArticleJson from "../assets/json/exampleArticle";
// import exampleCommentsJson from "../assets/json/exampleComments";
import Article from "../components/labelling/Article";
import Comments from "../components/labelling/CommentsContainer";
import ArticleInstructions from "../components/labelling/ArticleInstructions";
import CommentsInstructions from "../components/labelling/CommentsInstructions";
import ArticleStanceQuestion from "../components/labelling/ArticleStanceQuestion";
import SubmitInstructionsAndButton from "../components/labelling/SubmitInstructionsAndButton";


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
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                let paragraphsEmotionLabel = {};
                let paragraphsError = {};
                res.paragraphs.forEach((par) => {
                    paragraphsEmotionLabel[par.consecutiveID] = null;
                    paragraphsError[par.consecutiveID] = false;
                });

                let commentsStanceLabel = {};
                let commentsEmotionLabel = {};
                let commentsError = {};
                res.comments.forEach((com) => {
                    commentsStanceLabel[com.commentID] = null;
                    commentsEmotionLabel[com.commentID] = null;
                    commentsError[com.commentID] = false;
                });
                this.setState({
                    article: res,
                    comments: res.comments,
                    paragraphsEmotionLabel: paragraphsEmotionLabel,
                    paragraphsError: paragraphsError,
                    stanceArticleQuestionLabel: null,
                    commentsStanceLabel: commentsStanceLabel,
                    commentsEmotionLabel: commentsEmotionLabel,
                    commentsError: commentsError,
                });
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch(`/labelling/article`);
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
    }

    handleStanceArticle(event, stance) {
        event.preventDefault();
        console.log(stance);
        this.setState({stanceArticleQuestionLabel: stance, stanceArticleQuestionError: false});
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

        this.setState({commentsError, paragraphsError, stanceArticleQuestionError});
        if(error) {
            alert("ERROR");
        }
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
