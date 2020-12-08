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
import Paragraph from "./Paragraph";

class Article extends React.Component {

    static defaultProps = {
        contentBackgroundColor: "#f2f0e6",
        instructionsTextColor: "#1e0ead"
    };

  render() {
      if (!this.props.articleJson) {
          return null;
      }
      const { articleJson } = this.props;

      return (
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
                    <Col xs={12} sm={5} md={5} lg={5} xl={5}>
                        <h5>Artikel Absatz</h5>
                    </Col>
                    <Col xs={12} sm={7} md={7} lg={7} xl={7}>
                        <h5>Emotion und Intensität?</h5>
                    </Col>
                </Row>
                {articleJson.paragraphs.map((par, index) => {
                    return (<Paragraph key={articleJson.articleID + par.consecutiveID.toString()}
                                       emotionStatus={this.props.paragraphsEmotionLabel[par.consecutiveID]}
                                       error={this.props.paragraphsError[par.consecutiveID]}
                                       contentBackgroundColor={this.props.contentBackgroundColor}
                                       onClick={(event, fieldToUpdate, data) => {return this.props.onClickEmotionParagraph(event, fieldToUpdate, data, par);}}
                                       instructionsTextColor={this.props.instructionsTextColor}>
                        {par.text}
                    </Paragraph>);
                })}
            </Container>
    );
  }
}

export default Article;
