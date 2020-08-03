const router = require('express').Router();
const _ = require('lodash');
const config = require( "../config");

const labelledentries = require(`../models/labelledentries`);
const labellers = require(`../models/labellers`);


router.route('/labelled').get((req, res) => {
    const token = _.get(req, "query.token", null);
    console.log("admindashboard/labelled queried, with token = " + token);
    if(!token) {
        console.log("No token in query");
        return res.status(400).send({error: "Please provide token in query"});
    }
    if(token !== process.env.ADMIN_TOKEN) {
        console.log("Token is not admin token.");
        return res.status(400).send({error: "Token is not admin token."});
    }

    //check that the labellerID exists
    return labelledentries.find({})
        .then(queryRes => {
                    console.log("Succesfully authenticated, returning records");
                    res.set("Content-Disposition", "attachment; filename=labelled.json");
                    res.type('application/json');
                    res.json(queryRes);
                })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.route('/labellers').get((req, res) => {
    const token = _.get(req, "query.token", null);
    console.log("admindashboard/labellers queried, with token = " + token);
    if(!token) {
        console.log("No token in query");
        return res.status(400).send({error: "Please provide token in query"});
    }
    if(token !== process.env.ADMIN_TOKEN) {
        console.log("Token is not admin token.");
        return res.status(400).send({error: "Token is not admin token."});
    }

    //check that the labellerID exists
    return labellers.find({})
        .then(queryRes => {
            console.log("Succesfully authenticated, returning records");
            res.set("Content-Disposition", "attachment; filename=labellers.json");
            res.type('application/json');
            res.json(queryRes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.route('/status').get((req, res) => {
    console.log("admindashboard/status queried");
    const queryPromises = [];

    queryPromises.push(labellers.countDocuments({}).exec().then(c => {return {nRegisteredLabellers: c}}));
    queryPromises.push(labelledentries.countDocuments({}).exec().then(c => {return {nTaggedArticles: c}}));
    queryPromises.push(labelledentries.aggregate([
        {$group: { _id: null, totalSize: { $sum: { $size: "$commentsEmotionLabel"}}}}])
        .exec().then(r => {
            if(!r || r.length <= 0) {
                return {nTaggedComments: 0};
            }
            return {nTaggedComments: r[0].totalSize}}));
    queryPromises.push(labelledentries.distinct('article').exec()
        .then(entries => {return {nTaggedUniqueArticles: entries.length}}));

    //check that the labellerID exists
    return Promise.all(queryPromises)
        .then(arrOfObjects => Object.assign({}, ...arrOfObjects)) //just flattens the objects
        .then(status => {
            console.log("Replying with current status");
            const withConfig = Object.assign({}, config, status);
            console.log(withConfig);
            res.json(withConfig);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});


//----------------------------------------

module.exports = router;