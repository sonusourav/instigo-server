var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  requestName:{type:String,required:true},
  requsetId:{type:String},
  houseNo:{type:Number,required:true},
  dateCreated:{type:String,default:null},
  requestorName:{type:String,required:true},
  requestorUrl:{type:String},
  requestDesc:{type:String,required:true},
  hostelNo:{type:Number,required:true},
  isPrivate:{type:Boolean,required:true},
  isPriority:{type:Boolean},
  related:{type:String,required:true},
  comments:[{comment:{type:String,default:null},by:{type:String,default:null},email:{type:String,default:null},url:{type:String,default:null},date:{type:String,default:null}}],
  requestorEmail:{type:String},
  status:{type:Number}
});
module.exports = mongoose.model('Complaint',schema);