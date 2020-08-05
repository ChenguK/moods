const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    avatarURL: String,
    googleId: String,
}, {
    timestamps: true,
});

module.exports = mongooose.model("User", userSchema);