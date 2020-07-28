import React from "react";
import axios from 'axios';
import FileDownload from 'js-file-download';

import {Button, Col, Container, Row} from "reactstrap";
import InfoRow from "../components/AdminDashboard/InfoRow";

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
        return (
            <Container className="shape-container align-items-center pt-4">
                <Row>
                    <h2>Infos</h2>
                </Row>
                <InfoRow counter={this.state.nRegisteredLabellers}>Number of registered labellers:</InfoRow>
                <InfoRow counter={this.state.nTaggedArticles}>Number of labelled articles:</InfoRow>
                <InfoRow counter={this.state.nTaggedComments}>Number of labelled comments:</InfoRow>
                <Row className={"pt-4"}>
                    <h2>Actions</h2>
                </Row>
                <Row>
                    <Col><Button onClick={this.handleDownloadLabelled}>Download Labelled Data</Button></Col>
                </Row>
            </Container>
        );
    }
}

export default AdminDashboard;
