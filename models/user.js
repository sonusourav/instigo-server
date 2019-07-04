const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
// Create a schema
const userSchema =mongoose.Schema({
  email: { type: String,  lowercase: true, required: true },
  password: { type: String, default: null ,required:true},
  name: { type: String,required:true},
  isEmailVerified: {  type: Boolean,default: false },
   gender: {type:String,default: null},
   branch: {type:String,default:null},
   year:{type:Number,default:null},
  dob: {type: Date, default: null },
  profilePic: { type: String,default: null },
   coverPic: { type: String, default: null},
   hostel: {type:Number,default:null},
   phone:{type:Number,default:null} 
});
// Create a model
module.exports  = mongoose.model("User", userSchema);

// Export the model
