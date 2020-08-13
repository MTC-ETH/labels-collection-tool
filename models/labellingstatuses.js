const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labellingstatusesSchema = new Schema({
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers' },
        article: { type: Schema.Types.ObjectId, ref: 'articles' },
        firstLabelledEnteredDate: {type: Date, default: null},
    articleID: String,
        paragraphsEmotionLabel: [{paragraphConsecutiveID: Number, label: String, intensity: Number}], //0,1,2
        stanceArticleQuestionLabel: String,
        emotionArticleLabel: {type: {label: String, intensity: Number}, default: null},
        commentsStanceLabel: [{commentID: String, label: String}],
        commentsEmotionLabel: [{commentID: String, label: String, intensity: Number}], //0,1,2
        limitNumberOfComments: Number,
    },
    {
        timestamps: true
    });

const labellingstatuses = mongoose.model("labellingstatuses", labellingstatusesSchema);
module.exports = labellingstatuses;
