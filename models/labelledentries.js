const {emotionTagSchema, stanceTagSchema} = require("./emotionsStanceTagSchemas");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelledentriesSchema = new Schema({
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers', required: true },
        article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
        firstLabelledEnteredDate: {type: Date, default: null},
        finishedLabellingDate: {type: Date, default: null},
        articleID: String,
        paragraphsEmotionLabel: {type: Map, of: emotionTagSchema},
        paragraphsEmotionLabelHistory: {type: Map, of: {type: [emotionTagSchema], default: []}},
        stanceArticleQuestionLabel: stanceTagSchema,
        stanceArticleQuestionLabelHistory: {type: [stanceTagSchema], default: []},
        emotionArticleLabel: {type: emotionTagSchema, default: null},
        emotionArticleLabelHistory: {type: [emotionTagSchema], default: []},
        deviceSpecs: {type: {
                osName: String,
                osVersion: String,
                browserName: String,
                browserVersion: String,
                deviceType: String
            },
            default: null}
    },
    {
        timestamps: true
    });

const labelledentries = mongoose.model("labelledentries", labelledentriesSchema);
module.exports = labelledentries;
