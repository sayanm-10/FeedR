const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const keys = require("./config/keys");
require("./models/User");
require('./services/passport');
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");

// specify MongoDB connection
mongoose.connect(keys.MONGO_URI);

const app = express();

app.use(bodyParser.json());

// use cookie based authentication with passport
app.use(
    cookieSession({
        // 30 days in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// use passport as auth middleware
authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === "production") {
    // serve production assets like main.js, css
    app.use(express.static("client/build"));

    // serve index.html if route is not recognized
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// catch all unused routes in dev
// [MUST BE AFTER ALL ROUTES]
app.get('*', (req, res) => {
    res.status(404).send({error: 'Page not found!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
