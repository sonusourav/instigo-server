 a)Running commands: 1) npm install
 				2) mongo
 				3) nodemon index.js

 b)	Open Postman: 
 		type       Url                               			Body
 	1)	Post      http://localhost:3000/users/signup 		{"email":"170030039@iitdh.ac.in","password":"amanji","name":aman}
 	2)  Post      http://localhost:3000/users/signin 		{"email":"170030039@iitdh.ac.in","password":"amanji"}
 	4) 	GET		  http://localhost:3000/users/secret	     {Header : key:Authorization , value:"token value"}

c)  Check db:
				1) use api;
				2) db.users.find();

d) For googe SignIn:
					1) Type URl In browser: http://localhost:3000,
					2) Click on google+ Button and sign in with your email id
					3) check db On mongocloud
					4) google+ button Url : http://localhost:3000/auth/google
					5) Redirect Url: http://localhost:3000/auth/users/oauth/google
 					
