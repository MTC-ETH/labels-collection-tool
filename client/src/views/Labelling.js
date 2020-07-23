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
            paragraphsEmotionLabel: [null],
            paragraphsError: [false],
            stanceArticleQuestionLabel: null,
            stanceArticleQuestionError: false,
            commentsStanceLabel: [null],
            commentsEmotionLabel: [null],
            commentsError: [false],
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
                this.setState({
                    article: res,
                    comments: res.comments,
                    paragraphsEmotionLabel: res.paragraphs.map(() => null),
                    paragraphsError: res.paragraphs.map(() => false),
                    stanceArticleQuestionLabel: null,
                    commentsStanceLabel: res.comments.map(() => null),
                    commentsEmotionLabel: res.comments.map(() => null),
                    commentsError: res.comments.map(() => false),
                });
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch(`/article`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleEmotionArticle(event, emotion, paragraphNumber) {
        event.preventDefault();
        console.log(emotion);
        console.log(paragraphNumber);
        let paragraphsEmotionLabel = [...this.state.paragraphsEmotionLabel];
        paragraphsEmotionLabel[paragraphNumber] = emotion;
        let paragraphsError = [...this.state.paragraphsError];
        paragraphsError[paragraphNumber] = false;
        this.setState({paragraphsEmotionLabel, paragraphsError});
    }

    handleStanceArticle(event, stance) {
        event.preventDefault();
        console.log(stance);
        this.setState({stanceArticleQuestionLabel: stance, stanceArticleQuestionError: false});
    }

    handleStanceComments(event, stance, commentNumber) {
        event.preventDefault();
        console.log(stance);
        console.log(commentNumber);
        let commentsStanceLabel = [...this.state.commentsStanceLabel];
        commentsStanceLabel[commentNumber] = stance;
        let commentsError = [...this.state.commentsError];
        commentsError[commentNumber] = this.state.commentsEmotionLabel[commentNumber] === null;
        this.setState({commentsStanceLabel, commentsError});
    }

    handleEmotionComments(event, emotion, commentNumber) {
        event.preventDefault();
        console.log(emotion);
        console.log(commentNumber);
        let commentsEmotionLabel = [...this.state.commentsEmotionLabel];
        commentsEmotionLabel[commentNumber] = emotion;
        let commentsError = [...this.state.commentsError];
        commentsError[commentNumber] = this.state.commentsStanceLabel[commentNumber] === null;
        this.setState({commentsEmotionLabel, commentsError});
    }

    handleSubmit(event) {
        event.preventDefault();
        let error = false;

        let paragraphsError = [...this.state.paragraphsError];
        this.state.paragraphsEmotionLabel.forEach((label, index) => {
            if(label == null) {
                error = true;
                paragraphsError[index] = true;
            }
        });

        let stanceArticleQuestionError = this.state.stanceArticleQuestionError;
        if(this.state.stanceArticleQuestionLabel === null) {
            stanceArticleQuestionError = true;
        }

        let commentsError = [...this.state.commentsError];
        this.state.commentsStanceLabel.forEach((label, index) => {
            if(label == null) {
                error = true;
                commentsError[index] = true;
            }
        });
        this.state.commentsEmotionLabel.forEach((label, index) => {
            if(label == null) {
                error = true;
                commentsError[index] = true;
            }
        });

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
