const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

const keys = require("./config/keys");
require("./models/User");
require('./services/passport');
const authRoutes = require("./routes/authRoutes");


// specify MongoDB connection
mongoose.connect(keys.MONGO_URI);

const app = express();

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


// catch all unused routes
// [MUST BE AFTER ALL ROUTES]
// app.get('*', (req, res) => {
//     res.send({error: '404'});
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
