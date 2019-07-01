const mongoose = require("mongoose");

const verifyEmailSchema = mongoose.Schema({
  userID: { type: String, required: true }
},{collection: 'verifyemails'});

module.exports = mongoose.model("Vemail", verifyEmailSchema);
