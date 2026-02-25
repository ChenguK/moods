const User = require("../models/user");
const Mood = require("../models/mood");
const user = require("../models/user");

module.exports = {
    index,
    newPost,
    new: newMood,
    show,
    editMood,
    update,
}

function index(req, res) {
    User.find({}, function (err, users) {
        res.render("moods/index", {
            Mood,
            user: req.user,
            users,

        })
    })
}

function newPost(req, res) {
    var users = user.name;
    var mood = req.mood;

    res.render("moods/new", {
        title: "New Mood",
        mood,
        user: user.name,
        users
    });
};

function newMood(req, res) {
    var user = req.user;
    const mood = new Mood(req.body);
    // Assign the logged in user's id
    mood.user = req.user._id;
    mood.save(function (err) {
        if (err) return render("/moods/new");
        // Going to moods show page
        res.redirect(`/moods/${mood._id}`, {
            user: req.user,
            mood
        });
    });
}

function show(req, res) {
    let user = req.user;

    Mood.findById(req.params.id, function (err, mood) {
        if (!user._id) return res.redirect("/moods");

        res.render("moods/show", {
            user,
            user: req.user,
            mood
        })
    })
}

function editMood(req, res) {
    var user = req.user;
    Mood.findById(req.params.id, function (err, mood) {
        if (!mood.userId.equals(req.user._id)) return res.redirect("/moods");
        res.render("moods/edit", {
            mood
        });

    });
}

function update(req, res) {
    Mood.findById(req.params.id, function (err, mood) {
        if (!user.equals(req.user._id)) return req.redirect("/moods");
        mood.post = req.body.text;
        mood.save(function (err) {
            res.redirect(`/moods`), {
                user: req.user,
                mood
            };
        });
    });
}