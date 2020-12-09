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

const config = {};

//Map containing all the information relative to having more than one labeller label the same entity (article)
config.interrater = {};

//number of duplicated labels (or labellers) per article and its respective comments
config.interrater.labbellersPerArticle = 5;

//number of articles that will be multi-labelled depending on the labbellersPerArticle value
//set to null in order to multilabel all the articles
config.interrater.multiLabelledArticles = null;

//How much money is each labeller paid per article
config.moneyPerArticle = 3.00;

//List of emotions
config.emotionsWithFactual = ["Freude", "Vertrauen", "Angst", "Antizipation", "Traurigkeit", "Ekel", "Ärger", "Überraschung", "sachlich"];
// List of emotion intensities
config.emotionIntensities = [0,1,2];
//list of labels for stance
config.stanceLabels = ["Ja, dafür", "Diskutierend", "Nein, gegen", "Kein Bezug"];

//--------------------------
module.exports = config;