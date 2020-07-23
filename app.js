const express = require('express');
const cors = require('cors');
const path = require('path');

const mongoose = require('mongoose');

const uri = 'mongodb://localhost/labelling_tool';

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tagCommentRouter = require('./routes/entryPoint');
app.use('/', tagCommentRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
