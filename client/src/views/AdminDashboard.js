import React from "react";
import axios from 'axios';
import FileDownload from 'js-file-download';

import {Button} from "reactstrap";

class AdminDashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleDownloadLabelled() {
        axios.get("/admindashboard/labelled?token=" + "temporarytoken")
            .then((response) => {
                console.log(response.data);
                FileDownload(JSON.stringify(response.data, null, 4), 'labelled.json');
            });
    }


    render() {
        return (
            <>
                <Button onClick={this.handleDownloadLabelled}>Download Labelled Data</Button>
            </>
        );
    }
}

export default AdminDashboard;
