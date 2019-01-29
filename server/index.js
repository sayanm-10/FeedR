const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/User");
require('./services/passport');
const authRoutes = require("./routes/authRoutes");


// specify MongoDB connection
mongoose.connect(keys.MONGO_URI);

const app = express();
// use passport as auth middleware
authRoutes(app);

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
