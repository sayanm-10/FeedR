const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

// Passport should use a new instance of Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.GOOGLE_CLIENT_ID,
            clientSecret: keys.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("Access Token:", accessToken);
            console.log("Refresh Token:", refreshToken);
            console.log("Profile:", profile);
            console.log("Done! ", done);
        }
    )
);