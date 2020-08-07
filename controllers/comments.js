const Mood = require("../models/mood");
const Comment = require("../models/comment");



module.exports = {
    show,
    create,
};


async function create(req, res) {
    try {
        const data = {
            comment: req.body.comment,
            userId: req.user._id,
            moodId: req.params.id
        }
        const comment = await Comment.create(data);
        const mood = await Mood.findById(data.moodId);
        mood.comments.push(comment._id);
        await mood.save();
    } catch (error) {} finally {
        res.redirect(`/moods/${req.params.id}`);
    }
}

function show(req, res) {
    let user = req.user;
    if (!user) return res.redirect("/moods");
    Mood.findById(req.params.id).populate({
        path: "comments",
        populate: {
            path: "userId"
        }
    }).exec(function (err, mood) {
        if (err) return res.redirect("/moods");

        res.render("moods/show", {
            user,
            mood,
            comments: mood.comments
        });
    });
}