var Student = require('./models/pro');
var mongoose = require('mongoose');
////////----->show is name of Database;

mongoose.connect("mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });


/////////------------> Making Array of students

var students = [
new Student({
	imagePath:'../instigo/student_council/aluthra1403@gmail.com_profilePic_57.jpg',
	title:'General Secy',
	name:'who cares',
	email:'whocares@gmail.com',
	phoneno:'9999999999',
	description: 'Cs 2nd Year'
}),
new Student({
	imagePath:'../instigo/student_council/aluthra1403@gmail.com_profilePic_57.jpg',
	title:'General Secy',
	name:'Numpy',
	email:'Numpy@gmail.com',
	phoneno:'9999999999',
	description: 'Cs 2nd Year'
}),
new Student({
	imagePath:'../instigo/student_council/aluthra1403@gmail.com_profilePic_57.jpg',
	title:'General Secy',
	name:'Humpy',
	email:'Humpy@gmail.com',
	phoneno:'9999999999',
	description: 'Cs 2nd Year'
})
];

var done =0;


//////////////////------> Saving Student Information in database


for(var i=0; i<students.length; i++){
	students[i].save(function(err,result){
		done++;
		if (done == students.length) {
			console.log("Added successfully");
			exit();
		}
	});
}function exit(){
	mongoose.disconnect();
}