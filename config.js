const config = {};

config.commentsPerArticle = 5;

config.baseLink = "https://mtc-emotion-stance.herokuapp.com";

config.interrater = {};

//number of duplicated labels per article and its respective comments
config.interrater.labbellersPerArticle = 3;

//number of articles that will be multi-labelled depending on the labbellersPerArticle value
//set to null in order to multilabel all the articles
config.interrater.multiLabelledArticles = 3;

module.exports = config;