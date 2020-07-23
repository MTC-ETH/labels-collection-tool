const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labellersSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        surname: String,
        email: String,
        affiliation: String,
    },
    {
        timestamps: true
    });

const labellers = mongoose.model("labellers", labellersSchema);
module.exports = labellers;
