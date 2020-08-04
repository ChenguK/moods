const Mood = require("../models/mood");
// const {
//     post
// } = require("../routes");

module.exports = {
    index,
    create,
    newPost,
    update,
    editPost,
    delPost,
}

function index(req, res) {
    Mood.find({}, function (err, moods) {
        res.render("moods/index", {
            moods,
            user: req.user
        });
    });
}

function create(req, res) {
    req.user.posts.push(req.body);
    req.user.save(function (err) {
        res.redirect("/moods");
    });
}

function newPost(req, res) {
    res.render("moods/new", {
        title: "New Mood",
        user: req.user
    });
};

function editPost(req, res) {
    let user = req.user;
    Mood.findOne({
        "posts._id": req.params.id,
    }, function (err, mood) {
        const post = mood.posts.id(req.params.id);
        if (!user.equals(req.user._id)) return res.redirect("/moods");
        res.render("moods/edit", {
            "moodId": req.params.id,
            title: "Edit Mood",
            post,
            user: req.user
        });
    });
}

function update(req, res) {
    let user = req.user;
    Mood.findOne({
            "posts._id": req.params.id
        },
        function (err, mood) {

            const post = mood.posts.id(req.params.id);
            if (!user.equals(req.user._id)) return req.redirect("/moods");
            post.text = req.body.text;
            mood.save(function (err) {
                res.redirect(`/moods`);
            });
        });
}

function delPost(req, res) {
    let user = req.user;
    Mood.findOne({
            "posts._id": req.params.id
        },
        function (err, mood) {
            const post = mood.posts.id(req.params.id);
            if (!user.equals(req.user._id)) return req.redirect("/moods");
            post.remove();
            // console.log(post);
            mood.save(function (err) {
                res.redirect("/moods");
            });
        });
}