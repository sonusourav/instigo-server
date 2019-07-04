* Running commands: 
  - npm install
  - mongo
  - nodemon index.js    
 
* Open Postman:  
 
| Type        | Url           | Body  |
| ------------- |:----------------:| :---------------------: |
|Post     | http://localhost:3000/users/signup |{"email":"170030039@iitdh.ac.in","password":"amanji","name":aman} |
|Post      |  http://localhost:3000/users/signin     | {"email":"170030039@iitdh.ac.in","password":"amanji"}|
|  post   |   http://localhost:3000/users/forgotp    |  {"email": "170030039@iitdh.ac.in"} |      
| post | http://localhost:3000/users/update/profile | {"branch":"cse","year":2,"hostel":2,"gender":"male","dob":"10/02/1999","phone":1111111111}|      
| get |  http://localhost:3000/users/profile        |     |        
| get |   http://localhost:3000/logout     |    |     
| post|  http://localhost:3000/profilepic  |  |
| post |  http://localhost:3000/coverpic   |    |
  
		                                         
 	       		
* Check db:
  - use api;
  - db.users.find();

* For googe SignIn:
  - Type URl In browser: http://localhost:3000,
  - Click on google+ Button and sign in with your email id
  - check db On mongocloud
  - google+ button Url : http://localhost:3000/auth/google
  - Redirect Url: http://localhost:3000/auth/users/oauth/google
* Forgot Password:
  - see the url for forgot Password in b)(open Postman); 
  - After getting Url in email: Enter Your Password in 6 characters.
  - Enter Any password or keep it Empty or try Any method to find Bug.
  - After Updating Password, check it in Postman by sign-in 
* Update Profile:
  - Firstly Sign in with registered email id in one tab in postman.
  - Open another tab 
  - Paste the url of Update profile above in postman 
  - Check the db	
* Upload Profilepic:
  -  Firstly Sign in with registered email id in one tab in postman.
  -  Open another tab
  -  Paste the url of Upload profilepic above in postman  
  -  Choose the form data in Body tab instead of raw data .
  - Keep Key as empty & choose the value with file Option instead of text.
  - Now choose file from ur Pc and check the image Folder inside the instigo Folder.    
  - Can check db as of now for ProfilePic path in ur sign-in Id
* Uploading Coverpic:
  - same procedure as above in (g),just change the url in Postman
*  Getting Profile:
  - Firstly Sign in with registered email id in one tab in postman.					
  - Open another tab
  - Paste the url of /profile above in postman 
* logout: 
  - Paste the url of /logout above in postman 
  - These profile routes(f,g,h,i) will not work if not authenticated.
  - check these routes after logout
