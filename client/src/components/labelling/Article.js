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

      return (
          <>
            <Container className="shape-container align-items-center">
                <Container className="mt-3">
                <Row>
                    <Col>
                        <h2> {articleJson.title}</h2>
                        <h5> {articleJson.snippet}</h5>
                    </Col>
                </Row>
                {articleJson.paragraphs.map(par => {
                    return (<Paragraph>
                        {par}
                    </Paragraph>);
                })}
                </Container>
            </Container>
        </>
    );
  }
}

export default Article;
