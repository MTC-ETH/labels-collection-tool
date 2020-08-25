const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
        articleID: String,
        source: {
            type: String,
            enum : ['blick','nzz'],
        },
        url: String,
        title: String,
        snippet: String,
        stanceQuestion: String,
    paragraphs: [{consecutiveID: Number, text: String}],
    },
    {
        timestamps: true
    });

const articles = mongoose.model("articles", articlesSchema);
module.exports = articles;
