 a)Running commands: 1) npm install
 				2) mongo
 				3) nodemon index.js

 b)	Open Postman: 
 		type       Url                               			Body
 	1)	Post      http://localhost:3000/users/signup {"email":"170030039@iitdh.ac.in","password":"amanji","name":aman}		                                         
 	2)  Post      http://localhost:3000/users/signin 		{"email":"170030039@iitdh.ac.in","password":"amanji"}
 	4) 	GET		  http://localhost:3000/users/secret	     {Header : key:Authorization , value:"token value"}
 	5) post       http://localhost:3000/users/forgotp      {"email": "170030039@iitdh.ac.in"}
 	6) post 	  http://localhost:3000/users/update/profile {"branch":"cse","year":2,"hostel":2,"gender":"male","dob":"10/02/1999","phone":1111111111}
 	7) post  	  http://localhost:3000/users/profile      
 	8) get       http://localhost:3000/logout
 	9) post      http://localhost:3000/profilepic
 	10) post     http://localhost:3000/coverpic
c)  Check db:
				1) use api;
				2) db.users.find();

d) For googe SignIn:
					1) Type URl In browser: http://localhost:3000,
					2) Click on google+ Button and sign in with your email id
					3) check db On mongocloud
					4) google+ button Url : http://localhost:3000/auth/google
					5) Redirect Url: http://localhost:3000/auth/users/oauth/google
e)Forgot Password:
					1) see the url for forgot Password in b)(open Postman); 
					2) After getting Url in email: Enter Your Password in 6 characters.
					3) Enter Any password or keep it Empty or try Any method to find Bug.
					4) After Updating Password, check it in Postman by sign-in 
f)	Update Profile:
					1) Firstly Sign in with registered email id in one tab in postman.
					2) Open another tab 
					3) Paste the url of Update profile above in postman 
					4) Check the db	
g) Upload Profilepic:
					1)  Firstly Sign in with registered email id in one tab in postman.
					2)  Open another tab
					3)  Paste the url of Upload profilepic above in postman  
					4)  Choose the form data in Body tab instead of raw data .
					5) Keep Key as empty & choose the value with file Option instead of text.
					6) Now choose file from ur Pc and check the image Folder inside the instigo Folder. 
                    7) Can check db as of now for ProfilePic path in ur sign-in Id
h) Uploading Coverpic:
					1) same procedure as above(g) just change the url in Postman
i)  Getting Profile:
					1) Firstly Sign in with registered email id in one tab in postman.					
					2)  Open another tab
					3)  Paste the url of /profile above in postman 
j) logout: 
					1) Paste the url of /logout above in postman 
					2) These profile routes(f,g,h,i) will not work if not authenticated.
					3) check these routes after logout