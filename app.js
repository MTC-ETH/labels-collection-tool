const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

//mongod
//mongo "mongodb://localhost/labelling_tool"
//mongo "mongodb://heroku_wll30t81:u7m90co6idj3qrj24mqcg2u2vi@ds153304.mlab.com:53304/heroku_wll30t81"

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

const registerRouter = require('./routes/register');
app.use('/register/', registerRouter);

const backupRouter = require('./routes/backup');
app.use('/backup/', backupRouter);

backupRouter.buildMailerJob();

if (process.env.NODE_ENV === 'production') {
    //direct to local react build
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
