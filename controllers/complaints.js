const User = require('../models/user');
const Complaint = require('../models/complaint');
const Student = require('../Student Council/models/pro');
const complaintEmail = require('./complaintEmail'); 
module.exports = {
	getcomplaints:async(req,res,next) =>{
	Complaint.find({private:false}).then(complaints =>{
		console.log(complaints);
    // res.status(200).json({menu: complaints}); 
    res.send(complaints);
	});
},
postcomplaints :async(req,res,next) =>{
	if (!req.session.user) {
    res.json({message : "failure_Not Authorized"});}
	 else{const complaint = new Complaint({ 
		house:req.body.house,
		desc:req.body.desc,
		name:req.body.name,
		hostel:req.body.hostel,
		title:req.body.title,
		private:req.body.private,
		related:req.body.related,
		hostelsecy:req.body.hostelsecy
    });
	 complaint.save().then(result=>{
	 	User.findOne({"email":req.session.user.email}).then(user =>{
	 		user.mycomplaints.push(complaint._id);
	 		user.save();
	 	});
	 	Student.findOne({"name":complaint.hostelsecy}).then(secy =>{
	 		 return complaintEmail.complaintemail(req,res,next);
	 	})
	 	if(result)res.status(200).json({message:"success"});
	 	else{res.status(400).json({message:"failure_err in posting feedback"})}
	 });
	}  
}
}