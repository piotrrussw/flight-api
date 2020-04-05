const { Schema, model } = require("mongoose");

const capitalSchema = new Schema({
    name: {
        type: String
    },
    capital: {
        type: String
    }
});

module.exports = model("capitals", capitalSchema);
