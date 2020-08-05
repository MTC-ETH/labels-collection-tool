const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

const labellers = require(`../models/labellers`);


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
        return res.json({valid: false, message: "The token is not a valid identifier, " +
                "check its correctness and try again."});
    }

    return labellers.findOne({_id: _labellerID}).exec()
        .then(queryRes => {
            if(!queryRes) {
                console.log("Labeller not registered or not found.");
                return res.json({valid: false, message: "Labeller not registered or not found, please try again."});
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