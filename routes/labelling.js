const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

const articles = require(`../models/articles`);
const labellingstatuses = require(`../models/labellingstatuses`);
const labellers = require(`../models/labellers`);
const labelledentries = require(`../models/labelledentries`);

const config = require('../config');

function getTokenFromRequest(req, res) {
    let labellerID = _.get(req, "query.labellerID", null);
    if(!labellerID) {
        res.status(400).send({message: "Please provide labellerID in query"});
        return null;
    }

    //convert to mongooseID and check it's valid id
    let _labellerID;
    try {
        _labellerID = mongoose.Types.ObjectId(labellerID)
    } catch (err) {
        res.status(400).send({message: "labellerID is not a valid mongoose ID", error: err});
        return null;
    }
    return _labellerID;
}

//get the next article to be tagged
router.route('/article').get((req, res) => {
    console.log("labelling/article queried");

    const _labellerID = getTokenFromRequest(req, res);
    console.log(", with labellerID = " + _labellerID);

    if(_labellerID === null) {
        return; //we've already sent the reply communicating the problem
    }

    //check that the labellerID exists
    labellers.findOne({_id: _labellerID})
        .then(queryRes => {
            //if he clicked on the link he confirmed the email
            if(queryRes !== null) {
                return queryRes.update({confirmedEmail: true}).then(() => true);
            }
            return false;
        })
        .then(exists => {
            if(!exists) {
                return res.status(400).send({message: "labellerID doesn't exist in database, please use a valid one",
                    error: null});
            }
            //exists

            //if there is already a labelling status from this labeller we have to return that article
            return labellingstatuses.findOne({labeller: _labellerID}).exec()
                .then(status => {
                    if(status) {
                        console.log("Already find a status, replying with that one");
                        //there is a registered status
                        //lean returns an object rather than a mongoose document, needed because we want to modify it
                        return articles.findOne({_id: status.article}).lean().exec()
                            .then(matchingArticle => {
                                if(matchingArticle) {
                                    matchingArticle.comments = matchingArticle.comments
                                        .slice(0, status.limitNumberOfComments);
                                    return res.json({status: status, article: matchingArticle});
                                }
                                else {
                                    throw new Error("No matching article found for the status of this labeller");
                                }
                            });
                    } else {
                        console.log("Not found any status, initiating a new one");
                        //we have to get the next article to be tagged
                        //the article to task should neither be in the labellingstatuses (it's being labelled
                        //right now, nor in the labelledentries (it's already been labelled)
                        const queriesPromises = [];
                        queriesPromises.push(labellingstatuses.find({},{ "article": 1}).exec()
                            .then(statuses => statuses.map(el => el.article)));
                        queriesPromises.push(labelledentries.find({},{ "article": 1}).exec()
                            .then(statuses => statuses.map(el => el.article)));

                        return Promise.all(queriesPromises)
                            .then(idArrays => idArrays.flat())
                            //lean returns an object rather than a mongoose document, needed because we want to modify it
                            .then(ids => articles.findOne({"_id": { "$nin": ids }}).lean().exec())
                            .then(newArticle => {
                                if(newArticle === null) {
                                    return res.status(400).send({message: "No article found. Either the database is " +
                                            "empty or all the articles have been labelled",
                                        error: null});
                                }
                                //associate labeller to this article and write this in the labellingstatus table
                                newArticle.comments = newArticle.comments.slice(0, config.commentsPerArticle);
                                const newLabellingStatus =  new labellingstatuses(
                                    {labeller: _labellerID,
                                        article: newArticle._id,
                                        paragraphsEmotionLabel: newArticle.paragraphs.map(par => {
                                            return {paragraphConsecutiveID: par.consecutiveID, label: null}
                                        }),
                                        stanceArticleQuestionLabel: null,
                                        commentsStanceLabel: newArticle.comments.map(com => {
                                            return {commentID: com.commentID, label: null}
                                        }),
                                        commentsEmotionLabel: newArticle.comments.map(com => {
                                            return {commentID: com.commentID, label: null}
                                        }),
                                        limitNumberOfComments: config.commentsPerArticle
                                    });

                                return newLabellingStatus.save()
                                    .then(labstat => {
                                        console.log('New labelling status created for ' + labstat.labeller
                                            + ' and article' + labstat.article);
                                        res.json({status: labstat, article: newArticle});
                                    })
                            });
                        }
                });

        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

//get the the number of articles tagged by a certain labeller
router.route('/ntagged').get((req, res) => {
    console.log("labelling/ntagged queried");
    const id = getTokenFromRequest(req, res);

    if(id === null) {
        return; //we've already sent the reply communicating the problem
    }

    return labelledentries.countDocuments({labeller: id}).exec()
        .then(count => {
            console.log("Found count " + count);
            return res.json({count: count})
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
});

function updatelabellingstatutes(req, res, arrayName, elemIDName) {
    return labellingstatuses.updateOne({
            'labeller': mongoose.Types.ObjectId(req.body.labeller),
            'article': mongoose.Types.ObjectId(req.body.article),
            [arrayName + '.' + elemIDName]: req.body.elemID,
        },
        {
            $set: {
                [arrayName + '.$.label']: req.body.label,
            }
        }).then(() => {
        console.log("Succesfully updated.");
        return res.send('Successfully saved.');
    }).catch(err => {
        return res.status(500).send({error: err});
    });
}

// POST an intermediate result of tagging a paragraph
router.route('/tag/article').post((req, res) => {
    console.log("labelling/tag/article queried");

    return labellingstatuses.updateOne({
            'labeller': mongoose.Types.ObjectId(req.body.labeller),
            'article': mongoose.Types.ObjectId(req.body.article),
        },
        {
            $set: {
                stanceArticleQuestionLabel: req.body.label,
            }
        })
        .then(() => {
        console.log("Succesfully updated.");
        return res.send('Successfully saved.');
    }).catch(err => {
        return res.status(500).send({error: err});
    });
});

// POST an intermediate result of tagging a paragraph
router.route('/tag/paragraph').post((req, res) => {
    console.log("labelling/tag/paragraph queried");
    return updatelabellingstatutes(req, res, "paragraphsEmotionLabel", "paragraphConsecutiveID");
});

// POST an intermediate result of tagging a comment stance
router.route('/tag/comment/stance').post((req, res) => {
    console.log("labelling/comment/stance queried");
    return updatelabellingstatutes(req, res, "commentsStanceLabel", "commentID");
});

// POST an intermediate result of tagging a comment emotion
router.route('/tag/comment/emotion').post((req, res) => {
    console.log("labelling/comment/emotion queried");
    return updatelabellingstatutes(req, res, "commentsEmotionLabel", "commentID");
});

router.route('/submit').post((req, res) => {
    console.log("labelling/submit queried");

    //reconciliation check between server status and client status
    const data = req.body;

    function reconciliate(newEntry, listName, idName) {
        for (let i = 0; i < newEntry[listName].length; ++i) {
            const curr = newEntry[listName][i];
            if (curr.label !== data[listName][curr[idName]]) {
                console.log("reconciliation needed for:");
                console.log(curr);
                console.log(curr[idName]);
                newEntry[listName][i].label = data[listName][curr[idName]];
            }
        }
    }

    return labellingstatuses.findOne({
        'labeller': mongoose.Types.ObjectId(req.body.labeller),
        'article': mongoose.Types.ObjectId(req.body.article),
    }).exec().then(queryRes => {
        console.log(queryRes);
        const newEntry = {...queryRes._doc};
        //allows us to save into the other collection
        newEntry._id = mongoose.Types.ObjectId();
        // newEntry.isNew = true;
        console.log(newEntry);
        
        reconciliate(newEntry, "paragraphsEmotionLabel", "paragraphConsecutiveID");

        if(newEntry.stanceArticleQuestionLabel !== data.stanceArticleQuestionLabel) {
            console.log("reconciliation needed for:");
            console.log(newEntry.stanceArticleQuestionLabel);
            console.log(data.stanceArticleQuestionLabel);
            newEntry.stanceArticleQuestionLabel = data.stanceArticleQuestionLabel;
        }

        reconciliate(newEntry, "commentsStanceLabel", "commentID");
        reconciliate(newEntry, "commentsEmotionLabel", "commentID");

        const newLabelledEntry = new labelledentries(newEntry);
        return newLabelledEntry.save().then(() => {
            console.log("Successfully saved.");
            return queryRes.remove().then(() => {
                console.log("Successfully removed labellingstatuses record.");
                res.send('Successfully saved.')
            });
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).send({error: err});
    });
});

//----------------------------------------

module.exports = router;