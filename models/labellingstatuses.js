// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

const {emotionTagSchema, stanceTagSchema} = require("./emotionsStanceTagSchemas");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labellingstatusesSchema = new Schema({
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers' },
        article: { type: Schema.Types.ObjectId, ref: 'articles' },
        firstLabelledEnteredDate: {type: Date, default: null},
    articleID: String,
        paragraphsEmotionLabel: {type: Map, of: emotionTagSchema},
        paragraphsEmotionLabelHistory: {type: Map, of: {type: [emotionTagSchema], default: []}},
        stanceArticleQuestionsLabel: {type: Map, of: stanceTagSchema},
        stanceArticleQuestionsLabelHistory: {type: Map, of: {type: [emotionTagSchema], default: []}},
        emotionArticleLabel: {type: emotionTagSchema, default: null},
        emotionArticleLabelHistory: {type: [emotionTagSchema], default: []},
    },
    {
        timestamps: true
    });

function getDefaultEmptySchema(_labellerID, article) {

    const mappedArticles = article.paragraphs.map(par => {
        return {[par.consecutiveID]: {
                label: null,
                intensity: null,
                notSure: false,
                enteredAt: null
            }};
    });
    console.log(mappedArticles);
    console.log(    Object.assign(
        ...mappedArticles));
    return new labellingstatuses(
        {
            labeller: _labellerID,
            article: article._id,
            articleID: article.articleID,
            paragraphsEmotionLabel: Object.assign(
                ...article.paragraphs.map(par => {
                return {[par.consecutiveID]: {
                        label: null,
                        intensity: null,
                        notSure: false,
                        enteredAt: null
                    }};
            })),
            paragraphsEmotionLabelHistory: Object.assign(
                ...article.paragraphs.map(par => {
                return {[par.consecutiveID]: []
                };
            })),
            stanceArticleQuestionsLabel: Object.assign(
                ...article.stanceQuestions.map(question => {
                    return {[question.ID]: {
                            label: null,
                            intensity: null,
                            notSure: false,
                            enteredAt: null
                        }};
                })),
            stanceArticleQuestionsLabelHistory: Object.assign(
                ...article.stanceQuestions.map(question => {
                    return {[question.ID]: []
                    };
                })),
            emotionArticleLabel: {    label: null,
                intensity: null,
                notSure: false,
                enteredAt: null},
            emotionArticleLabelHistory: []
        });
}


const labellingstatuses = mongoose.model("labellingstatuses", labellingstatusesSchema);

// save the date in which the labeller started labelling (clicked its first button)
function updateLabellingStatusesDate(labeller, article) {
    return labellingstatuses.updateOne({
            'labeller': mongoose.Types.ObjectId(labeller),
            'article': mongoose.Types.ObjectId(article),
            firstLabelledEnteredDate: null
        },
        {
            $set: {
                firstLabelledEnteredDate: Date.now(),
            }
        })
        .then((res) => {
            if(!res.ok) {
                return false;
            }
            if(res.nModified) {
                console.log("Succesfully updated firstLabelledEnteredDate too.");
            } else {
                console.log("firstLabelledEnteredDate was already entered, no update needed");
            }
            console.log(res);
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        });
}

function updateEmotionArticleLabel(labeller, article, data) {
    return labellingstatuses.findOne({
        'labeller': mongoose.Types.ObjectId(labeller),
        'article': mongoose.Types.ObjectId(article),
    }).exec()
        .then(status => {
            //push current status in history
            if(status.emotionArticleLabel.enteredAt !== null) { //if it's null means it was the first labelled entered
                status.emotionArticleLabelHistory.push(status.emotionArticleLabel);
            }

            //copy in new tag
            status.emotionArticleLabel = data;

            return status.save();
        });
}

function updateStanceArticleQuestionsLabel(labeller, article, elemID, data) {
    return labellingstatuses.findOne({
        'labeller': mongoose.Types.ObjectId(labeller),
        'article': mongoose.Types.ObjectId(article),
    }).exec().then(status => {
        //push current status in history
        const stringID = String(elemID);
        if (status.stanceArticleQuestionsLabel.get(stringID).enteredAt !== null) {
            const newHistory = status.stanceArticleQuestionsLabelHistory.get(stringID);
            newHistory.push(status.stanceArticleQuestionsLabel.get(stringID));
            console.log(newHistory);
            status.stanceArticleQuestionsLabelHistory.set(stringID, newHistory);
            status.markModified('stanceArticleQuestionsLabelHistory');
        }

        //copy in new tag
        status.stanceArticleQuestionsLabel.set(stringID, data);
        status.markModified('stanceArticleQuestionsLabel');

        return status.save();
    });
}

function updateParagraphsEmotionLabel(labeller, article, elemID, data) {
    return labellingstatuses.findOne({
        'labeller': mongoose.Types.ObjectId(labeller),
        'article': mongoose.Types.ObjectId(article),
    }).exec().then(status => {
        //push current status in history
        const stringID = String(elemID);
        if (status.paragraphsEmotionLabel.get(stringID).enteredAt !== null) {
            const newHistory = status.paragraphsEmotionLabelHistory.get(stringID);
            newHistory.push(status.paragraphsEmotionLabel.get(stringID));
            console.log(newHistory);
            status.paragraphsEmotionLabelHistory.set(stringID, newHistory);
            status.markModified('paragraphsEmotionLabelHistory');
        }

        //copy in new tag
        status.paragraphsEmotionLabel.set(stringID, data);
        status.markModified('paragraphsEmotionLabel');

        return status.save();
    });
}

module.exports = labellingstatuses;
module.exports.getDefaultEmptySchema = getDefaultEmptySchema;
module.exports.updateLabellingStatusesDate = updateLabellingStatusesDate;
module.exports.updateEmotionArticleLabel = updateEmotionArticleLabel;
module.exports.updateStanceArticleQuestionsLabel = updateStanceArticleQuestionsLabel;
module.exports.updateParagraphsEmotionLabel = updateParagraphsEmotionLabel;
