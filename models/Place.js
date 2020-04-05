const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
    name: {
        type: String
    },
    placeId: {
        type: String
    }
});

module.exports = model("places", placeSchema);
