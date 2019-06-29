 a)Running commands: 1) npm install
 				2) mongo
 				3) nodemon index.js

 b)	Open Postman: 
 		type       Url                               			Body
 	1)	Post      http://localhost:3000/users/signup 		{"email":"170030039@iitdh.ac.in","password":"amanji"}
 	2)  Post      http://localhost:3000/users/signin 		{"email":"170030039@iitdh.ac.in","password":"amanji"}
 	3) 	Post      http://localhost:3000/users/oauth/google	{"access_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
 	4) 	GET		  http://localhost:3000/users/secret	     {Header : key:Authorization , value:"token value"}

c)  Check db:
				1) use api;
				2) db.users.find();

d) For googe Auth :
 					1)Url:	https://developers.google.com/oauthplayground/	
 					2) In  "select & Authorize Api section" :  select "Google Oauth api v2" -> then select "https://www.googleapis.com/auth/userinfo.profile" and "https://www.googleapis.com/auth/userinfo.email"
 					3) Click on Authorize Api 
 					4) Sign In with Your Google account 
 					5) copy access_token and paste it in  url 3) In Postman above and check db.
