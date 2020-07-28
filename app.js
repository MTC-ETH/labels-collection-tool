const express = require('express');
const cors = require('cors');

require('dotenv').config();

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

const labellingRouter = require('./routes/labelling');
app.use('/labelling/', labellingRouter);

const admindashboardRouter = require('./routes/admindashboard');
app.use('/admindashboard/', admindashboardRouter);

const authenticatelabellerRouter = require('./routes/authenticatelabeller');
app.use('/authenticatelabeller/', authenticatelabellerRouter);

const registerRouter = require('./routes/register');
app.use('/register/', registerRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
