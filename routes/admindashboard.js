const router = require('express').Router();
const _ = require('lodash');
const config = require( "../config");

const labelledentries = require(`../models/labelledentries`);
const labellers = require(`../models/labellers`);
const articles = require(`../models/articles`);
const {getAllData, millisecToString} = require("./utils");



function checkAdminToken(req, res) {
    const token = _.get(req, "query.token", null);
    if(!token) {
        console.log("No token in query");
        res.status(400).send({error: "Please provide token in query"});
        return false;
    }
    if(token !== process.env.ADMIN_TOKEN) {
        console.log("Token is not admin token. " + token);
        res.status(400).send({error: "Token is not admin token."});
        return false;
    }
    return true;
}

function replyWithDowloadableTable(res, mongooseModel) {
    console.log(mongooseModel.collection.collectionName);
    return mongooseModel.find({})
        .then(queryRes => {
            console.log("Succesfully authenticated, returning records");
            res.set("Content-Disposition", "attachment; filename=" + mongooseModel.collection.collectionName + ".json");
            res.type('application/json');
            res.json(queryRes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

router.route('/labelledentries').get((req, res) => {
    console.log("admindashboard/labelledentries queried");
    if(!checkAdminToken(req, res)) {
        return false;
    }
    return replyWithDowloadableTable(res, labelledentries);
});

router.route('/labellers').get((req, res) => {
    console.log("admindashboard/labellers queried");
    if(!checkAdminToken(req, res)) {
        return false;
    }
    return replyWithDowloadableTable(res, labellers);
});

router.route('/articles').get((req, res) => {
    if(!checkAdminToken(req, res)) {
        return false;
    }
    return replyWithDowloadableTable(res, articles);
});

router.route('/all').get((req, res) => {
    console.log("admindashboard/labelledentries queried");
    if(!checkAdminToken(req, res)) {
        return false;
    }
    return getAllData().then(queryRes => {
        console.log("Succesfully authenticated, returning records");
        res.set("Content-Disposition", "attachment; filename=all.json");
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
    queryPromises.push(labelledentries.distinct('article').exec()
        .then(entries => {return {nTaggedUniqueArticles: entries.length}}));

    queryPromises.push(labelledentries.find({}).exec()
        .then(entries => {
            const nonNullEntries = entries
                .filter((entry) => entry.finishedLabellingDate !== null && entry.finishedLabellingDate !== undefined
                    && entry.firstLabelledEnteredDate !== null && entry.firstLabelledEnteredDate !== undefined);
            let averageTime = nonNullEntries
                .map((entry) => entry.finishedLabellingDate - entry.firstLabelledEnteredDate)
                .reduce((a, b) => a + b, 0);
            console.log(averageTime);
            averageTime /= nonNullEntries.length;
            console.log(averageTime);
            console.log(millisecToString(averageTime));
            return {averageTaggingTime: millisecToString(averageTime)};
        }));


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