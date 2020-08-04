const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatar: String,
    comment: {
        text: String,
    },
    googleId: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);