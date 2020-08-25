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
        stanceArticleQuestionLabel: stanceTagSchema,
        stanceArticleQuestionLabelHistory: {type: [stanceTagSchema], default: []},
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
            stanceArticleQuestionLabel: {label: null,
                notSure: false,
                enteredAt: null},
            stanceArticleQuestionLabelHistory: [],
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

module.exports = labellingstatuses;
module.exports.getDefaultEmptySchema = getDefaultEmptySchema;
module.exports.updateLabellingStatusesDate = updateLabellingStatusesDate;