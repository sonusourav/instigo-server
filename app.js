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
app.use(passport.initialize());
app.use(passport.session());
app.use('/instigo/images', express.static( 'instigo/images'));
app.use("/resources", express.static(__dirname + "/resources"));
app.set('view engine','ejs');
app.get('/',(req,res) =>{
  console.log(req.session);
  res.render('home');
});
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
    res.json({message : "Not Authorized"});}
       else {
               const errors = validationResult(req);
       //         if (errors){
       //    return res.status(422).json({ errors: errors[0].msg});
       // }
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }
    var password = req.body.password;
     if (password === "" ) return res.status(200).json({ message: "password can't be empty" });
else {
 bcrypt.hash(password, 10).then(hash =>{
   User.updateOne({email: req.session.user.email },{password:hash}).then(result =>{
    console.log(result);
  if (result.n > 0) {
    req.session.user = null;
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
     req.session.user = null;
    res.send("successfully Logged Out");
  });
app.post('/profilepic',upload.single(''),function (req,res) {
  console.log(req.session.user);
  if(!req.session.user){
    return res.status(401).send("Not Authorized");
  }
  console.log(req.file.filename);
  User.updateOne({email: req.session.user.email },{'profilePic':req.file.filename}).then(result =>{
      console.log(result);
  if (result.n > 0) {
      res.status(200).json({ message: "successfully Uploaded profilepic!" });
      }else {
        res.status(401).json({ message: "err in Updating pic" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "User not found!"
      });
    });
});
app.post('/coverpic',upload1.single(''),function (req,res) {
  console.log(req.session.user);
  if(!req.session.user){
    return res.status(401).send("Not Authorized");
  }
  console.log(req.file);
  User.updateOne({email: req.session.user.email },{'coverPic':req.file.filename}).then(result =>{
      console.log(result);
  if (result.n > 0) {
      res.status(200).json({ message: "successfully Uploaded coverpic!" });
      }else {
        res.status(401).json({ message: "err in Updating pic" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "User not found!"
      });
    });
});
app.post('/documents/:id',upload2.single(''),function (req,res) {
  console.log(req.file);
  if(!req.session.user){
    return res.status(401).send("Not Authorized");
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
    if(result)res.status(200).json({message:"successfully posted"});
    else{res.status(400).json({message:"err in posting feedback"})}
   });
  }
});
app.use('/users', userRoutes);
app.use('/mess', messRoutes);
app.use('/courses',resourcesRoutes);
app.get('/auth/users/oauth/google', passport.authenticate('google'), (req, res) => {
     res.status(200).json({ message: "success" });
});
module.exports = app;
