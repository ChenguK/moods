const Mood = require("../models/mood");
const Comment = require("../models/comment");



module.exports = {
    show,
    create,
    update,
    // addToPost,
    delCommment
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

// function addToPost(req, res) {
//     let user = req.user;
//     Mood.findOne({
//             "posts._id": req.params.id
//         },
//         function (err, mood) {

//             const post = mood.posts.id(req.params.id);

//         })

// }

function update(req, res) {

}



function delCommment(req, res) {

}