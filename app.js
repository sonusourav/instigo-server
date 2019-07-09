const express = require('express');
const morgan = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./routes/users");
const messRoutes = require("./routes/mess");
const resourcesRoutes = require("./routes/resources");
const session = require('express-session');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const User = require('./models/user');
const decode = require('jwt-decode');
const bcrypt = require("bcryptjs");
const path = require("path");
const { JWT_SECRET } = require('./configuration');
const passportJWT = passport.authenticate('jwt', { session: false });
const fPass = require('./models/forgotPassword');
const multer= require('multer');
const Document = require('./models/documents');
let fs = require('fs-extra');
const Course = require('./models/resources');
const Student = require('./Student Council/models/pro');
const complaintsRoutes = require('./routes/complaints');
const UsersController = require('./controllers/users');
//  const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client("97354838466-jhq1idtmnofl2vvnnhn8dj4gi0t4ngq0.apps.googleusercontent.com");
//const {OAuth2Client} = require('google-auth-library');
//const client = new OAuth2Client("106338368721-6rhf95094oachsimqnmddod8r7md6e2n.apps.googleusercontent.com");
var GoogleAuth = require('google-auth-library');
  var auth = new GoogleAuth();


// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');
mongoose.Promise = global.Promise;
const app = express();
//const expressValidator = require('express-validator');
const {check, validationResult } = require('express-validator');

var MongoStore = require('connect-mongo')(session);
if (process.env.NODE_ENV === 'test') {
  mongoose.connect("mongodb+srv://admin:aluthra1403@cluster0-mrukq.gcp.mongodb.net/api?retryWrites=true&w=majority", { useNewUrlParser: true });
} else {
  //
  mongoose.connect("mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority",{useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });
}
require('./passport');
// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(session({name:'aman',secret: 'aman',saveUninitialized: false,resave: false,store: new MongoStore({ url:
  "mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority",
                      ttl: 10 * 365 * 24 * 60 * 60 }),cookie:{maxAge: 10 * 365 * 24 * 60 * 60*1000}}));
// // Routes
// app.use("/images", express.static(path.join("images")));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/instigo/images', express.static( 'instigo/images'));
app.use("/resources", express.static(__dirname + "/resources"));
app.set('view engine','ejs');
app.get('/',(req,res) =>{
  console.log(req.session);
  res.render('home');
});
var client = new auth.OAuth2("106338368721-6rhf95094oachsimqnmddod8r7md6e2n.apps.googleusercontent.com", "TjI6uSU2Vintz3RJ-eUzKf0Y");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
     let path = './images/'+req.session.user.email;
      fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, req.session.user.email +'_profilePic_' + file.originalname);
  }
});
const storage1 = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(req.session.user);
     let path = './resources/'+req.session.user.email;
      fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, req.session.user.email+'_coverPic_' + file.originalname);
  }
});
const fileFilter = (req, file, cb,res) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: fileFilter
});
const upload1 = multer({
  storage: storage1,
  limits: {
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: fileFilter
});
const storage2 = multer.diskStorage({
  destination: function(req, file, cb) {
    let path = './resources/'+req.session.user.email;
      fs.mkdirsSync(path);
    cb(null, './resources/'+req.session.user.email);
  },
  filename: function(req, file, cb) {
    cb(null, req.session.user.email + file.originalname);
  }
});
const upload2 = multer({
  storage: storage2,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});
app.use(function(req, res, next){
  next();
});
app.post('/reset',[check('password','password must be in 6 characters').isLength({min:6})],(req,res)=>{
  var token = req.cookies.auth;
  // decode token
  //cookies.set('testtoken', {expires: Date.now()});
  if (token) {
    JWT.verify(token,JWT_SECRET,function(err, token_data) {
      if (err) {
         return res.status(403).send({message: 'Link has been expired!'});
      } else {
            var tok = decode(token);
               const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    var password = req.body.password;
    var confirm = req.body.confirm;
    if (password !== confirm ) return res.status(200).json({ message: "password do not match" });
     if (password === "" ) return res.status(200).json({ message: "password can't be empty" });
else {
 bcrypt.hash(password, 10).then(hash =>{
   User.updateOne({email: tok.email },{password:hash}).then(result =>{
    console.log(result);
  if (result.n > 0) {
    fPass.deleteOne({"userID": tok.email}).catch(error => {
          console.log(error);
        });
      res.status(200).json({ message: "successfully Updated password!" });
      }else {
        res.status(401).json({ message: "err in Updating" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "User not found!"
      });
    });
      });
    };
  }
  });
}
else {
    return res.status(403).send('Link has been Expired');
  };
});
app.post('/updatepassword',[check('password','password must be in 6 characters').isLength({min:6})],(req,res)=>{
  if (!req.session.user) {
    res.json({message : "failure@Not Authorized"});}
       else {
               // const errors = validationResult(req);
       //         if (errors){
       //    return res.status(422).json({ errors: errors[0].msg});
       // }
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ message: errors.array()[0].msg });
  // }
    var password = req.body.password;
     if (password === "" ) return res.status(200).json({ message: "failure@Password can't be empty" });
else {
 bcrypt.hash(password, 10).then(hash =>{
   User.updateOne({email: req.session.user.email },{password:hash}).then(result =>{
    console.log(result);
  if (result.n > 0) {
    req.session.user = null;
      res.status(200).json({ message: "success" });
      }else {
        res.status(200).json({ message: "failure@err in Updating" });
      }
    })
    .catch(error => {
      res.status(200).json({
        message: "failure@User not found!"
      });
    });
      });
    };
  }
});
app.get('/forgotp/:id1/:id',(req,res)=>{
    fPass.findOne({'rand':req.params.id1}).then(result =>{
      if(!result){
        res.status(403).json({message : "password already Updated"});
      }
      res.cookie('auth',req.params.id);
    res.render('email',{id1:req.params.id1});
    });
})
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}) 
);
app.get('/logout', function(req, res){
    req.logout();
    if(req.session.user === null){
     res.status(200).json({message:"failure@Already Logged Out"});
    }
    else{ req.session.user = null;
    res.status(200).json({message:"success"});
  }
  });
app.post('/profilepic',upload.single(''),function (req,res) {
  console.log(req.session.user);
  if(!req.session.user){
    return res.status(200).send("failure@Not Authorized");
  }
  console.log(req.file.filename);
  User.updateOne({email: req.session.user.email },{'profilePic':req.file.filename}).then(result =>{
      console.log(result);
  if (result.n > 0) {
      res.status(200).json({ message: "success" });
      }else {
        res.status(200).json({ message: "failure@err in Updating pic" });
      }
    })
    .catch(error => {
      res.status(200).json({
        message: "failure@User not found!"
      });
    });
});
app.post('/coverpic',upload1.single(''),function (req,res) {
  console.log(req.session.user);
  if(!req.session.user){
    return res.status(200).send("failure@Not Authorized");
  }
  console.log(req.file);
  User.updateOne({email: req.session.user.email },{'coverPic':req.file.filename}).then(result =>{
      console.log(result);
  if (result.n > 0) {
      res.status(200).json({ message: "success" });
      }else {
        res.status(200).json({ message: "failure@err in Updating pic" });
      }
    })
    .catch(error => {
      res.status(200).tokensigninjson({
        message: "User not found!"
      });
    });
});
app.post('/documents/:id',upload2.single(''),function (req,res) {
  console.log(req.file);
  if(!req.session.user){
    return res.status(200).send("failure@Not Authorized");
  }
   else{const documents= new Document({ 
    title:req.body.title,
    desc:req.body.desc,
    prof:req.body.prof,
    by:req.session.user.name,
    url:req.session.user.profilePic,
    file:req.file.filename,
    type:req.file.mimetype
    });

   documents.save().then(result=>{
Course.findOne({id:req.params.id}).then(course =>{
                course.documents.push(documents._id);
                course.save();
    }).catch(err =>{
      console.log(error);
    });
    if(result)res.status(200).json({message:"success"});
    else{res.status(400).json({message:"failure@err in posting feedback"})}
   });
  }
});
app.get('/secys',function (req,res) {
    Student.find({}).then(students =>{
      console.log(students);
      if(students){res.status(200).json({secys : students});}
      else{res.status(200).json({message : "failure@Err in getting secys"});}
    });
});
app.use('/users', userRoutes);
app.use('/mess', messRoutes);
app.use('/courses',resourcesRoutes);
app.use('/complaints',complaintsRoutes)
app.get('/tokensignin/:id',(req,res,next)=>{
  const token = req.params.id;
  // var GoogleAuth = require('google-auth-library');
  //   var auth = new GoogleAuth();
  // = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZGU4MGViMWVkZjlmM2JmNDQ4NmRkODc3YzM0YmE0NmFmYmJhMWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NzM1NDgzODQ2Ni1qaHExaWR0bW5vZmwydnZubmhuOGRqNGdpMHQ0bmdxMC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6Ijk3MzU0ODM4NDY2LWpocTFpZHRtbm9mbDJ2dm5uaG44ZGo0Z2kwdDRuZ3EwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyMzMwNjM2OTcxMDg1ODgyMjI0IiwiZW1haWwiOiJhbHV0aHJhMTQwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkM4dnhRZnB5Q1MwaUYzODJXV2xtdlEiLCJuYW1lIjoiYW1hbiBsdXRocmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1taXoyTWdzTTJnYy9BQUFBQUFBQUFBSS9BQUFBQUFBQUZudy9QbzFZMVByUnc4Zy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiYW1hbiIsImZhbWlseV9uYW1lIjoibHV0aHJhIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1NjI3MTE0NTksImV4cCI6MTU2MjcxNTA1OX0.UiLmWb68Q3w1vVGcC_jkheXlkbN_evRShXYk1AHn9LrBO_pZFBEYoQC6Z5CWrBKUpUTfiCl8-rg4kgHto0lvcLJ1wYG1AXW_lToH84f1ASoF4VmhkoHa1kvRDHjk-8Z7q6aqhg8Dnran0thMc9QDPyp7KBDWP8WAmLSFE9sSbpGj4Gk4aKAmKOXgFndXc4YfnJNua0wsBAk7seELDUosWHG-TH33qFP2CWL6ZHBt99JCz9PAYojbOZgI0AOuncSAzzGKYoPMKD8oBQGjemSdt-k9ULUU3eOQDtbt3S2mp2fb0lW8xTgzg25TPlTv37C95Jj3Af-CBsiNoSjOEEKKEw";
 //const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZGU4MGViMWVkZjlmM2JmNDQ4NmRkODc3YzM0YmE0NmFmYmJhMWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA1OTUyODkwNTY3NTgwMDI1NzUiLCJoZCI6ImlpdGRoLmFjLmluIiwiZW1haWwiOiIxNzAwMzAwMzlAaWl0ZGguYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkxhX0thTTA1UUZIUXZSSUVRNXdYOXciLCJuYW1lIjoiQU1BTiBJSVQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1oRmswRFpwbHd1NC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFIVS9YU3FSdW1IT2U4MC9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQU1BTiIsImZhbWlseV9uYW1lIjoiSUlUIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1NjI3MTEwMDMsImV4cCI6MTU2MjcxNDYwM30.PpaiRjqJgjpGs8O4zpWfUs_bN-0E9P6BbVerKBuXVT4obbowkhZOvxQXHx_ZCxgtonzSVTUDq5iXCmmSI_C3LFzeIlLvW59rwsYo3nOsvx8HYXMuvUpIFcnzWiBC6dFwERbQTEhxBSkhKIC0_S93X_k8c7EkXF31qnVxT4lfHSAk3RqEHd_b3V8cS65onWZd_Rg1jEdMSqMEQ5OjKyI5UWKGV7LOZIOLAIIUNpOCcn_mXuB4XSb8VzBDJbsqjdwvHmmmRsy9zQ5yM_IetOQNVEk0kqpQpp80tkHZDkheI_iHiM5vq3hDvLZ_ou49b4AcG3nEnm4q9y3r_1cVlMN1hw";
 const audience ="106338368721-6rhf95094oachsimqnmddod8r7md6e2n.apps.googleusercontent.com";
//const  token ="eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZGU4MGViMWVkZjlmM2JmNDQ4NmRkODc3YzM0YmE0NmFmYmJhMWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA1OTUyODkwNTY3NTgwMDI1NzUiLCJoZCI6ImlpdGRoLmFjLmluIiwiZW1haWwiOiIxNzAwMzAwMzlAaWl0ZGguYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjRtM0E0ZlNNTDlWamQzT2xObGV6X3ciLCJpYXQiOjE1NjI3MDg5NDYsImV4cCI6MTU2MjcxMjU0Nn0.t1S6RMuOOyy7iDpj56bPfMf5o6_NCFZaINEM_qbflC6rPZlHViXhuCKR1SIo7UQYzhlEmlXGVIYMfAWUsFyANSelNuJIjORXg7nByNIngkgWcjyD7IWDq40N0O-FRtAWT7mZfhYeq726PLbYfNIq7Rn0ynC7IRlJgVQYpwdrpdkn6Myebr-vX9Tlns_c5lyIG179Wca1KgQ2ZREMPvJioUmDYhHUAOZRLtUY5048Ogu_IHE6cmUngQ3Ldgf3jS4Ff7wdaYAaczO35BNpazjPdBLqmvRdEkwett4tDRxPUNPYYmNzUhafIBWZTYSiDEAbhWpTwlO1FEVO81DAnIEaTA";
  //const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZGU4MGViMWVkZjlmM2JmNDQ4NmRkODc3YzM0YmE0NmFmYmJhMWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA1OTUyODkwNTY3NTgwMDI1NzUiLCJoZCI6ImlpdGRoLmFjLmluIiwiZW1haWwiOiIxNzAwMzAwMzlAaWl0ZGguYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ikc4QURwSWlmbWx3LXYxVHJCcUsxWkEiLCJuYW1lIjoiQU1BTiBJSVQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1oRmswRFpwbHd1NC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFIVS9YU3FSdW1IT2U4MC9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQU1BTiIsImZhbWlseV9uYW1lIjoiSUlUIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1NjI3MDkyMDQsImV4cCI6MTU2MjcxMjgwNH0.HuRuI85xgc_YMSEBjLV4NLezJV2TGlSOnkybVmT3EMPancW2w7m-gAk8wtVNdLfmEqcvaVJ9mNJyDbI1-y_EGgReKKtWgKHKSIPPnyzs6kaoIL-SgJObmQgwnwReLTts39QOMHG92YOojKG5qYQeQ1LZPDfka0cSGLock9QlTIoeCe4s58IyFg-imBzFFdJ5zPSTl4GJ_gfHSxSl3ycnGcx2EoOOa2Y70nYnt__vISjDW3ZYZ7OenMKt_h-ltPYpOJ6gLM3RS7j5ELqu9KdfdJ_2l9iy-tc0o259oUQlO1KwXbqfCig2vCuX6gAdoipm4j4328rQnIZD16siGNbmpg";
   var verifyToken = new Promise(function(resolve, reject) {
            client.verifyIdToken(
                token,
                audience,
                function(e, login) {
                  console.log(login);
                    if (login) {
                        var payload = login.getPayload();
                        var googleId = payload['sub'];
                        resolve(googleId);
                           res.status(200).json({profile: payload});
                        next();
                    } else {
                        reject("invalid token");
                    }
                }
            )
        })
        .catch(function(err) {
            res.send(err);
        });
  // 
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
    //  if (token) {
    //        req.app.authClient.verifyIdToken(
    //             token,
    //             "106338368721-6rhf95094oachsimqnmddod8r7md6e2n.apps.googleusercontent.com",
    //             function(e, login) {
    //                 console.log(e);
    //                 if (login) {
    //                     var payload = login.getPayload();
    //                     var googleId = payload['sub'];
    //                     resolve(googleId);
    //                     next();
    //                 } else {
    //                     reject("invalid token");
    //                 }
    //             }
    //         )
    //    .then(function(googleId) {
    //         res.send(googleId);
    //     }).catch(function(err) {
    //         res.send(err);
    //     })
    // } else {
    //     res.send("Please pass token");
    // }
    }
);
  //  OAuth2Client.prototype.verifyIdToken = function(idToken, audience, callback)({
  //     idToken: token,
  //     audience: "97354838466-jhq1idtmnofl2vvnnhn8dj4gi0t4ngq0.apps.googleusercontent.com"
  //       // Specify the CLIENT_ID of the app that accesses the backend
  //     // Or, if multiple clients access the backend:
  //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  // const userid = payload['sub']
  // console.log(payload);
  // });
 
// res.status(200).json({message :"success"});
  
 
    // If request specified a G Suite domain:
  //const domain = payload['hd'];
  // User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
  //         if (err) return done(err);
  //         if (user) {
  //             User.updateOne({'email' : profile.emails[0].value });
  //             res.status(200).json({message:"success"});

  //         } else {
            
  //           var newUser = {
  //             email: profile.emails[0].value,
  //             socialId: profile.id,
  //             password:'$2a$10$LGvwGlOq9.2ahUvfRdypj.EddTci2pGmRyVL21to8L/vTyDovHiZa',
  //             name:profile.displayName,
  //             isEmailVerified:true
  //           };

  //             console.log(newUser);
  //           User.create(newUser, function(err, added) {
  //               if (err) {
  //                 console.log(err);
  //               }
  //               return done(null, added);
  //           });
  //         }
  //       });

app.get('/auth/users/oauth/google', (req, res) => {
     res.status(200).json({ message: "success" });     
});
module.exports = app;




// exports.verifyUser = function(req, res, next) {
//     var GoogleAuth = require('google-auth-library');
//     var auth = new GoogleAuth();
//     var client = new auth.OAuth2(config.passport.google.clientID, config.passport.google.clientSecret, config.passport.google.callbackURL);
//     // check header or url parameters or post parameters for token
//     var token = "";
//     var tokenHeader = req.headers["authorization"];
//     var items = tokenHeader.split(/[ ]+/);
//     if (items.length > 1 && items[0].trim().toLowerCase() == "bearer") {
//         token = items[1];
//     }
//     if (token) {
//         var verifyToken = new Promise(function(resolve, reject) {
//             client.verifyIdToken(
//                 token,
//                 config.passport.google.clientID,
//                 function(e, login) {
//                     console.log(e);
//                     if (login) {
//                         var payload = login.getPayload();
//                         var googleId = payload['sub'];
//                         resolve(googleId);
//                         next();
//                     } else {
//                         reject("invalid token");
//                     }
//                 }
//             )
//         }).then(function(googleId) {
//             res.send(googleId);
//         }).catch(function(err) {
//             res.send(err);
//         })
//     } else {
//         res.send("Please pass token");
//     }
// }
// 
// 