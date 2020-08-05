const router = require("express").Router();
const moodsCtrl = require("../controllers/moods");


router.get("/moods", moodsCtrl.index);
router.get("/moods/new", isLoggedIn, moodsCtrl.newPost);
router.post("/moods", isLoggedIn, moodsCtrl.create);
router.get("/moods/:id", isLoggedIn, moodsCtrl.show);
router.get("/moods/:id/edit", isLoggedIn, moodsCtrl.editPost);
router.put("/moods/:id", isLoggedIn, moodsCtrl.update);
router.delete("/moods/:id", isLoggedIn, moodsCtrl.delPost);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

module.exports = router;