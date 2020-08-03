const Mood = require("../models/mood");

module.exports = {
    index,
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

function newPost(req, res) {
    req.user.posts.push(req.body);
    req.user.save(function (err) {
        res.redirect("/moods");
    });
};

function editPost(req, res) {


};

function delPost(req, res) {

};