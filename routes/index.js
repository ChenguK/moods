const router = require("express").Router();
const passport = require("passport");

router.get("/", function (req, res) {
    res.render("index");
});

router.get('/oauth2callback', passport.authenticate(
    'google', {
        successRedirect: '/users',
        failureRedirect: '/'
    }
));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;