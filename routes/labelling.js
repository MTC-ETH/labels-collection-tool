const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

const articles = require(`../models/articles`);
const labellingstatus = require(`../models/labellingStatus`);
const labellers = require(`../models/labellers`);


//get the next article to be tagged
router.route('/article').get((req, res) => {
    console.log("This is the req.body", req.body);

    let labellerID = _.get(req, "query.labellerID", null);
    console.log("labellerID = " + labellerID);
    if(!labellerID) {
        return res.status(500).send({error: "Please provide labellerID in query"});
    }

    //convert to mongooseID and check it's valid id
    let _labellerID;
    try {
        _labellerID = mongoose.Types.ObjectId(labellerID)
    } catch (err) {
        return res.status(500).send({error: "labellerID is not a valid mongoose ID", stack: err.toString()});
    }

    //check that the labellerID exists
    labellers.exists({_id: _labellerID})
        .then(exists => {
            if(!exists) {
                console.log("labellerID not found");
                throw new Error({error: "Please provide labellerID in query"});
            }
            //exists
            console.log("labellerID found");

            //todo: should be updated to find the correct next article
            articles.findOne({}).exec((err, queryRes) => {
                if(err) {
                    console.log(err);
                    throw new Error(err);
                }
                //associate labeller to this article and write this in the labellingstatus table

                new labellingstatus({labeller: labellerID, article: queryRes._id}).save()
                    .then(labstat => {
                        console.log('SUCCESS\nNew labelling status created for ' + labstat.labeller
                            + ' and article' + labstat.article);
                        console.log("Query will return the article: " + queryRes._id);
                        // console.log(queryRes);
                        res.json(queryRes);
                    })
                    .catch(err => res.status(500).send(err));
            });
        })
        .catch(err => res.status(500).send(err));
});

// POST an intermediate result of tagging a paragraph
router.route('/tag/paragraph').post((req, res) => {
    console.log("request of tagging paragraph");

    labellingstatus.updateOne({'labeller': req.labeller, 'article': req.article,
            'paragraphs.consecutiveID': req.consecutiveID},
        {upsert: true},
        {'$set': {
            'paragraphs.$.label': req.label,
        }},
        function(err) {
        if (err) return res.status(500).send({error: err});
        return res.send('Successfully saved.');
    });
});

//----------------------------------------

module.exports = router;