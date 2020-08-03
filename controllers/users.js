const User = require("../models/user");

module.exports = {
    index,
    newPost,
    editPost,
    delPost,
}

function index(req, res) {
    User.find({}, function (err, users) {
        res.render("users/index", {
            users,
            user: req.user
        });
    });
}

function newPost(req, res) {
    req.user.posts.push(req.body);
    req.user.save(function (err) {
        res.redirect("/users");
    });
};

function editPost(req, res) {

};

function delPost(req, res) {

};