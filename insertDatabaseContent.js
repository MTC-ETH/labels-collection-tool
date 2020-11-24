const mongoose = require('mongoose');
require('dotenv').config();

const config = require( "./config");

// const uri = 'mongodb://localhost/labelling_tool';
// const uri = 'mongodb://heroku_wll30t81:u7m90co6idj3qrj24mqcg2u2vi@ds153304.mlab.com:53304/heroku_wll30t81';
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;

let articlesJson = require(`./json/articles_for_test_1_full_text_more_test_stance_questions`);

//insert consecutive ids for paragraphs
articlesJson = articlesJson
    .map(article => {
        article.paragraphs = article.paragraphs.map((par, index) => {
            return {consecutiveID: index, text: par};
        });

        if(!article.stanceQuestions) {
            article.stanceQuestions = [{"ID": -1, text: "Is the article in favour or against the topic it is talking about?"}]
        }

        return article;
    });

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");

    const articles = require(`./models/articles`);
    const labellers = require(`./models/labellers`);

    console.log("Creating database");
    connection.db.listCollections({name: 'articles'})
        .next(function(err, collinfo) {
            console.log("Collection articles");
            if (collinfo) {
                console.log("already exists, updating instead");
                // articles.find({}).exec((err, res) => console.log(JSON.stringify(res)));
                const allPromises = [];
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

    const addAlsoLabellers = true;
    if(addAlsoLabellers) {
        connection.db.listCollections({name: 'labellers'})
            .next(function(err, collinfo) {
                console.log("Collection articles");
                if (collinfo) {
                    console.log("labellers already exists");
                } else {
                    console.log("labellers doesn't exist, attempting to create it");

                    try {
                        const labellersJson = require(`./json/labellers`);
                        labellers.insertMany(labellersJson, function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("SUCCESS, inserted " + labellersJson.length + " labellers");
                            }
                        });
                    } catch (ex) {
                        console.log("Cannot find file ./json/labellers.json, no labellers were added");
                    }
                }
            });
    }
});