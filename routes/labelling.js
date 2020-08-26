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

    //convert to mongooseID and check it is valid id
    let _labellerID;
    try {
        _labellerID = mongoose.Types.ObjectId(labellerID)
    } catch (err) {
        res.status(400).send({message: "labellerID is not a valid mongoose ID", error: err});
        return null;
    }
    return _labellerID;
}

function replyWithExistingStatus(status, res) {
    console.log("Already find a status, replying with that one");
    //there is a registered status
    //lean returns an object rather than a mongoose document, needed because we want to modify it
    return articles.findOne({_id: status.article}).lean().exec()
        .then(matchingArticle => {
            if (matchingArticle) {
                return res.json({status: status, article: matchingArticle});
            } else {
                throw new Error("No matching article found for the status of this labeller");
            }
        });
}

function createAndReplyWithNewStatus(res, _labellerID) {
    console.log("Not found any status, initiating a new one");
    //we have to get the next article to be tagged
    //the article should not have been labelled (labelledentries) or in the process of being labelled (labellingstatuses)
    //more than config.interrater.labbellersPerArticle times. To check this we callect all articles who are labbelled
    //more than config.interrater.labbellersPerArticle times.
    const allArticlesNLabellersReachedPromises = [];

    allArticlesNLabellersReachedPromises.push(labellingstatuses.aggregate([
        {
            $group: {
                _id:  "$article",
                count: { "$sum": 1 }
            }
        }]).then(queryRes => queryRes.filter(el => el.count >= config.interrater.labbellersPerArticle)));
    allArticlesNLabellersReachedPromises.push(labelledentries.aggregate([
        {
            $group: {
                _id:  "$article",
                count: { "$sum": 1 }
            }
        }]).then(queryRes => queryRes.filter(el => el.count >= config.interrater.labbellersPerArticle)));

    const allNonValuableArticleIdsPromises = [];
    allNonValuableArticleIdsPromises.push(Promise.all(allArticlesNLabellersReachedPromises)
        .then(idArrays => idArrays.flat())
        .then(countArray => {
            const aggregatedCounts = {};
            countArray.forEach(el => {
                if(el._id in aggregatedCounts){
                    aggregatedCounts[el._id] += el.count;
                } else {
                    aggregatedCounts[el._id] = el.count;
                }
                }
            );
            return Object.keys(aggregatedCounts)
                .filter(articleID => aggregatedCounts[articleID] >= config.interrater.labbellersPerArticle);
        })
        .then(ids => {
            console.log("Ids who have a count bigger than " + config.interrater.labbellersPerArticle);
            console.log(ids);

            //if we want to have multilabeller for all or we have not yet multilabelled enough
            //we return the ids which have been already labelled more than config.interrater.labbellersPerArticle times
            if(config.interrater.multiLabelledArticles === null || ids.length <= config.interrater.multiLabelledArticles) {
                return ids;
            }
            else { //otherwise (we have labelled enough articles with multilabellers(
                //just return the ids which have been already labelled once
                console.log("1 labeller per article reached");
                return Promise.all([
                    labellingstatuses.find({}, {"article": 1}).exec()
                    .then(statuses => statuses.map(el => el.article)),
                    labelledentries.find({}, {"article": 1}).exec()
                        .then(statuses => statuses.map(el => el.article))])
                    .then(idArrays =>  idArrays.flat());
            }
        }));

    //also check that next article is not among the ones he / she already labelled
    //to do this we collect all the ones he already labelled
    allNonValuableArticleIdsPromises.push(labellingstatuses.find({"labeller": _labellerID}, {"article": 1}).exec()
        .then(statuses => statuses.map(el => el.article)));
    allNonValuableArticleIdsPromises.push(labelledentries.find({"labeller": _labellerID}, {"article": 1}).exec()
        .then(statuses => statuses.map(el => el.article)));

    return Promise.all(allNonValuableArticleIdsPromises)
        .then(idArrays => {
            console.log("All excluded ids:");
            console.log(JSON.stringify(idArrays));
            return idArrays.flat()
        })
        //lean returns an object rather than a mongoose document, needed because we want to modify it
        .then(ids => articles.findOne({"_id": {"$nin": ids}}).lean().exec())
        .then(newArticle => {
            if (newArticle === null) {
                return res.status(400).send({
                    message: "No article found. Either the database is " +
                        "empty or all the articles have been labelled",
                    error: null
                });
            }
            //associate labeller to this article and write this in the labellingstatus table
            const newLabellingStatus = labellingstatuses.getDefaultEmptySchema(_labellerID, newArticle);

            return newLabellingStatus.save()
                .then(labstat => {
                    console.log('New labelling status created for ' + labstat.labeller
                        + ' and article' + labstat.article);
                    res.json({status: labstat, article: newArticle});
                })
        });
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
                        return replyWithExistingStatus(status, res);
                    } else {
                        return createAndReplyWithNewStatus(res, _labellerID);
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

function updateStatus(req, res, updateFunction) {
    return updateFunction()
        .then(() => {
            console.log("Succesfully updated.");
            return res.send('Successfully saved.');
        }).catch(err => {
            console.log(err);
            return res.status(500).send({error: err});
        }).then(() => labellingstatuses.updateLabellingStatusesDate(req.body.labeller, req.body.article));
}

// POST an intermediate result of tagging a stance question on article
router.route('/tag/article/stance').post((req, res) => {
    console.log("labelling/tag/article/stance queried");
    return updateStatus(req, res, () => labellingstatuses.updateStanceArticleQuestionLabel(req.body.labeller,
        req.body.article, req.body.data));
});

// POST an intermediate result of tagging emotion label article level
router.route('/tag/article/emotion').post((req, res) => {
    console.log("labelling/tag/article/emotion queried");
    return updateStatus(req, res, () => labellingstatuses.updateEmotionArticleLabel(req.body.labeller,
        req.body.article, req.body.data));
});

// POST an intermediate result of tagging a paragraph
router.route('/tag/paragraph/emotion').post((req, res) => {
    console.log("labelling/tag/paragraph/emotion queried");
    return updateStatus(req, res, () => labellingstatuses.updateParagraphsEmotionLabel(req.body.labeller,
        req.body.article, req.body.elemID, req.body.data));
});

router.route('/submit').post((req, res) => {
    console.log("labelling/submit queried");

    //reconciliation check between server status and client status
    const data = req.body;

    return labellingstatuses.findOne({
        'labeller': mongoose.Types.ObjectId(req.body.labeller),
        'article': mongoose.Types.ObjectId(req.body.article),
    }).exec().then(queryRes => {
        let newEntry = {...queryRes._doc};
        //allows us to save into the other collection
        newEntry._id = mongoose.Types.ObjectId();

        //make sure what the client posts is what we save by updating the values of the labelling status
        newEntry = Object.assign(newEntry, data);

        newEntry.finishedLabellingDate = Date.now();

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