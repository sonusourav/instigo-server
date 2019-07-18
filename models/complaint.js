var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title:{type:String,required:true},
  house:{type:Number,required:true},
  date:{type:String,default:null},
  name:{type:String,required:true},
  desc:{type:String,required:true},
 hostel:{type:Number,required:true},
  private:{type:Boolean,required:true},
  related:{type:String,required:true},
  hostelsecy:{type:String,required:true},
  isValid:{type:Boolean,default:false},
  isPending:{type:Boolean,default:false},
  isResolved:{type:Boolean,default:false},
  comments:[{comment:{type:String,default:null},by:{type:String,default:null}}],
  by:{type:String}
});
module.exports = mongoose.model('Complaint',schema);