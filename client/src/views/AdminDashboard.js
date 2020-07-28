import React from "react";
import axios from 'axios';
import FileDownload from 'js-file-download';

import {Button, Col, Container, Row} from "reactstrap";
import InfoRow from "../components/AdminDashboard/InfoRow";
import Header from "../components/Header";

class AdminDashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            nRegisteredLabellers: null,
            nTaggedArticles: null,
            nTaggedComments: null,
        }
    }

    componentDidMount() {
        axios.get("/admindashboard/status")
            .then(res => {
                this.setState({
                    nRegisteredLabellers: res.data.nRegisteredLabellers,
                    nTaggedArticles: res.data.nTaggedArticles,
                    nTaggedComments: res.data.nTaggedComments,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleDownloadLabelled() {
        axios.get("/admindashboard/labelled?token=" + "temporarytoken")
            .then((response) => {
                FileDownload(JSON.stringify(response.data, null, 4), 'labelled.json');
            });
    }


    render() {
        return ( <>
            <Header/>
            <Container><Row><Col><h2>Admin Dashboard</h2></Col></Row></Container>
        <Container className="shape-container align-items-center">
                <Row className={"pt-2"}>
                    <Col>
                    <h3>Infos</h3>
                    </Col>
                </Row>
                <InfoRow counter={this.state.nRegisteredLabellers}>Number of registered labellers:</InfoRow>
                <InfoRow counter={this.state.nTaggedArticles}>Number of labelled articles:</InfoRow>
                <InfoRow counter={this.state.nTaggedComments}>Number of labelled comments:</InfoRow>
                <Row className={"pt-4"}>
                    <Col>
                    <h3>Actions</h3>
                </Col>
                </Row>
                <Row>
                    <Col><Button onClick={this.handleDownloadLabelled}>Download Labelled Data</Button></Col>
                </Row>
            </Container>
            </>
        );
    }
}

export default AdminDashboard;
