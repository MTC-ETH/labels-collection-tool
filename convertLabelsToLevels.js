const mongoose = require('mongoose');

const labelledentries = require(`./models/labelledentries`);

// const uri = 'mongodb://localhost/labelling_tool';
const uri = 'mongodb://heroku_wll30t81:u7m90co6idj3qrj24mqcg2u2vi@ds153304.mlab.com:53304/heroku_wll30t81';
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true});

const connection = mongoose.connection;

emotionMap = {
    "ecstasy": {label: "joy", intensity: 2}, "admiration": {label: "trust", intensity: 2}, "terror": {label: "fear", intensity: 2}, "vigilance": {label: "anticipation", intensity: 2},
    "joy": {label: "joy", intensity: 1}, "trust": {label: "trust", intensity: 1}, "fear": {label: "fear", intensity: 1}, "anticipation": {label: "anticipation", intensity: 1},
    "serenity": {label: "joy", intensity: 0}, "acceptance": {label: "trust", intensity: 0}, "apprehension": {label: "fear", intensity: 0}, "interest": {label: "anticipation", intensity: 0},
    "grief": {label: "sadness", intensity: 2}, "loathing": {label: "disgust", intensity: 2}, "rage": {label: "anger", intensity: 2}, "amazement": {label: "surprise", intensity: 2},
    "sadness": {label: "sadness", intensity: 1}, "disgust": {label: "disgust", intensity: 1}, "anger": {label: "anger", intensity: 1}, "surprise": {label: "surprise", intensity: 1},
    "pensiveness": {label: "sadness", intensity: 0}, "boredom": {label: "disgust", intensity: 0}, "annoyance": {label: "anger", intensity: 0}, "distraction": {label: "surprise", intensity: 0}
};

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");

    labelledentries.find( {}).exec().then(docs => {docs.forEach(
        (doc) => {
            doc.firstLabelledEnteredDate = null;
            doc.finishedLabellingDate = null;
            doc.paragraphsEmotionLabel = doc.paragraphsEmotionLabel.map(entry => {return {
                paragraphConsecutiveID: entry.paragraphConsecutiveID,
                label: emotionMap[entry.label].label,
                intensity: emotionMap[entry.label].intensity
            }});
            doc.commentsEmotionLabel = doc.commentsEmotionLabel.map(entry => {return {
                commentID: entry.commentID,
                label: emotionMap[entry.label].label,
                intensity: emotionMap[entry.label].intensity
            }});
            doc.save();
        })
    }
    ).then(() => console.log("converted successfully"))
        .catch(err => console.log(err));
});