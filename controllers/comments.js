const Mood = require("../models/mood");
const Comment = require("../models/comment");



module.exports = {
    show,
    create,
    delComment
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
    } catch (error) {
        console.log(error);
    } finally {
        res.redirect(`/moods/${req.params.id}`);
    }
    // let user = req.user;
    // Update req.body to contain user info

    // req.body.userId = req.user._id;
    // // req.body.userName = req.user.name;
    // req.body.moodId = req.params.id;
    // req.body.comment = req.body.comment;
    // Find the comment
    // Mood.findById(req.params.id, (function (err, mood) {
    //     // Make the comment and then save it.
    //     const comment = new Comment(req.body);
    //     comment.save(function (err) {
    //         // save this comments Id to your own model
    //         // mood.comments.push(comment._id);
    //         mood.save(function (err) {
    // if (err) return res.redirect(`/moods/${req.params.id}`)

    // res.redirect(`/moods/${req.params.id}`);
    // })

    // })
    // }));
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
        // console.log(mood);
        if (err) return res.redirect("/moods");

        res.render("moods/show", {
            user,
            mood,
            comments: mood.comments
        });
    });
}


async function delComment(req, res) {
    var user = req.user;
    try {
        const comment = await Comment.findById(req.params.id);
        console.log(user._id, comment.userId);
        if (comment.userId === req.user._id) {
            await comment.remove();
            console.log(comment.$isDeleted());
        }
        res.redirect(`/moods/${comment.moodId}`);
    } catch (error) {
        console.log(error);
    }
    // query on the property of the comment
    // Mood.findOne({
    //         "mood.comments._id": req.params.id
    //     }, console.log(mood);
    //     function (err, mood) {
    // Find the comment subdoc using the id method on Mongoose arrays
    //     const commentSubdoc = Comment.findOne({
    //         "comments._id": req.params.id
    //     });
    //     console.log(commentSubdoc);
    //     // Ensure that the comment was created by the logged in user
    //     if (!Comment.userId === (req.user._id)) return res.redirect(`/moods/${mood._id}`);
    //     console.log("req.params.id ", req.params.id)
    //     console.log("comments._id", commentSubdoc.comments);
    //     // Remove the comment using the remove method of the subdoc
    //     commentSubdoc.remove();
    //     // mood.save(function (err) {
    //     res.redirect(`/moods/${mood._id}`);
    //     // })
    //     // });
};