import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";
import Paragraph from "./Paragraph";

class Article extends React.Component {

  render() {
      if (!this.props.articleJson) {
          return null;
      }
      const { articleJson } = this.props;

      console.log("In Article: " + articleJson.title);
      return (
          <>
            <Container className="shape-container align-items-center">
                <Row>
                    <Col>
                        <h2> {articleJson.title}</h2>
                        <h5> {articleJson.snippet}</h5>
                    </Col>
                </Row>
                <Row style={{
                    color: "blue",
                    // fontSize: "12px"
                }} className={"text-center mt-3 mb-n2"}>
                    <Col xs={12} sm={7} md={7} lg={7} xl={7}>
                        <h5>Article paragraph</h5>
                    </Col>
                    <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                        <h5>Emotion?</h5>
                    </Col>
                </Row>
                {articleJson.paragraphs.map((par, index) => {
                    return (<Paragraph key={articleJson.articleID + par.consecutiveID.toString()}
                                       selectedEmotion={this.props.paragraphsEmotionLabel[par.consecutiveID]}
                                       error={this.props.paragraphsError[par.consecutiveID]}
                                       onClick={(event, emotion) => {return this.props.onClick(event, emotion, par);}}>
                        {par.text}
                    </Paragraph>);
                })}
            </Container>
        </>
    );
  }
}

export default Article;
