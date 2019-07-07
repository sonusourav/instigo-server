var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.toLocaleTimeString('en-GB', { hour: "numeric", 
                                             minute: "numeric"});
var schema = new Schema({
  title:{type:String,required:true},
  house:{type:Number,required:true},
  date:{type:String,default:datetime},
  name:{type:String,required:true},
  desc:{type:String,required:true},
 hostel:{type:Number,required:true},
  private:{type:Boolean,required:true},
  related:{type:String,required:true}
});
module.exports = mongoose.model('Complaint',schema);