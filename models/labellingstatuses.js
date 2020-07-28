const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labellingstatusesSchema = new Schema({
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers' },
        article: { type: Schema.Types.ObjectId, ref: 'articles' },
        paragraphsEmotionLabel: [{paragraphConsecutiveID: Number, label: String}],
        stanceArticleQuestionLabel: String,
        commentsStanceLabel: [{commentID: String, label: String}],
        commentsEmotionLabel: [{commentID: String, label: String}],
        limitNumberOfComments: Number,
    },
    {
        timestamps: true
    });

const labellingstatuses = mongoose.model("labellingstatuses", labellingstatusesSchema);
module.exports = labellingstatuses;
