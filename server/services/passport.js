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

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);

    // first argument of done is the error object
    done(null, user);
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
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            //such an user already exists
            if (existingUser) {
                done(null, existingUser);
            }

            // such an user doesn't exist
            const user = new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
);