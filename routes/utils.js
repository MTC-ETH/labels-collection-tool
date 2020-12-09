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

const _ = require('lodash');
const mongoose = require('mongoose');

const articles = require(`../models/articles`);
const labelledentries = require(`../models/labelledentries`);
const labellers = getCorrectLabellersSchema();
const labellingstatuses = require(`../models/labellingstatuses`);


function getAllData() {
    const queryPromises = [];
    queryPromises.push(articles.find({}, {articleID: 1}).then(results => {
        return {articles: results}
    }));
    queryPromises.push(labelledentries.find({}).then(results => {
        return {labelledentries: results}
    }));
    queryPromises.push(labellers.find({}).then(results => {
        return {labellers: results}
    }));
    queryPromises.push(labellingstatuses.find({}).then(results => {
        return {labellingstatuses: results}
    }));

    return Promise.all(queryPromises)
        .then(arrOfObjects => Object.assign({}, ...arrOfObjects)); //just flattens the objects
}

function millisecToString(millisec) {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours !== "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}

function getTokenFromRequest(req, res) {
    let labellerID = _.get(req, "query.labellerID", null);
    if(!labellerID) {
        console.log("Please provide labellerID in query");
        res.status(400).send({message: "Bitte geben Sie die labellerID in der Anfrage"});
        return null;
    }

    //convert to mongooseID and check it is valid id
    let _labellerID;
    try {
        _labellerID = mongoose.Types.ObjectId(labellerID)
    } catch (err) {
        console.log("labellerID is not a valid mongoose ID");
        res.status(400).send({message: "labellerID ist keine gültige mongoose ID", error: err});
        return null;
    }
    return _labellerID;
}

function getCorrectLabellersSchema() {
    if(process.env.REACT_APP_AUTOMATIC_REGISTRATION) {
        console.log("Using labellers with info");
        return require('../models/labellerswithinfo.js');
    }
    console.log("Using labellers without info");
    return require('../models/labellers.js');
}

module.exports.getAllData = getAllData;
module.exports.millisecToString = millisecToString;
module.exports.getTokenFromRequest = getTokenFromRequest;
module.exports.getCorrectLabellersSchema = getCorrectLabellersSchema;
