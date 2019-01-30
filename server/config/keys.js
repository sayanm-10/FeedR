if (process.env.NODE_ENV === "production") { // this env variable is set by Heroku
    // return prod keys
    module.exports = require("./prod");
} else {
    // return dev keys
    module.exports = require("./dev");
}