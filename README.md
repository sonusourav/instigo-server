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
| post | http://localhost:3000/users/update/profile | {"branch":"cse","year":2,"hostel":2,"gender":"male","dob":"10/02/1999","phone":1111111111,"name":"aman"}|      
| get |  http://localhost:3000/users/profile        |     |        
| get |   http://localhost:3000/logout     |    |     
| post|  http://localhost:3000/profilepic   |  |
| post |  http://localhost:3000/coverpic |    |
| get |  http://localhost:3000/users/profilepic   |    |
| get |  http://localhost:3000/users/coverpic   |    |
| post |  http://localhost:3000/updatepassword   |  {"password": "amanji"} | 
| get |  http://localhost:3000/mess  |    | 
| post |  http://localhost:3000/mess/feedback  |  {"ratings":2,"title":"delayed","part":"dinner","desc":"anything","day":"Monday" |
| get |  http://localhost:3000/mess/getfeedbacks  |    | 
| post |  http://localhost:3000/mess/ratings/1/breakfast  | {"ratings":5}   | 
| get |  http://localhost:3000/courses  |    |
| get |  http://localhost:3000/courses/getdocuments/1  |    | 
| post |  http://localhost:3000/documents/1 | formdata: {"key:value":- 1)docTitle:Notes,2)prof:Sandeep.R.B,3)resource:file}
| get |  http://localhost:3000/secys  |    | 
| get |  http://localhost:3000/users/picnameemail|    |
		                                         
 	       		
* Check db:
  - use api;
  - db.users.find();

* For googe SignIn:
  - URl : http://localhost:3000/tokensignin/idToken value
  - check db On mongocloud
* Forgot Password:
  - see the url for forgot Password in b)(open Postman); 
  - After getting Url in email: Enter Your Password in 6 characters.
  - Enter Any password or keep it Empty or try Any method to find Bug.
  - After Updating Password, check it in Postman by sign-in 
* Update Profile:
  - Firstly Sign in with registered email id in one tab in postman.
  - Open another tab 
  - Paste the url of Update profile above in postman
  - Open the header and fill it in Key:Value form {Authorization:Bearer value of token}(Note:just give the space between bearer and the value of Token)
  -Try without header also or pass the invalid token
  -Also pass the value of token in Url as well
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
  - These profile routes will not work if not authenticated.
  - check these routes after logout
* UpdatePassword: 
  -Firstly Sign in with registered email id in one tab in postman.
  - Paste the url of /updatepassword above in other tab
  - check with sign-in 
* GetprofilePic: 
  -Firstly Sign in with registered email id in one tab in postman.
  - Paste the url of /users/profilepic above in other tab.
  - copy the string u get in response e.g. (xxxxxxxxxxxxxxxxxx.jpg)
  - check this url on browser 'http://localhost:3000/instigo/images/xxxxxxxxxxxxxxx.jpg'
  - It will show that image
* GetCoverPic:
  - same as GetProfilePic above
* Postmenu:
  -Follow following Commands:
  -cd seed
  - node menu-seeder.js
  -You should see the output("Added successfully")
  -check db for products
* Getmenu:
  - Paste Url of /mess from above table in postman
* Postfeedback:
  - Paste Url of /mess/feedback from above table in postman
  - check db
* Getfeedback:
  - Paste Url of /mess/getfeedbacks from above table in postman
* Postmenuratings:
  - Paste Url of /mess/ratings/1/breakfast from above table in postman
  - You can add 0-6 and (lunch,snacks,dinner,breakfast) respectively in above url e.g."/mess/ratings/5/snacks
  -check db for raters and ratings
* Postcourse:
  -Follow following Commands:
  -cd seed
  - node courses-seeder.js
  -You should see the output("Added successfully")
  -check db for courses
* Getcourses:
  - Paste Url of /courses from above table in postman
* Postdocuments:
  -Firstly Sign in with registered email id in one tab in postman.
  - Paste Url of /documents/1 from above table in postman
  - Fill the formData instead of raw data in Body Tab
  - You can add 1-2 course respectively in above url e.g."/documents/2"
  -check /courses/getdocuments/1 or 2 in above url to get the document related to particular Course.
* GetfileUrl: 
  - copy the url get in the /courses/getdocuments/1  above in file filed of document object.
  - e.g. (xxxxxxxxxxxxxxxxxx.cpp) 
  - check this url on browser 'http://localhost:3000/resources/user@gmail.com/xxxxxxxxxxxxxx.cpp'
  - It will show that image
  - To see the file see the resources folder in main folder and check the respective folder of Your email.
* Student_Council:
  -Put any Image in student_council in Instigo Folder(I h'v already done).
  -Give Path of that image in Imagepath in stu.js (Already Done).
  -Follow following Commands:
  -cd Student Council
  - node stu.js
  -You should see the output("Added successfully")
  -check db for students
* GetSecys:
  - Paste Url of /secys from above table in postman
* GetPicNameEmail:
  - Paste Url of /users/picnameemail from above table in postman
