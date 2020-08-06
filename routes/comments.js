const router = require("express").Router();
const commentsCtrl = require("../controllers/comments");

router.post("/moods/:id/comments", isLoggedIn, commentsCtrl.create);
router.get("/moods/:id", isLoggedIn, commentsCtrl.show);
// router.post("/moods/:id", isLoggedIn, commentsCtrl.create);
router.delete("/moods/:id", isLoggedIn, commentsCtrl.delComment);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;