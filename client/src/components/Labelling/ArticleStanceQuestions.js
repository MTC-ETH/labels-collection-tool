import React from "react";

import {Col, Container, Row} from "reactstrap";
import SingleStanceQuestion from "./SingleStanceQuestion";

class ArticleStanceQuestions extends React.Component {
    static defaultProps = {
        instructionsTextColor: "#1e0ead"
    };

  render() {
      return (
            <Container className="shape-container align-items-center" >
                <Row style={{
                    color: this.props.instructionsTextColor
                }}>
                    <Col>
                        <h3>Standpunkt des Artikels zum Thema</h3>
                        <h6>Bitte wählen Sie nun aus, wie der Artikel auf die folgende(n) Frage(n) antwortet:</h6>
                    </Col>
                </Row>
                {this.props.questions.map((question) => {
                    return (
                        <SingleStanceQuestion key={"StanceQuest" + question.ID.toString()}
                                       stanceStatus={this.props.stanceStatus[question.ID]}
                                       error={this.props.questionsError[question.ID]}
                                       onClick={(event, fieldToUpdate, data) => {return this.props.onClick(event, fieldToUpdate, data, question);}}
                                       instructionsTextColor={this.props.instructionsTextColor}>
                        {question.text}
                    </SingleStanceQuestion>
                );
                })}
            </Container>
    );
  }
}

export default ArticleStanceQuestions;
