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
  teamName:"Club",
  teamDesc:"Heyy",
  teamSize:10,	
  team:[{imagePath:null,
	title:'General Secy',
	name:'who cares',
	email:'whocares@gmail.com',
	phoneno:'9999999999',
	description: 'Cs 2nd Year'},
	{imagePath:null,
	title:'General Secy',
	name:'Numpy',
	email:'Numpy@gmail.com',
	phoneno:'9999999999',
	description: 'Cs 2nd Year'}]
}),
new Student({
  teamName:"Club",
  teamDesc:"Heyy",
  teamSize:10	,
  team:[{imagePath:null,
	title:'General Secy',
	name:'who cares',
	email:'whocares@gmail.com',
	phoneno:'9999999999',
	description: 'Cs 2nd Year'},
	{imagePath:null,
	title:'General Secy',
	name:'Numpy',
	email:'Numpy@gmail.com',
	phoneno:'9999999999',
	description: 'Cs 2nd Year'}]
})
];

var done =0;


//////////////////------> Saving Student Information in database
	
console.log(students);
for(var i=0; i<students.length; i++){
	students[i].save(function(err,result){
		if(err){console.log(err);}
		done++;
		if (done == students.length) {
			console.log(done);
			exit();
		}
	});
}
function exit(){
	mongoose.disconnect();
}