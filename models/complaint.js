var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  requestName:{type:String,required:true},
  houseNo:{type:Number,required:true},
  dateCreated:{type:String,default:null},
  requestorName:{type:String,required:true},
  requestDesc:{type:String,required:true},
 hostelNo:{type:Number,required:true},
  isPrivate:{type:Boolean,required:true},
  isPriority:{type:Boolean},
  related:{type:String,required:true},
  isValid:{type:Boolean,default:false},
  isPending:{type:Boolean,default:false},
  isResolved:{type:Boolean,default:false},
  comments:[{comment:{type:String,default:null},by:{type:String,default:null},email:{type:String,default:null},date:{type:String,default:null}}],
  requestorEmail:{type:String},
  isForwarded:{type:Boolean,default:false},
  isClosed:{type:Boolean,default:false},
  isRejected:{type:Boolean,default:false}
});
module.exports = mongoose.model('Complaint',schema);