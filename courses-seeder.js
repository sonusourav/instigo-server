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
var Courses = [
new Course({
			name:"CS-205",
 		    branch:"Computer Science"
}),
new Course({
			name:"EE-212",
 		    branch:"Computer Science"
})
]
var done =0;
for(var i=0; i<Courses.length; i++){
	products[i].save(function(err,result){
		done++;
		if (done == products.length) {
			console.log("Added successfully");
			exit();
		}
	});
}
function exit(){
	mongoose.disconnect();
}