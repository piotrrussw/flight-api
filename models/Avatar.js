const { Schema, model } = require("mongoose");

const avatarSchema = new Schema({
    userId: {
        type: String
    },
    path: {
        type: String
    },
    title: {
        type: String
    }
});

module.exports = model("avatars", avatarSchema);
