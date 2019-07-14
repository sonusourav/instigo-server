const User = require('../models/user');
const Complaint = require('../models/complaint');
const Student = require('../Student Council/models/pro');
const complaintEmail = require('./complaintEmail'); 
const decode = require('jwt-decode');
const warden = require('./warden.js');
module.exports = {
	getcomplaints:async(req,res,next) =>{
	Complaint.find({private:false}).then(complaints =>{
		console.log(complaints);
    // res.status(200).json({menu: complaints}); 
    res.send(complaints);
	});
},
mycomplaints:async(req,res,next) =>{
	var tok = decode(req.params.id);
	User.findById(tok.id).populate('mycomplaints').then(user =>{

		console.log(user.mycomplaints);
    // res.status(200).json({menu: complaints}); 
    res.send(user.mycomplaints);
	});
},
postcomplaints :async(req,res,next) =>{
	// if (!req.session.user) {
 //    res.json({message : "failure_Not Authorized"});}
 var tok = decode(req.params.id);
	const complaint = new Complaint({ 
		house:req.body.house,
		desc:req.body.desc,
		name:req.body.name,
		hostel:req.body.hostel,
		title:req.body.title,
		private:req.body.private,
		related:req.body.related,
		hostelsecy:req.body.hostelsecy,
		by:tok.email
    });
	 complaint.save().then(result=>{
	 	
	 	User.findOne({"_id":tok.id}).then(user =>{
	 		user.mycomplaints.push(complaint._id);
	 		user.save();
	 	});
	 	Student.findOne({"name":complaint.hostelsecy}).then(secy =>{
	 				req.userID = secy.email;
	 				console.log(secy.email);
	 		 return complaintEmail.complaintemail(req,res,next);
	 	}).catch(err=>{
	 		res.status(200).json({message:"Secy Not Found!"});
	 	});
	 	// if(result)res.status(200).json({message:"success"});
	 	// else{res.status(200).json({message:"failure_err in posting feedback"})}
	 });  
},
	validcomplaints: async(req,res,next) =>{
			Complaint.findOne({'_id':req.params.id}).then(complaint =>{
							complaint.isValid = true;
							const commen = { 
								comment:req.body.comment,
								by: complaint.hostelsecy
							}
							complaint.comments.push(commen);
							complaint.save().then(result=>{
								console.log(result);
							})
						req.userID = "aluthra1403@gmail.com" ;
						req.userID1 = complaint.by;
						return warden.complaintemail(req,res,next);

	});
},
notvalidcomplaints: async(req,res,next) =>{
			Complaint.findOne({'_id':req.params.id}).then(complaint =>{
							const commen = { 
								comment:req.body.comment,
								by: complaint.hostelsecy
							}
							complaint.comments.push(commen);
							complaint.save().then(result=>{
								console.log(result);
							})
						req.userID = complaint.by;
						return warden.rejectemail(req,res,next);

	});
},
changesRequested:  async(req,res,next) =>{
	Complaint.findOne({'_id':req.params.id}).then(complaint =>{
							const commen = { 
								comment:req.body.comment,
								by: complaint.hostelsecy
							}
							complaint.comments.push(commen);
							complaint.save().then(result=>{
								console.log(result);
							})
						req.userID = complaint.by;
						return warden.changesemail(req,res,next);

	});

	},
	finalVerification:  async(req,res,next) =>{
	Complaint.findOne({'_id':req.params.id}).then(complaint =>{
							complaint.isPending = true;
							const commen = { 
								comment:req.body.comment,
								by: complaint.hostelsecy
							}
							complaint.comments.push(commen);
							complaint.save().then(result=>{
								console.log(result);
							});
						req.userID = complaint.by;
						req.userID1 = "instigo.iitdh@gmail.com";
						return warden.changesemail(req,res,next);

	});
	}
}