const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});

const moodSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarURL: String,
    posts: [postSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Mood", moodSchema);