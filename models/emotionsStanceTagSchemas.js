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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emotionTagSchema = new Schema({
    label: String,
    intensity: Number, //0,1,2 for intensities, invalid for purely factual, null for non entered
    notSure: Boolean,
    enteredAt: Date
});

const stanceTagSchema = new Schema({
    label: String,
    notSure: Boolean,
    enteredAt: Date
});

module.exports = {
    emotionTagSchema,
    stanceTagSchema
};
