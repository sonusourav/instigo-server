const User = require('../models/user');
const Complaint = require('../models/complaint');
const Student = require('../Student Council/models/pro');
const complaintEmail = require('./complaintEmail'); 
const decode = require('jwt-decode');
const warden = require('./warden.js');
var fcm = require('fcm-notification');
var FCM = new fcm(__dirname+'/privateKey.json');
// function myFunction(zeros) {
// 	 var zeroes = "";
// 	 console.log("B");
// 	  for (var i = zeros; i >0; i--) {
//            zeroes+="0";
//           console.log(zeroes);
//                }
//                console.log(zeroes);
//                return zeroes; 
// 	}
module.exports = {
	getcomplaints:async(req,res,next) =>{
	Complaint.find({isPrivate:false}).then(complaints =>{
		console.log(complaints);
    // res.status(200).json({menu: complaints}); 
    res.send(complaints);
	});
},
	secyComplaints:async(req,res,next) =>{
		Complaint.find({}).then(complaints =>{
		console.log(complaints);
    // res.status(200).json({menu: complaints}); 
    res.send(complaints);
	});
	},
	wardenComplaints:async(req,res,next) =>{
		Complaint.find({Status: {$gte : req.params.id}}).then(complaints =>{
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
 const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
var datetime = monthNames[currentdate.getMonth()]+" "+currentdate.getDate()
                +"," 
                +currentdate.getFullYear();           
var id = req.body.related.slice(0,3).toUpperCase()+currentdate.getFullYear();
	const complaint = new Complaint({ 
		houseNo:req.body.houseNo,
		requestDesc:req.body.requestDesc,
		requestorName:req.body.requestorName,
		hostelNo:req.body.hostelNo,
		requestName:req.body.requestName,
		isPrivate:req.body.isPrivate,
		isPriority:req.body.isPriority,
		related:req.body.related,
		requsetId:id,
		requestorEmail:tok.email,
		dateCreated:datetime,
		status:0
    });
	 complaint.save().then(result=>{
	 	
	 	User.findOne({"_id":tok.id}).then(user =>{
	 		user.mycomplaints.push(complaint._id);
	 		user.save();
	 		var token = user.fcmToken;
	 		console.log(token);
	 		if(token){
	 			 var message = {
        data: {    //This is only optional, you can send any data
            score: '850',
            time: '2:45'
        },
        notification:{
            title : 'Complaint Registered',
            body : 'hello '
        },
        token : token
        };
FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
    }else {
        console.log('response here', response);
    }
});
	 		}
	 			 	});
    
	 		// var token1 = "fbIEam_6qmM:APA91bHnqA1rGyEMZ3jP6QkK8ZQ8b60OZnFDq9LqXQGCE6K3gU3l75HWnSxPQdpDAS8zkSel_ADMQmyJNdvHK3iLqbtESIztA_Gddk0O7PkxEev5l6P_FBUqmN14RYqBHYCYkQe-FEAK";
	 	
	 				req.userID = "aluthra1403@gmail.com";
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