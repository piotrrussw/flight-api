const { Schema, model } = require("mongoose");

const flightSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true
  },
  Quotes: [
    {
      quote: {
        type: Object
      }
    }
  ],
  Places: [
    {
      place: {
        type: Object
      }
    }
  ],
  Carriers: [
    {
      carrier: {
        type: Object
      }
    }
  ],
  Currencies: [
    {
      currency: {
        type: Object
      }
    }
  ]
});

module.exports = model("flights", flightSchema);
