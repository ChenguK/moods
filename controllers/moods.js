const Mood = require("../models/mood");
const User = require("../models/user");


module.exports = {
    index,
    create,
    newPost,
    // update,
    // editPost,
    // delPost,
    show
}

function index(req, res) {
    Mood.find({}, function (err, moods) {
        res.render("moods/index", {
            moods,
            user: req.user
        });
    });
}

// function create(req, res) {
//     req.user.posts.push(req.body);
//     req.user.save(function (err) {
//         res.redirect("/moods");
//     });
// }

function create(req, res) {
    const mood = new Mood(req.body);
    // Assign the logged in user's id
    mood.user = req.user._id;
    req.user.moods.push(req.body);
    mood.save(function (err) {

        if (err) return render("/moods/new");
        console.log(mood);
        // Going to moods show page
        res.redirect(`/moods/${mood._id}`);
    });
}

function newPost(req, res) {
    res.render("moods/new", {
        title: "New Mood",
        user: req.body,
    });
};

// **
// function editPost(req, res) {
//     let user = req.user;
//     Mood.findOne({
//         "posts._id": req.params.id,
//     }, function (err, mood) {
//         const post = mood.posts.id(req.params.id);
//         if (!user.equals(req.user._id)) return res.redirect("/moods");
//         res.render("moods/edit", {
//             "moodId": req.params.id,
//             title: "Edit Mood",
//             post,
//             user: req.user
//         });
//     });
// }

// **
// function editPost(req, res) {
//     Mood.findById(req.params.id, function (err, mood) {
//         if (!mood.user.equals(req.user._id)) return res.redirect("/moods");
//         res.render("moods/edit", {
//             mood
//         });

//     });
// }


// function update(req, res) {


// let user = req.user;
// Mood.findOne({
//         "posts._id": req.params.id
//     },
//     function (err, mood) {

//         const post = mood.posts.id(req.params.id);


//     Mood.findByIdAndUpdate(req.params.id, function (err, mood) {
//         if (!user.equals(req.user._id)) return req.redirect("/moods");
//         post.text = req.body.text;
//         mood.save(function (err) {
//             res.redirect(`/moods`);
//         });
//     });
// }


// function delPost(req, res) {


// let user = req.user;
// Mood.findOne({
//         "posts._id": req.params.id
//     },
//     function (err, mood) {
//         const post = mood.posts.id(req.params.id);


//     Mood.findById(req.params.id, function (err, mood) {
//         if (!user.equals(req.user._id)) return res.redirect("/moods");
//         post.remove();
//         mood.save(function (err) {
//             res.redirect("/moods");
//         });
//     });
// }

function show(req, res) {
    let user = req.user;
    Mood.findById(req.params.id, function (err, mood) {
        if (!user._id) return res.redirect("/moods");
        res.render("moods/show", {
            user,
            mood
        })
    })
}