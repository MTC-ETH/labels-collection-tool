// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

const fs = require('fs');
let path = '.env';
try {
    if (!fs.existsSync(path)) {
        path = "../.env"
    }
} catch(err) {
    console.error(err);
}

require('dotenv').config({path: path});

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || "mongodb://localhost/labelling_tool";

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;

let articlesJson = require(`../json/articles_examples`);

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

    const articles = require(`../models/articles`);

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

    const addAlsoLabellers = false;
    if(addAlsoLabellers) {
        const {getCorrectLabellersSchema} = require("../routes/utils");
        const labellers = getCorrectLabellersSchema();
        connection.db.listCollections({name: 'labellers'})
            .next(function(err, collinfo) {
                console.log("Collection articles");
                if (collinfo) {
                    console.log("labellers already exists");
                } else {
                    console.log("labellers doesn't exist, attempting to create it");

                    try {
                        const labellersJson = require(`../json/labellers`);
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