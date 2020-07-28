const mongoose = require('mongoose');

// const uri = 'mongodb://localhost/labelling_tool';
const uri = 'mongodb://heroku_wll30t81:u7m90co6idj3qrj24mqcg2u2vi@ds153304.mlab.com:53304/heroku_wll30t81';
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;


connection.once("open", () => {
    console.log("MongoDB database connection established successfully");

    console.log("Creating database");
    connection.db.listCollections({name: 'articles'})
        .next(function(err, collinfo) {
            console.log("Collection articles");
            const articles = require(`./models/articles`);
            if (collinfo) {
                console.log("already exists, content");
                articles.find({}).exec((err, res) => console.log(JSON.stringify(res)));
            } else {
                console.log("doesn't exist, creating it");
                let articlesJson = require(`./json/articles.json`);

                //insert consecutive ids for paragraphs
                articlesJson = articlesJson.map(article => {
                    article.paragraphs = article.paragraphs.map((par, index) => {
                        return {consecutiveID: index, text: par};
                    });
                    return article;
                });

                articles.insertMany(articlesJson, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("SUCCESS");
                    }
                });
            }
        });
});