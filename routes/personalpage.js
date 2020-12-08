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

const router = require('express').Router();
const config = require( "../config");

const labelledentries = require(`../models/labelledentries`);
const labellers = require(`../models/labellers`);
const {getTokenFromRequest} = require("./utils");


router.route('/info').get((req, res) => {
    console.log("personalpage/info queried");
    const _labellerID = getTokenFromRequest(req, res);
    console.log(", with labellerID = " + _labellerID);

    if(_labellerID === null) {
        return; //we've already sent the reply communicating the problem
    }

    const queryPromises = [];

    queryPromises.push(labelledentries.countDocuments({labeller: _labellerID}).exec()
        .then(c => {return {nTaggedArticles: c, money: config.moneyPerArticle*c}}));
    //
    // queryPromises.push(labellers.findOne({_id: _labellerID}).exec()
    //     .then(c => {return {name: c.name, surname: c.surname}}));

    return Promise.all(queryPromises)
        .then(arrOfObjects => Object.assign({}, ...arrOfObjects)) //just flattens the objects
        .then(infos => res.json({infos}))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});


//----------------------------------------

module.exports = router;