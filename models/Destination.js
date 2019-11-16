const { Schema, model } = require("mongoose");

const destinationSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = model("destinations", destinationSchema);
