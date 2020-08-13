const articles = require(`../models/articles`);
const labelledentries = require(`../models/labelledentries`);
const labellers = require(`../models/labellers`);
const labellingstatuses = require(`../models/labellingstatuses`);


function getAllData() {
    const queryPromises = [];
    queryPromises.push(articles.find({}, {articleID: 1}).then(results => {
        return {articles: results}
    }));
    queryPromises.push(labelledentries.find({}).then(results => {
        return {labelledentries: results}
    }));
    queryPromises.push(labellers.find({}).then(results => {
        return {labellers: results}
    }));
    queryPromises.push(labellingstatuses.find({}).then(results => {
        return {labellingstatuses: results}
    }));

    return Promise.all(queryPromises)
        .then(arrOfObjects => Object.assign({}, ...arrOfObjects)); //just flattens the objects
}

function millisecToString(millisec) {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours !== "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}


module.exports.getAllData = getAllData;
module.exports.millisecToString = millisecToString;
