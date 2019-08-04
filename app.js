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
const config =  require('./configuration');
const passportJWT = passport.authenticate('jwt', { session: false });
const fPass = require('./models/forgotPassword');
const multer= require('multer');
const Document = require('./models/documents');
let fs = require('fs-extra');
const Course = require('./models/resources');
const Student = require('./Student Council/models/pro');
const complaintsRoutes = require('./routes/complaints');
const UsersController = require('./controllers/users');
var GoogleAuth = require('google-auth-library');
const checkAuth = require("./middleware/check-auth");
var auth = new GoogleAuth();
mongoose.Promise = global.Promise;
const app = express();
const {check, validationResult } = require('express-validator');
if (process.env.NODE_ENV === 'test') {
  mongoose.connect("mongodb+srv://admin:aluthra1403@cluster0-mrukq.gcp.mongodb.net/api?retryWrites=true&w=majority", { useNewUrlParser: true });
} else {
  mongoose.connect("mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority",{useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });
}
// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });
// app.use(session({name:'aman',secret: 'aman',saveUninitialized: false,resave: false,store: new MongoStore({ url:
//   "mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority",
//                       ttl: 10 * 365 * 24 * 60 * 60 }),cookie:{maxAge: 10 * 365 * 24 * 60 * 60*1000}}));
//Routes
app.use('/instigo/images', express.static( 'instigo/images'));
app.use("/images", express.static('images'));
app.use("/resources", express.static(__dirname + "/resources"));
app.set('view engine','ejs');
app.get('/',(req,res) =>{
  res.render('home');
});
var client = new auth.OAuth2(config.google.clientID,config.google.clientSecret);
const storage = multer.diskStorage({
  
  destination: function(req, file, cb) {
    var tok = decode(req.headers.authorization.split(" ")[1]);
    // const url = req.protocol + "://" + req.get("host");
     let path = './images/'+tok.email;
      fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function(req, file, cb) {
    var tok = decode(req.headers.authorization.split(" ")[1]);
    cb(null, 'profilePic_' + file.originalname);
  }
});
const storage1 = multer.diskStorage({
  destination: function(req, file, cb) {
    var tok = decode(req.headers.authorization.split(" ")[1]);
     let path = './images/'+tok.email;
      fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function(req, file, cb) {
    var tok = decode(req.headers.authorization.split(" ")[1]);
    cb(null, 'coverPic_' + file.originalname);
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
     var tok = decode(req.headers.authorization.split(" ")[1]);

    let path = './resources/'+tok.email;
      fs.mkdirsSync(path);
    cb(null, './resources/'+tok.email);
  },
  filename: function(req, file, cb) {
    var tok = decode(req.headers.authorization.split(" ")[1]);
    cb(null,file.originalname);
  }
});
const upload2 = multer({
  storage: storage2,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});
console.log(config.google.clientID);
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
      User.findOne({'_id': tok.id }).then(user =>{
    var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "@"  
                + currentdate.toLocaleTimeString('en-GB', { hour: "numeric", 
                                             minute: "numeric"});
    user.password = hash;
    user.updatedPass = datetime;
    user.save().then(result=>{
      res.status(200).json({ message: "successfully Updated Password"});
    })
    .catch(error => {
      res.status(200).json({
        message: "failure@err in Updating"
      });
    });
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
app.post('/updatepassword',checkAuth,(req,res)=>{
    var password = req.body.password;
     if (password === "" ) return res.status(200).json({ message: "failure@Password can't be empty" });
else {
 bcrypt.hash(password, 10).then(hash =>{
  var tok = decode(req.headers.authorization.split(" ")[1]);
   User.findOne({'_id': tok.id }).then(user =>{
     var currentdate = new Date(); 
var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
              + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
var dateString = datetime,
    dateTimeParts = dateString.split(' '),
    timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),
    date;

date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

console.log(date.getTime());
 //1379426880000
 var datetime1 = date.getTime();
    user.password = hash;
    updatepassword = datetime1;
    user.updatedPass = datetime1;
    user.save().then(result=>{
      res.status(200).json({ message: "success",passLastUpdated: updatepassword });
    })
    .catch(error => {
      console.log(error);
      res.status(200).json({
        message: "failure@err in Updating"
      });
    });
    })
    .catch(error => {
      res.status(200).json({
        message: "failure@User not found!"
      });
    });
 });
};
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
// // app.get('/auth/google', passport.authenticate('google', {
// //   scope: ['profile', 'email']
// // }) 
// );
app.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({message:"success"});
  //   if(req.session.user === null){
  //    res.status(200).json({message:"failure@Already Logged Out"});
  //   }
  //   else{ req.session.user = null;
  //   res.status(200).json({message:"success"});
  // }
  });

const upload4= multer({
    // const url = req.protocol + "://" + req.get("host");
    storage:storage
}).single('profilepic')

app.post('/profilepic',checkAuth,(req,res) => {
  var tok = decode(req.headers.authorization.split(" ")[1]);

    upload4(req, res, function (err) {
          console.log(req.file);
        if (err) {

            res.status(400).json({message: err.message})

        } else {
          let path =req.protocol+'://'+req.get("host")+'/'+'images/'+tok.email+'/'+req.file.filename;
          User.updateOne({'_id': tok.id },{'profilePic':path}).then(result =>{
      console.log(result);
  if (result.n > 0) {
      res.status(200).json({ message: "success" });
      }else {
        res.status(200).json({ message: "failure@err in Updating pic" });
      }
    })
    .catch(error => {
      res.status(200).json({
        message: "User not found!"
      });
    });
        }
    })
});
const upload3= multer({
    // const url = req.protocol + "://" + req.get("host");
    storage:storage1
}).single('coverpic')

app.post('/coverpic',checkAuth, (req, res) => {
  var tok = decode(req.headers.authorization.split(" ")[1]);

    upload3(req, res, function (err) {
          console.log(req.file);
        if (err) {

            res.status(400).json({message: err.message})

        } else {
          let path =req.protocol+'://'+req.get("host")+'/'+'images/'+tok.email+'/'+req.file.filename;
          User.updateOne({'_id': tok.id },{'coverPic':path}).then(result =>{
      console.log(result);
  if (result.n > 0) {
      res.status(200).json({ message: "success" });
      }else {
        res.status(200).json({ message: "failure@err in Updating pic" });
      }
    })
    .catch(error => {
      res.status(200).json({
        message: "User not found!"
      });
    });
        }
    })
});
function getExt(filename)
{
    var ext = filename.split('.').pop();
    if(ext == filename) return "";
    return ext;
}
const upload5= multer({
    // const url = req.protocol + "://" + req.get("host");
    storage:storage2
}).single('resource');

app.post('/documents/:id',(req,res) => {
  var tok = decode(req.headers.authorization.split(" ")[1]);
  console.log(tok.email);
   upload5(req, res, function (err) {
          console.log(req.file);
        if (err) {
              console.log(err);
            res.status(200).json({message: err.message})

        } else {
  User.findOne({'_id':tok.id}).then(user =>{
  const t = getExt(req.file.originalname);
   const documents= new Document({ 
    docTitle:req.body.docTitle,
    desc:req.body.desc,
    prof:req.body.prof,
    by:user.name,
    url:user.profilePic,
    file:req.file.filename,
    type:t,
    path:req.protocol+'://'+req.get("host")+'/'+'resources/'+tok.email+'/'+req.file.filename
    });

   documents.save().then(result=>{
Course.findOne({'courseCode':req.params.id}).then(course =>{
                course.documents.push(documents._id);
                course.save();
    }).catch(err =>{
      console.log(err);
    });
    if(result)res.status(200).json({message:"success"});
    else{res.status(400).json({message:"failure@err in posting feedback"})}
   });
 });
}
})
 });
app.get('/secys',function (req,res) {
    Student.find({}).then(students =>{
      console.log(students);
      if(students){res.status(200).json(students);}
      else{res.status(200).json({message : "failure@Err in getting secys"});}
    });
});
app.get('/download', function(req, res){
  const file = req.body.path;
  res.download(file); // Set disposition and send it.
});
app.use('/users', userRoutes);
app.use('/mess', messRoutes);
app.use('/courses',resourcesRoutes);
app.use('/complaints',complaintsRoutes);
app.get('/tokensignin/:id',(req,res,next)=>{
  const token =req.params.id;
 const audience = config.google.clientID;
   var verifyToken = new Promise(function(resolve, reject) {
            client.verifyIdToken(
                token,
                audience,
                function(e, login) {
                  console.log(e);
                  console.log(login);
                    if (login) {
                        var payload = login.getPayload();
                        var googleId = payload['sub'];
                        var email = payload['email'];
                        var name = payload['name'];
                        var picture = payload['picture'];
                        resolve(googleId);   
                        User.findOne({ 'email' : email}, function(err, user) {
                        if (err) return done(err);
                 if (user) {  const token = JWT.sign(
                             { id: user._id ,email:user.email},
                               JWT_SECRET,
                                 { expiresIn: "31536000h" }
                              );
              res.status(200).json({message:"success",userId:token});
          } else {
            var newUser = {
              email:email,
              socialId: googleId,
              password:'$2a$10$LGvwGlOq9.2ahUvfRdypj.EddTci2pGmRyVL21to8L/vTyDovHiZa',
              name:name,
              profilePic:picture,
              isEmailVerified:true
            };
              console.log(newUser);
            User.create(newUser, function(err, added) {
              const token = JWT.sign(
               { id: newUser._id ,email:newUser.email},
                               JWT_SECRET,
                                 { expiresIn: "31536000h" }
                              );
                if (err) {
                  console.log(err);
                }
                 res.status(200).json({message:"success",userId:token});
            });
          }
        });
                    } else {
                        reject("invalid token");
                    }
                })
          })
        .catch(function(err) {
            res.send(err);
        })
    })
module.exports = app;