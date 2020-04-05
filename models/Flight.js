const { Schema, model } = require("mongoose");

const flightSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    origin: {
        type: String
    },
    destination: {
        type: String
    },
    dateTime: {
        type: Array
    },
    price: {
        type: Number
    }
});

module.exports = model("flights", flightSchema);
