var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
  name:{type:String},
  branch:{type:String},
  code:{type:String},
  id:{type:Number},
  documents:[{type: mongoose.Schema.Types.ObjectId, ref: "Document"}]
});
module.exports = mongoose.model('Course',schema);