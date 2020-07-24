const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');

const articles = require(`../models/articles`);
const labellingstatuses = require(`../models/labellingstatuses`);
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

            //if there is already a labelling status from this labeller we have to return that article
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
                        return articles.findOne({}).exec()
                            .then((newArticle) => {
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
                                    console.log('SUCCESS\nNew labelling status created for ' + labstat.labeller
                                        + ' and article' + labstat.article);
                                    console.log("Query will return the article: " + newArticle._id);
                                    // console.log(newArticle);

                                    return {status: labstat, article: newArticle};
                                })
                        });
                    }
                }).then((responseObject) => {
                    console.log(responseObject);
                    res.json(responseObject)
                });


        })
        .catch(err => res.status(500).send(err));
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
        }).then(updatedstatus => {
        console.log(updatedstatus);
        return res.send('Successfully saved.');
    }).catch(err => {
        return res.status(500).send({error: err});
    });
}

// POST an intermediate result of tagging a paragraph
router.route('/tag/article').post((req, res) => {
    console.log("request of tagging paragraph");
    return labellingstatuses.updateOne({
            'labeller': mongoose.Types.ObjectId(req.body.labeller),
            'article': mongoose.Types.ObjectId(req.body.article),
        },
        {
            $set: {
                stanceArticleQuestionLabel: req.body.label,
            }
        }).then(updatedstatus => {
        console.log(updatedstatus);
        return res.send('Successfully saved.');
    }).catch(err => {
        return res.status(500).send({error: err});
    });
});

// POST an intermediate result of tagging a paragraph
router.route('/tag/paragraph').post((req, res) => {
    console.log("request of tagging paragraph");
    return updatelabellingstatutes(req, res, "paragraphsEmotionLabel", "paragraphConsecutiveID");
});

// POST an intermediate result of tagging a comment stance
router.route('/tag/comment/stance').post((req, res) => {
    console.log("request of tagging comment stance");
    return updatelabellingstatutes(req, res, "commentsStanceLabel", "commentID");
});

// POST an intermediate result of tagging a comment emotion
router.route('/tag/comment/emotion').post((req, res) => {
    console.log("request of tagging comment emotion");
    return updatelabellingstatutes(req, res, "commentsEmotionLabel", "commentID");
});

//----------------------------------------

module.exports = router;