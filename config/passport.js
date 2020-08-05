const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const Mood = require('../models/mood');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    function (accessToken, refreshToken, profile, cb) {
        Mood.findOne({
            "googleId": profile.id
        }, function (err, mood) {
            if (err) return cb(err);
            if (mood) {
                return cb(null, mood);
            } else {
                // new student, create and add them to our database!!!
                const newMood = new Mood({
                    name: profile.displayName,
                    // email: profile.emails[0].value,
                    googleId: profile._id
                })
                newMood.save(function (err) {
                    if (err) return cb(err);
                    return cb(null, newMood);
                })
            }
        })
    }
));
// coatcheck for your coat- the id is your ticket for the coat-carrying around the ticket is much easier. 
passport.serializeUser(function (mood, done) {
    done(null, mood.id);
});

// when making a request, it's like handing over your ticket (id) and getting back your coat (the get/post/put request you're making).
passport.deserializeUser(function (id, done) {
    Mood.findById(id, function (err, mood) {
        done(err, mood);
    })
})