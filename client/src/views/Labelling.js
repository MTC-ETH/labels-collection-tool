import React from "react";
import exampleArticleJson from "../assets/json/exampleArticle";
import exampleCommentsJson from "../assets/json/exampleComments";
import Article from "../components/labelling/Article";
import Comments from "../components/labelling/CommentsContainer";
import ArticleInstructions from "../components/labelling/ArticleInstructions";
import CommentsInstructions from "../components/labelling/CommentsInstructions";
import ArticleStanceQuestion from "../components/labelling/ArticleStanceQuestion";


class Labelling extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            article: null,
          comments: null,
            paragraphsEmotionLabel: [null],
            stanceArticleQuestionLabel: null,
            commentsStanceLabel: [null],
            commentsEmotionLabel: [null]
        };

        this.handleEmotionArticle = this.handleEmotionArticle.bind(this);
        this.handleStanceArticle = this.handleStanceArticle.bind(this);
        this.handleStanceComments = this.handleStanceComments.bind(this);
        this.handleEmotionComments = this.handleEmotionComments.bind(this);
    }

    componentDidMount() {
        const nullComments = exampleCommentsJson.map(() => null);
      this.setState({
        article: exampleArticleJson,
        comments: exampleCommentsJson,
          paragraphsEmotionLabel: exampleArticleJson.paragraphs.map(() => null),
          stanceArticleQuestionLabel: null,
          commentsStanceLabel: nullComments,
          commentsEmotionLabel: nullComments,
      });
    }

    handleEmotionArticle(event, emotion, paragraphNumber) {
        event.preventDefault();
        console.log(emotion);
        console.log(paragraphNumber);
        let paragraphsEmotionLabel = [...this.state.paragraphsEmotionLabel];
        paragraphsEmotionLabel[paragraphNumber] = emotion;
        this.setState({paragraphsEmotionLabel});
    }

    handleStanceArticle(event, stance) {
        event.preventDefault();
        console.log(stance);
        this.setState({stanceArticleQuestionLabel: stance});
    }

    handleStanceComments(event, stance, commentNumber) {
        event.preventDefault();
        console.log(stance);
        console.log(commentNumber);
        let commentsStanceLabel = [...this.state.commentsStanceLabel];
        commentsStanceLabel[commentNumber] = stance;
        this.setState({commentsStanceLabel});
    }

    handleEmotionComments(event, emotion, commentNumber) {
        event.preventDefault();
        console.log(emotion);
        console.log(commentNumber);
        let commentsEmotionLabel = [...this.state.commentsEmotionLabel];
        commentsEmotionLabel[commentNumber] = emotion;
        this.setState({commentsEmotionLabel});
    }

    render() {
      return (
        <>
            <ArticleInstructions/>
            <Article articleJson={exampleArticleJson} paragraphsEmotionLabel={this.state.paragraphsEmotionLabel}
                     onClick={this.handleEmotionArticle}/>
            <ArticleStanceQuestion question={exampleArticleJson.stanceQuestion}
                                   onClick={this.handleStanceArticle}
                                   stanceArticleQuestionLabel={this.state.stanceArticleQuestionLabel}/>
            <CommentsInstructions/>
            <Comments commentsJson={exampleCommentsJson}
                      commentsStanceLabel={this.state.commentsStanceLabel}
                      commentsEmotionLabel={this.state.commentsEmotionLabel}
            onClickStance={this.handleStanceComments}
            onClickEmotion={this.handleEmotionComments}/>
        </>
      );
    }
}

export default Labelling;
