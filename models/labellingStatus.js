const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labellingStatus = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers' },
        article: { type: Schema.Types.ObjectId, ref: 'articles' },
        paragraphsEmotionLabel: [{type: String, default: null}],
        stanceArticleQuestionLabel: String,
        commentsStanceLabel: [{type: String, default: null}],
        commentsEmotionLabel: [{type: String, default: null}],
    },
    {
        timestamps: true
    });

const labellingstatus = mongoose.model("labellingstatus", labellingStatus);
module.exports = labellingstatus;
