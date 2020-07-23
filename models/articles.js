const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        commentID: String,
        articleID: String,
        title: String,
        text: String,
    },
    {
        timestamps: true
    });

const articlesSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        articleID: String,
        title: String,
        snippet: String,
    paragraphs: [{consecutiveID: Number, text: String}],
    comments: [commentsSchema]
    },
    {
        timestamps: true
    });

const articles = mongoose.model("articles", articlesSchema);
module.exports = articles;
