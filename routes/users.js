const router = require("express").Router();
const usersCtrl = require("../controllers/users");

router.get('/moods', usersCtrl.index);
router.get("/moods/new", isLoggedIn, usersCtrl.newPost);
router.post("/moods", isLoggedIn, usersCtrl.create);
router.get("/moods/:id", isLoggedIn, usersCtrl.show);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;