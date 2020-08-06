const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moodSchema = new Schema({
    title: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    post: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    // inputFile: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Mood", moodSchema);