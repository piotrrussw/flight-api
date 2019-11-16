const { Schema, model } = require("mongoose");

const flightSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true
}
});

module.exports = model("flights", flightSchema);
