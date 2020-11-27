const config = {};

config.baseLink = "https://experiment.mtc.ethz.ch";

config.interrater = {};

//number of duplicated labels per article and its respective comments
config.interrater.labbellersPerArticle = 5;

//number of articles that will be multi-labelled depending on the labbellersPerArticle value
//set to null in order to multilabel all the articles
config.interrater.multiLabelledArticles = null;

config.moneyPerArticle = 3.00;

config.emotionsWithFactual = ["Freude", "Vertrauen", "Angst", "Antizipation", "Traurigkeit", "Ekel", "Ärger", "Überraschung", "sachlich"];
config.emotionIntensities = [0,1,2];
config.stanceLabels = ["Ja, dafür", "Diskutierend", "Nein, gegen", "Kein Bezug"];
module.exports = config;