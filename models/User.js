const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: String,
    googleId: String,
    accessToken: String,
    name: String,
    age: Number,
});

module.exports = model('users', userSchema);