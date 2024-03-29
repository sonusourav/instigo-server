var Course= require('../models/resources.js');
var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sonusourav:sonusourav@instigo-server-ytfvu.gcp.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });
var courses = [
new Course({
			courseName:"Software System Labs",
 		    branch:["1","2","3"],
 		    courseCode:"CS203"
}),
new Course({
			courseName:"Digital Systems Labs",
 		    branch:["1","2","3"],
 		    courseCode:"EE105"
}),
new Course({
			courseName:"Computer Networks",
 		    branch:["1","2"],
 		    courseCode:"EE101"
}),
new Course({
			courseName:"Computer Architecture",
 		    branch:["3"],
 		    courseCode:"CS301"
})
]
var done =0;
for(var i=0; i<courses.length; i++){
	courses[i].save(function(err,result){
		done++;
		if (done == courses.length) {
			console.log("Added successfully");
			exit();
		}
	});
}
function exit(){
	mongoose.disconnect();
}