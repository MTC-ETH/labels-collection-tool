const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
        commentID: String,
        articleID: String,
        title: String,
        text: String,
    },
    {
        timestamps: true
    });

const articlesSchema = new Schema({
        articleID: String,
        source: {
            type: String,
            enum : ['blick','nzz'],
        },
        url: String,
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
