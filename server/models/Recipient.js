const mongoose = require("mongoose");
const { Schema } = mongoose;

const reciepientSchema = Schema({
    email: String,
    responded: { type: Boolean, default: false}
});

module.exports = reciepientSchema;