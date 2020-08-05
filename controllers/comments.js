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
    // Add the comment
    mood.comments.push(req.body);
    console.log(req.body);
    mood.save(function (err) {
        console.log("error is" + err);
        res.redirect(`/moods/${mood._id}`,
            user = req.user,
            moods,
            comments,
        );

    })
};

function show(req, res) {
    let user = req.user;
    Mood.findById(req.params.id, function (err, mood) {
        if (!user._id) return res.redirect("/moods");
        res.render("moods/show", {
            user,
            mood,
            comments
        })
    })
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