import React from "react";
import PlutchikSelector from "../components/labelling/PlutchikSelector";
import exampleArticleJson from "../assets/json/exampleArticle";
import exampleCommentsJson from "../assets/json/exampleComments";
import Article from "../components/labelling/Article";
import Comments from "../components/labelling/CommentsContainer";


class Labelling extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            article: null,
          comments: null
        };
    }

    componentDidMount() {
      this.setState({
        article: exampleArticleJson,
        comments: exampleCommentsJson,
      });
    }

    render() {
      return (
        <>
            <Article articleJson={exampleArticleJson} />
            <Comments commentsJson={exampleCommentsJson}/>
        </>
      );
    }
}

export default Labelling;
