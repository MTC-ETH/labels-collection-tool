const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

const labellers = require(`../models/labellers`);


//get the next article to be tagged
router.route('/valid').get((req, res) => {
    console.log("This is the req.body", req.body);

    let token = _.get(req, "query.token", null);
    console.log("token = " + token);
    if(!token) {
        return res.status(400).send({error: "Please provide token in query"});
    }
    //convert to mongooseID and check it's valid id
    let _labellerID;
    try {
        _labellerID = mongoose.Types.ObjectId(token);
    } catch (err) {
        console.log("Not a mongoose id");
        console.log(err);
        return res.json({valid: false, message: "The token is not a valid identifier, " +
                "check its correctness and try again."});
    }

    return labellers.findOne({_id: _labellerID}).exec()
        .then(queryRes => {
            console.log(queryRes);
            if(!queryRes) {
                return res.json({valid: false, message: "Labeller not registered or not found, please try again."});
            }
            return res.json({valid: true, message: "OK."});
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});


//----------------------------------------

module.exports = router;