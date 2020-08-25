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
