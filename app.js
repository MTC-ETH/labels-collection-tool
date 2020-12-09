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

const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || "mongodb://localhost/labelling_tool";

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const labellingRouter = require('./routes/labelling');
app.use('/labelling/', labellingRouter);

const admindashboardRouter = require('./routes/admindashboard');
app.use('/admindashboard/', admindashboardRouter);

const authenticatelabellerRouter = require('./routes/authenticatelabeller');
app.use('/authenticatelabeller/', authenticatelabellerRouter);

// const registerRouter = require('./routes/register');
// app.use('/register/', registerRouter);

const backupRouter = require('./routes/backup');
app.use('/backup/', backupRouter);

const personalpageRouter = require('./routes/personalpage');
app.use('/personalpage/', personalpageRouter);

// backupRouter.buildMailerJob();

if (process.env.NODE_ENV === 'production') {
    const https = require("https");
    const fs = require("fs");

    console.log("Running in production mode");
    //direct to local react build
    app.use(express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });

    const options = {
        key: fs.readFileSync(process.env.KEY_PATH),
        cert: fs.readFileSync(process.env.CERT_PATH)
    };

    https.createServer(options, app).listen(port, () =>
        console.log(`HTTPS Server is running on port: ${port}`));

    const httpOnly = express();

    // set up a route to redirect http to https
    httpOnly.get('*', function(req, res) {
        console.log("redirecting to https");
        res.redirect('https://' + req.headers.host + req.url);
    });

    const httpOnlyPort = process.env.HTTP_ONLY_PORT || 80;
    // have it listen on 80
    httpOnly.listen(httpOnlyPort, () => console.log(`HTTP Server is running on port: ${httpOnlyPort} and only redirecting requests`));
}
else {
    app.listen(port, () => {
        console.log(`HTTP Server is running on port: ${port}`);
    });
}
