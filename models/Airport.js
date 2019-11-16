const { Schema, model } = require("mongoose");

const airportSchema = new Schema({
  userId: {
      type: String,
      required: true,
      trim: true
  }
});

module.exports = model("airports", airportSchema);
