const User = require('../models/user');
const Complaint = require('../models/complaint');
const Student = require('../Student Council/models/pro');
const complaintEmail = require('./complaintEmail'); 
const decode = require('jwt-decode');
const warden = require('./warden.js');
var fcm = require('fcm-notification');
var FCM = new fcm(__dirname+'/privateKey.json');
var token = 'token here';
module.exports = {
	getcomplaints:async(req,res,next) =>{
	Complaint.find({isPrivate:false}).then(complaints =>{
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
 var tok = decode(req.headers.authorization.split(" ")[1]);
 var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.toLocaleTimeString('en-GB', { hour: "numeric", 
                                             minute: "numeric"});
	const complaint = new Complaint({ 
		houseNo:req.body.houseNo,
		requestDesc:req.body.requestDesc,
		requestorName:req.body.requestorName,
		hostelNo:req.body.hostelNo,
		requestName:req.body.requestName,
		isPrivate:req.body.isPrivate,
		isPriority:req.body.isPriority,
		related:req.body.related,
		requestorEmail:tok.email,
		dateCreated:datetime
    });
	 complaint.save().then(result=>{
	 	
	 	User.findOne({"_id":tok.id}).then(user =>{
	 		user.mycomplaints.push(complaint._id);
	 		user.save();
	 	});
	 	 var message = {
        data: {    //This is only optional, you can send any data
            score: '850',
            time: '2:45'
        },
        notification:{
            title : 'Title of notification',
            body : 'Body of notification'
        },
        token : token
        };
 
FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
})
	 				req.userID = "sonusouravdx001@gmail.com";
	 		 return complaintEmail.complaintemail(req,res,next);
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