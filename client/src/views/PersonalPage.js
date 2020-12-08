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
import axios from 'axios';
import {Button, Col, Container, Row} from "reactstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from 'js-cookie';
import InfoRow from "../components/AdminDashboard/InfoRow";

class PersonalPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            infos: {},
            token: null,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const token = Cookies.get('token');
        console.log("Token in cookies: ");
        console.log(token);
        if(token) {
            this.setState({token});
        }
        if(!token) {
            this.props.history.push("/authenticatelabeller?target=personalpage");
        }

        axios.get("/personalpage/info?labellerID="+token)
            .then(res => {console.log(res); this.setState({infos: res.data.infos});}
            )
            .catch(err => {
                console.log(err);
            });
    }

    handleLogout() {
        Cookies.remove("token");
        this.props.history.push("/");
    }

    render() {
        return (<>
                <Header selectedPage={"personalpage"}/>
                <Container className="shape-container align-items-center">
                    <h2>Persönliche Seite</h2>
                    <Row className={"pt-3"}>
                        <Col>
                            <h3>Infos</h3>
                        </Col>
                    </Row>
                        <InfoRow counter={this.state.infos.nTaggedArticles}>Anzahl der etikettierten Artikel:</InfoRow>
                        <InfoRow counter={this.state.infos.money}>Entsprechende Vergütung (CHF):</InfoRow>
                        <InfoRow counter={this.state.token}>Token:</InfoRow>
                        <Row className={"pt-3"}>
                            <Col>
                                <h3>Aktionen</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={9} md={9} lg={9} xl={9}>
                                <Button block
                                        onClick={() => this.handleDownload("labelledentries")}
                                href={"/labelling?labellerID="+this.state.token}>
                                    Beschriftung beginnen
                                </Button>
                            </Col>
                            <Col xs={12} sm={3} md={3} lg={3} xl={3}>
                                <Button block color="danger" onClick={this.handleLogout}>
                                    Abmelden
                                </Button>
                            </Col>
                        </Row>
                        <Row className={"mt-2"}>
                        </Row>
                    </Container>
                <Footer/>
            </>
        );
    }
}

export default PersonalPage;
