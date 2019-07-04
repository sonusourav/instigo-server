const mongoose = require("mongoose");

const forgotPasswordSchema = mongoose.Schema({
  userID:  {type: String}
},{collection: 'forgotpassword'});

module.exports = mongoose.model("Fpass", forgotPasswordSchema);
