const mongoose = require('mongoose');

const config = require( "./config");

// const uri = 'mongodb://localhost/labelling_tool';
const uri = 'mongodb://heroku_wll30t81:u7m90co6idj3qrj24mqcg2u2vi@ds153304.mlab.com:53304/heroku_wll30t81';
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let articlesJson = require(`./json/articles`);

//insert consecutive ids for paragraphs
articlesJson = articlesJson
    .filter(article => article.comments.length >= config.commentsPerArticle)
    .map(article => {
        article.paragraphs = article.paragraphs.map((par, index) => {
            return {consecutiveID: index, text: par};
        });

        if(!article.stanceQuestion) {
            article.stanceQuestion = "Is the article in favour or against the topic it's talking about?"
        }

        //comments are shuffled at insertion time
        shuffleArray(article.comments);
        return article;
    });

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");

    const articles = require(`./models/articles`);


    console.log("Creating database");
    connection.db.listCollections({name: 'articles'})
        .next(function(err, collinfo) {
            console.log("Collection articles");
            if (collinfo) {
                console.log("already exists, updating instead");
                // articles.find({}).exec((err, res) => console.log(JSON.stringify(res)));
                const allPromises = []
                articlesJson.forEach(art => {
                    allPromises.push(articles.findOneAndUpdate({articleID: art.articleID}, art).exec());
                });
                Promise.all(allPromises)
                    .then(() => console.log("Updated succesfully"))
                    .catch(err => console.log(err));
            } else {
                console.log("doesn't exist, creating it");

                articles.insertMany(articlesJson, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("SUCCESS, inserted " + articlesJson.length + " articles");
                    }
                });
            }
        });
});