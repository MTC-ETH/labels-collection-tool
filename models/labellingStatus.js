const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labellingStatus = new Schema({
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers' },
        article: { type: Schema.Types.ObjectId, ref: 'articles' },
        paragraphsEmotionLabel: [{paragraphConsecutiveID: Number, label: String}],
        stanceArticleQuestionLabel: String,
        commentsStanceLabel: [{commentID: String, label: String}],
        commentsEmotionLabel: [{commentID: String, label: String}],
    },
    {
        timestamps: true
    });

const labellingstatus = mongoose.model("labellingstatus", labellingStatus);
module.exports = labellingstatus;
