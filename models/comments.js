const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        text: String,
    },
    // moodsId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Mood"
    // },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);