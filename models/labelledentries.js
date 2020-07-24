const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelledentriesSchema = new Schema({
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers', required: true },
        article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
        paragraphsEmotionLabel: [{paragraphConsecutiveID: Number, label: String}],
        stanceArticleQuestionLabel: String,
        commentsStanceLabel: [{commentID: String, label: String}],
        commentsEmotionLabel: [{commentID: String, label: String}],
    },
    {
        timestamps: true
    });

const labelledentries = mongoose.model("labelledentries", labelledentriesSchema);
module.exports = labelledentries;
