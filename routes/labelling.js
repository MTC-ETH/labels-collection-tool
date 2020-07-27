const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

const articles = require(`../models/articles`);
const labellingstatuses = require(`../models/labellingstatuses`);
const labellers = require(`../models/labellers`);
const labelledentries = require(`../models/labelledentries`);


//get the next article to be tagged
router.route('/article').get((req, res) => {
    let labellerID = _.get(req, "query.labellerID", null);
    console.log("labelling/article queried, with labellerID = " + labellerID);
    if(!labellerID) {
        return res.status(400).send({error: "Please provide labellerID in query"});
    }

    //convert to mongooseID and check it's valid id
    let _labellerID;
    try {
        _labellerID = mongoose.Types.ObjectId(labellerID)
    } catch (err) {
        return res.status(400).send({error: "labellerID is not a valid mongoose ID", stack: err.toString()});
    }

    //check that the labellerID exists
    labellers.exists({_id: _labellerID})
        .then(exists => {
            if(!exists) {
                throw new Error({error: "Please provide labellerID in query"});
            }
            //exists

            //if there is already a Labelling status from this labeller we have to return that article
            return labellingstatuses.findOne({labeller: labellerID}).exec()
                .then(status => {
                    if(status) {
                        console.log("Already find a status, replying with that one");
                        //there is a registered status
                        return articles.findOne({_id: status.article}).exec()
                            .then(matchingArticle => {
                                if(matchingArticle) {
                                    return {status: status, article: matchingArticle};
                                }
                                else {
                                    throw new Error("No matching article found for the status of this labeller")
                                }
                            });
                    } else {
                        console.log("Not found any status, initiating a new one");
                        //we have to get the next article to be tagged
                        //todo: should be updated to find the correct next article
                        //the article to task should neither be in the labellingstatuses (it's being labelled
                        //right now, nor in the labelledentries (it's already been labelled)
                        const queriesPromises = [];
                        queriesPromises.push(labellingstatuses.find({},{ "article": 1}).exec()
                            .then(statuses => statuses.map(el => el.article)));
                        queriesPromises.push(labelledentries.find({},{ "article": 1}).exec()
                            .then(statuses => statuses.map(el => el.article)));

                        return Promise.all(queriesPromises)
                            .then(idArrays => idArrays.flat())
                            .then(ids => articles.findOne({"_id": { "$nin": ids }}).exec())
                            .then(newArticle => {
                                //associate labeller to this article and write this in the labellingstatus table
                                const newLabellingStatus =  new labellingstatuses(
                                    {labeller: labellerID,
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
                                        })
                                    });

                                return newLabellingStatus.save()
                                    .then(labstat => {
                                        console.log('New Labelling status created for ' + labstat.labeller
                                            + ' and article' + labstat.article);
                                        return {status: labstat, article: newArticle};
                                    })
                            });
                        }
                }).then((responseObject) => {
                    res.json(responseObject)
                });

        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
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