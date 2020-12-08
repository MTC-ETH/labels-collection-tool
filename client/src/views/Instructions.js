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
import {Button, Col, Container} from "reactstrap";
import Row from "reactstrap/es/Row";

import Header from "../components/Header";
import queryString from 'query-string';
import EmotionsParagraphsInstructions from "../components/Instructions/EmotionsParagraphsInstructions";
import TechnicalInstructions from "../components/Instructions/TechnicalInstructions";
import Footer from "../components/Footer";
import EmotionsExamples from "../components/Instructions/EmotionsExamples";
import StanceInstructions from "../components/Instructions/StanceInstructions";
import ContainedHr from "../components/ContainedHr";
import EmotionWholeArticleInstructions from "../components/Instructions/EmotionWholeArticleInstructions";
import StanceExamples from "../components/Instructions/StanceExamples";
import Cookies from "js-cookie";


class Instructions extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {token: null};
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        const token = params.token;
        const fromEmail = Boolean(params.email);
        console.log("token = " + token + " fromEmail =  " + fromEmail);
        if(token && fromEmail) {
            Cookies.set('token', token);
        }
        this.setState({token});
    }

    render() {
        return (<>
            <Header selectedPage={"instructions"}/>
            <Container>
                <Row><Col><h2>Anleitungen</h2></Col></Row>
                <Row>
                    <Col>
                        <p>Für jede Seite erhalten Sie einen in Absätze unterteilten Artikel.
                            Sie werden dazu aufgefordert:</p>
                        <ol>
                            <li>Jedem <b>Absatz</b> ein <b>Emotions</b>-Label zuzuordnen</li>
                            <li>Dem <b>gesamten Artikel</b> ein <b>Emotions</b>-Label</li>
                            <li>Den <b>Standpunkt</b> des <b>Artikels</b> zu einem bestimmten Thema zu bewerten</li>
                        </ol>
                         <p>
                             Wenn Sie sich zu irgendeinem Zeitpunkt des Prozesses müde oder angestrengt fühlen,
                             können Sie jederzeit aufhören und später weitermachen, alle Ihre Eingaben werden
                             gespeichert. Nichts geht verloren, auch wenn Sie mitten in einem Artikel aufhören.
                         </p>
                    </Col>
                </Row>
                <EmotionsParagraphsInstructions/>
                <EmotionsExamples/>
                <ContainedHr/>
                <EmotionWholeArticleInstructions/>
                <ContainedHr margins={"mt-n2 mb-4"}/>
                <StanceInstructions/>
                <StanceExamples/>
                <ContainedHr margins={"mb-4"}/>
                <TechnicalInstructions/>
                <Row>
                    <Col>
                        <Button className="p-1"
                                size={"lg"}
                                href={this.state.token ? "/labelling?token=" + this.state.token : "/labelling"} block>
                            Beschriftung beginnen oder fortsetzen
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>);
    }
}

export default Instructions;
