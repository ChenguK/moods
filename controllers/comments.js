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
    let user = req.user;

    // const post = mood.posts.id(req.params.id);
    // Update req.body to contain user info
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    req.body.mood = req.params.id;
    // Add the comment
    Comment.create(req.body, function (err, comments) {
        // mood.comments.push(req.body);
        // mood.save(function (err) {
        if (err) return res.redirect(`/moods/${req.params.id}`)
        console.log("error is" + err);
        res.redirect(`/moods/${req.params.id}`, {
            user: req.user,
            // moods,
            // comments: mood.comments
        });

    })
};

function show(req, res) {
    let user = req.user;
    Comment.find({}).req.params.id.populate("moods").exec(function (err, comments) {
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