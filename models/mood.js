const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moodSchema = new Schema({
    name: String,
    posts: String,
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Mood", moodSchema);