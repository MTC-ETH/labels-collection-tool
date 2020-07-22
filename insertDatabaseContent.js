const mongoose = require('mongoose');

const uri = 'mongodb://localhost/labelling_tool';
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
                const articlesJson = require(`./json/articles.json`);

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