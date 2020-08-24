import React from "react";

// reactstrap components
import {Col, Container, Row} from "reactstrap";
import Paragraph from "./Paragraph";

class Article extends React.Component {
    // Set default props
    static defaultProps = {
        contentBackgroundColor: "#f2f0e6",
        instructionsTextColor: "#1e0ead"
    };

  render() {
      if (!this.props.articleJson) {
          return null;
      }
      const { articleJson } = this.props;

      console.log("In Article: " + articleJson.title);
      return (
          <>
            <Container className="shape-container align-items-center">
                <Row style={{background: this.props.contentBackgroundColor}}>
                    <Col>
                        <h2> {articleJson.title}</h2>
                        <h5> {articleJson.snippet}</h5>
                    </Col>
                </Row>
                <Row style={{
                    color: this.props.instructionsTextColor,
                }} className={"text-center mt-3 mb-n2"}>
                    <Col xs={12} sm={7} md={7} lg={7} xl={7}>
                        <h5>Article paragraph</h5>
                    </Col>
                    <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                        <h5>Emotion and intensity?</h5>
                    </Col>
                </Row>
                {articleJson.paragraphs.map((par, index) => {
                    return (<Paragraph key={articleJson.articleID + par.consecutiveID.toString()}
                                       emotionStatus={this.props.paragraphsEmotionLabel[par.consecutiveID]}
                                       error={this.props.paragraphsError[par.consecutiveID]}
                                       contentBackgroundColor={this.props.contentBackgroundColor}
                                       onClick={(event, emotion) => {return this.props.onClick(event, emotion, par);}}
                                       onClickIntensity={(event, intensity) => {return this.props.onClickIntensity(event, intensity, par);}}
                                       instructionsTextColor={this.props.instructionsTextColor}>
                        {par.text}
                    </Paragraph>);
                })}
            </Container>
        </>
    );
  }
}

export default Article;
