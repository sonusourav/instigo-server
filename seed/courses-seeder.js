var Course= require('../models/resources.js');
var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority",{useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });
var courses = [
new Course({
			name:"Software System Labs",
 		    branch:"Computer Science",
 		    code:"Cs-205",
 		    id:1
}),
new Course({
			name:"Computer Networks",
 		    branch:"Computer Science",
 		    code:"EE-101",
 		    id:2
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