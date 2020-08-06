const Mood = require("../models/mood");
const Comment = require("../models/comment");



module.exports = {
    show,
    create,
    // addToPost,
    delComment
};


function create(req, res) {
    // let user = req.user;
    // Update req.body to contain user info
    req.body.userId = req.user._id;
    // req.body.userName = req.user.name;
    req.body.moodId = req.params.id;
    req.body.comment = req.body.comment;
    // Find the comment
    Mood.findById(req.params.id, (function (err, mood) {
        // Make the comment and then save it.
        const comment = new Comment(req.body);
        comment.save(function (err) {
            // save this comments Id to your own model
            mood.comments.push(comment._id);
            mood.save(function (err) {
                if (err) return res.redirect(`/moods/${req.params.id}`)

                res.redirect(`/moods/${req.params.id}`);
            })

        })
    }));
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
        console.log(mood);
        if (err) return res.redirect("/moods");

        res.render("moods/show", {
            user,
            mood,
            comments: mood.comments
        });
    });
}


function delComment(req, res) {
    var user = req.user;
    // query on the property of the comment
    Mood.findOne({
        "comments._id": req.params.id
    }, function (err, mood) {
        // Find the comment subdoc using the id method on Mongoose arrays
        const comment = mood.comments.id(req.params.id);
        // Ensure that the comment was created by the logged in user
        if (!comment.user.equals(req.user._id)) return res.redirect(`/moods/${mood._id}`);
        // Remove the comment using the remove method of the subdoc
        comment.remove();
        mood.save(function (err) {
            res.redirect(`/moods/${mood._id}`);
        })
    });
};