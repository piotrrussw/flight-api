const { Schema, model } = require("mongoose");

const airportSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true
  },
  PlaceId: {
    type: String
  },
  PlaceName: {
    type: String
  },
  CountryId: {
    type: String
  },
  RegionId: {
    type: String
  },
  CityId: {
    type: String
  },
  CountryName: {
    type: String
  }
});

module.exports = model("airports", airportSchema);
