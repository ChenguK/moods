const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const Mood = require("../models/mood");
const User = require("../models/user");

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({
            "googleId": profile.id
        }, function (err, user) {
            if (err) return cb(err);
            if (user) {
                return cb(null, user);
            } else {
                // new student, create and add them to our database!!!
                const newUser = new User({
                    name: profile.displayName,
                    emaile: profile.emails[0].value,
                    googleId: profile._id
                })
                newUser.save(function (err) {
                    if (err) return cb(err);
                    return cb(null, newUser);
                })
            }
        })
    }
));
// coatcheck for your coat- the id is your ticket for the coat-carrying around the ticket is much easier. 
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// when making a request, it's like handing over your ticket (id) and getting back your coat (the get/post/put request you're making).
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
})