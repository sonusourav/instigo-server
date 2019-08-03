var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
  courseName:{type:String},
  branch:{type:String},
  courseCode:{type:String},
  documents:[{type: mongoose.Schema.Types.ObjectId, ref: "Document"}]
});
module.exports = mongoose.model('Course',schema);