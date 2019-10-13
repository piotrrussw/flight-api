const { Schema, model } = require('mongoose');

const flightSchema = new Schema({
    id: String,
});

module.exports = model('flights', flightSchema);