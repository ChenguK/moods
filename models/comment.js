const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
    },
    moodId: {
        type: Schema.Types.ObjectId,
        ref: "Mood"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);