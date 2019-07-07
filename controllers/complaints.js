const User = require('../models/user');
const Document = require('../models/documents');
const Course = require('../models/resources');
module.exports = {
	getcourses :async(req,res,next) =>{
	Course.find({}).then(prods =>{
		console.log(prods);
    // res.status(200).json({menu: prods}); 
    res.send(prods);
	});
},
getdocuments :async(req,res,next) =>{
	Course.find({id:req.params.id}).populate('documents',null,'Document').then(course=>{
			res.status(200).json({documents: course[0].documents});
	});  
}
}