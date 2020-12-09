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
const _ = require('lodash');
const mongoose = require('mongoose');
const {getCorrectLabellersSchema} = require("./utils");

const labellers = getCorrectLabellersSchema();


//get the next article to be tagged
router.route('/valid').get((req, res) => {
    const token = _.get(req, "query.token", null);
    console.log("authenticatelabeller/valid queried, with token = " + token);

    if(!token) {
        console.log("No token provided.");
        return res.status(400).send({error: "Please provide token in query"});
    }
    //convert to mongooseID and check it is valid id
    let _labellerID;
    try {
        _labellerID = mongoose.Types.ObjectId(token);
    } catch (err) {
        console.log("Not a mongoose id.");
        return res.json({valid: false, message: "Das Token ist kein gültiger Bezeichner." +
                " Überprüfen Sie seine Richtigkeit und versuchen Sie es erneut."});
    }

    return labellers.findOne({_id: _labellerID}).exec()
        .then(queryRes => {
            if(!queryRes) {
                console.log("Labeller not registered or not found.");
                return res.json({valid: false, message: "Beschrifter nicht registriert oder nicht " +
                        "gefunden, bitte versuchen Sie es erneut."});
            }
            console.log("Labeller found. OK.");
            return res.json({valid: true, message: "OK."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});


//----------------------------------------

module.exports = router;