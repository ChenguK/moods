const router = require('express').Router();
const moodsCtrl = require('../controllers/moods');


router.get("/moods", moodsCtrl.index);
router.get("/new", isLoggedIn, moodsCtrl.newPost);
router.get("/edit", isLoggedIn, moodsCtrl.editPost);
router.post("/posts", isLoggedIn, moodsCtrl.create);
router.put("/posts/:id", isLoggedIn, moodsCtrl.editPost);
router.delete("/posts/:id", isLoggedIn, moodsCtrl.delPost);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;