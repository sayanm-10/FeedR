const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    // This id is not the Google ID,
    // It is the identifier for this record
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        // first argument of done is the error object
        done(null, user);
    });
});

// Passport should use a new instance of Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.GOOGLE_CLIENT_ID,
            clientSecret: keys.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true // trust proxies
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then(existingUser => {
                    if (existingUser) {
                        //such an user already exists
                        done(null, existingUser);
                    } else {
                        // such an user doesn't exist
                        new User({ googleId: profile.id }).save()
                            .then(user => done(null, user));
                    }
                });
        }
    )
);