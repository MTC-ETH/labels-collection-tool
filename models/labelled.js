const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelledSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers', required: true },
        article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
        paragraphsEmotionLabel: {type: [String], required: true},
        stanceArticleQuestionLabel: {type: String, required: true},
        commentsStanceLabel: {type: [String], required: true},
        commentsEmotionLabel: {type: [String], required: true},
    },
    {
        timestamps: true
    });

const labelled = mongoose.model("labelled", labelledSchema);
module.exports = labelled;
