const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labellersSchema = new Schema({
        name: String,
        surname: String,
        email: String,
        affiliation: String,
        confirmedEmail: {type: Boolean, default: false}
    },
    {
        timestamps: true
    });

const labellers = mongoose.model("labellers", labellersSchema);
module.exports = labellers;
