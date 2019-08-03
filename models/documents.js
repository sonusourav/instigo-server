var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.toLocaleTimeString('en-GB', { hour: "numeric", 
                                             minute: "numeric"});
var schema = new Schema({
  docTitle:{type:String,required:true},
  prof:{type:String,required:true},
  date:{type:String,default:datetime},
  by:{type:String},
  desc:{type:String},
  url:{type:String},
  file:{type:String,required:true},
  type:{type:String},
  path:{type:String}
});
module.exports = mongoose.model('Document',schema);