var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var currentDate = new Date();
// var date = currentDate.getDate();
// var month = currentDate.getMonth(); //Be careful! January is 0 not 1
// var year = currentDate.getFullYear();
// var dateString = date + "-" +(month + 1) + "-" + year;
var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.toLocaleTimeString('en-GB', { hour: "numeric", 
                                             minute: "numeric"});
var schema = new Schema({
	date:{ type:String,default: datetime, required: true },
	day:{type:String,default:"Sunday"},
	part:{type:String,default:"Breakfast"},
	desc:{type:String},
	title:{type:String,required:true},
	username:{type:String},
	url:{type:String},
	ratings:{type:Number,default:0}
});
module.exports = mongoose.model('Feedback',schema);