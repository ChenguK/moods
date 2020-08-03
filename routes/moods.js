const router = require('express').Router();
const moodsCtrl = require('../controllers/moods');


router.get("/moods", moodsCtrl.index);

router.post("/posts", isLoggedIn, moodsCtrl.newPost);

router.put("/posts/:id", isLoggedIn, moodsCtrl.editPost);

router.delete("/posts/:id", isLoggedIn, moodsCtrl.delPost);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;