const Mood = require("../models/mood");

module.exports = {
    index,
    create,
    newPost,
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
    Mood.findById(req.user.body, function (err, mood) {
        if (!mood.user.equals(req.user._id)) return req.redirect('/moods');
        res.render("/moods/edit", {
            mood,
            user: req.user
        });
    });
};

function delPost(req, res) {

};