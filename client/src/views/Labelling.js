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
          comments: null
        };

        this.handleArticle = this.handleArticle.bind(this);
    }

    componentDidMount() {
      this.setState({
        article: exampleArticleJson,
        comments: exampleCommentsJson,
      });
    }

    handleArticle(event, emotion, paragraphNumber) {
        event.preventDefault();
        console.log(emotion);
        console.log(paragraphNumber);
        // this.setState({
        //     errorMessage: errorMessage});
    }

    render() {
      return (
        <>
            <ArticleInstructions/>
            <Article articleJson={exampleArticleJson} onClick={this.handleArticle}/>
            <ArticleStanceQuestion question={exampleArticleJson.stanceQuestion}/>
            <CommentsInstructions/>
            <Comments commentsJson={exampleCommentsJson}/>
        </>
      );
    }
}

export default Labelling;
