const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelledentriesSchema = new Schema({
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers', required: true },
        article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
        firstLabelledEnteredDate: {type: Date, default: null},
        finishedLabellingDate: {type: Date, default: null},
        articleID: String,
        paragraphsEmotionLabel: [{paragraphConsecutiveID: Number, label: String, intensity: Number}], //0,1,2
        stanceArticleQuestionLabel: String,
        emotionArticleLabel: {type: {label: String, intensity: Number}, default: null},
        commentsStanceLabel: [{commentID: String, label: String}],
        commentsEmotionLabel: [{commentID: String, label: String, intensity: Number}], //0,1,2
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
