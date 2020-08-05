const Mood = require("../models/mood");
const Comment = require("../models/comment");



module.exports = {
    index,
    create,
    newPost,
    update,
    editPost,
    delPost,
    show
}

function index(req, res) {
    Mood.find({}).populate("user").exec(function (err, moods) {
        res.render("moods/index", {
            moods,
            user: req.user
        });
    });
}

function create(req, res) {
    const mood = new Mood(req.body);
    // Assign the logged in user's id
    mood.user.push(req.user._id);
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
        user: req.user,
    });
};

function editPost(req, res) {
    var user = req.user;
    Mood.findById(req.params.id, function (err, mood) {
        if (!user.equals(req.user._id)) return res.redirect("/moods");
        res.render("moods/edit", {
            mood,
            user: req.user
        });

    });
}


function update(req, res) {
    Mood.findById(req.params.id, function (err, mood) {
        var user = req.user;
        if (!user.equals(req.user._id)) return req.redirect("/moods");
        mood.post = req.body.text;
        mood.save(function (err) {
            res.redirect(`/moods`);
        });
    });
}


function delPost(req, res) {
    var user = req.user;
    Mood.findById(req.params.id, function (err, mood) {
        if (!user.equals(req.user._id)) return res.redirect("/moods");
        mood.remove();
        mood.save(function (err) {
            res.redirect("/moods");
        });
    });
}

function show(req, res) {
    let user = req.user;
    Mood.findById(req.params.id, function (err, mood) {
        if (!user._id) return res.redirect("/moods");
        res.render("moods/show", {
            user,
            mood,
            comments: mood.comments
        })
    })
}