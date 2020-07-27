const router = require('express').Router();
const _ = require('lodash');

const labelledentries = require(`../models/labelledentries`);
const labellers = require(`../models/labellers`);


router.route('/labelled').get((req, res) => {
    console.log("This is the req.body", req.body);

    let token = _.get(req, "query.token", null);
    console.log("token = " + token);
    console.log(process.env.ADMIN_TOKEN);
    if(!token) {
        return res.status(400).send({error: "Please provide token in query"});
    }
    if(token !== process.env.ADMIN_TOKEN) {
        return res.status(400).send({error: "Wrong token"});
    }

    //check that the labellerID exists
    return labelledentries.find({})
        .then(queryRes => {
            console.log(queryRes);
            res.set("Content-Disposition", "attachment; filename=labelled.json");
                    res.type('application/json');
                    res.json(queryRes);
                })
        .catch(err => res.status(500).send(err));
});

router.route('/status').get((req, res) => {
    const queryPromises = [];

    queryPromises.push(labellers.countDocuments({}).exec().then(c => {return {nRegisteredLabellers: c}}));
    queryPromises.push(labelledentries.countDocuments({}).exec().then(c => {return {nTaggedArticles: c}}));
    queryPromises.push(labelledentries.aggregate([
        {$group: { _id: null, totalSize: { $sum: { $size: "$commentsEmotionLabel"}}}}])
        .exec().then(r => {
            return {nTaggedComments: r[0].totalSize}}));

    //check that the labellerID exists
    return Promise.all(queryPromises)
        .then(arrOfObjects => Object.assign({}, ...arrOfObjects)) //just flattens the objects
        .then(status => {
            console.log(status);
            res.json(status);
        })
        .catch(err => res.status(500).send(err));
});


//----------------------------------------

module.exports = router;