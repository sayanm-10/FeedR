const express = require("express");
require('./services/passport');
const authRoutes = require("./routes/authRoutes");

const app = express();
// use passport as auth middleware
authRoutes(app);

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
