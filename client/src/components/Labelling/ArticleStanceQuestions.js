// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

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
