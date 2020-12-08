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

const {emotionTagSchema, stanceTagSchema} = require("./emotionsStanceTagSchemas");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelledentriesSchema = new Schema({
        labeller: { type: Schema.Types.ObjectId, ref: 'labellers', required: true },
        article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
        firstLabelledEnteredDate: {type: Date, default: null},
        finishedLabellingDate: {type: Date, default: null},
        articleID: String,
        paragraphsEmotionLabel: {type: Map, of: emotionTagSchema},
        paragraphsEmotionLabelHistory: {type: Map, of: {type: [emotionTagSchema], default: []}},
        stanceArticleQuestionsLabel: {type: Map, of: stanceTagSchema},
        stanceArticleQuestionsLabelHistory: {type: Map, of: {type: [stanceTagSchema], default: []}},
        emotionArticleLabel: {type: emotionTagSchema, default: null},
        emotionArticleLabelHistory: {type: [emotionTagSchema], default: []},
        deviceSpecs: {type: {
                osName: String,
                osVersion: String,
                browserName: String,
                browserVersion: String,
                deviceType: String
            },
            default: null}
    },
    {
        timestamps: true
    });

const labelledentries = mongoose.model("labelledentries", labelledentriesSchema);
module.exports = labelledentries;
