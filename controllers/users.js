const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const Vemail = require('../models/verifyemail')
const verifyEmail = require ('./emailVerification');
const bcrypt = require("bcryptjs");
const phone = require("phone");
const Fpass = require("../models/forgotPassword");
const {check, validationResult } = require('express-validator');
var randtoken = require('rand-token') 
signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}
module.exports = {
signUp: (req, res, next) => {
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

const url = req.get("host");
    // Check if there is a user with the same email
  bcrypt.hash(req.body.password, 10).then(hash => {
  User.findOne({ "email": req.body.email },function(err, user) {
    if (err) return done(err);
    if (user) {
       if(!user.isEmailVerified){
          res.status(201).json({
            message: "Activate your account by clicking link in email!"
          })
        }else{
      return res.status(403).json({ error: 'Email is already in use'});
    }}

    // Create a new user
   else { 
    const newUser = new User({ 
        email: req.body.email, 
        password:hash,
        name: req.body.name
    });
   newUser.save().then(result => { 
    const token = signToken(newUser);
    // Respond with signToken 
                         req.userID = result._id;
             return verifyEmail.verifyemail(req,res,next);
                })  
    .catch(err => {
        return  res.status(500).json({
          message :  "Failure"
            });
          });
    // Generate the token 
  }
  });
});
},

  signIn: async (req, res, next) => {

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

    let fetchedUser;
    User.findOne({ "email": req.body.email })
    .then(user =>{
      if (!user) {
        return res.status(401).json({
          message: "User Not found"
        });
    }
    fetchedUser = user;
       if (!user.isEmailVerified) {
       return res.status(401).json({
          message: "First Activate your Account from your mailbox!"
        });
    }
  return bcrypt.compare(req.body.password,user.password);
}).then(result =>{
  if(!result){
    return res.status(401).json({
          message: "password do not match"
        });
  }
 // var refreshTokens = {} 
   const token = JWT.sign(
        { userId: fetchedUser._id },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
     req.session.user = fetchedUser;
   // var refreshToken = randtoken.uid(256);
   //  refreshTokens[refreshToken] = fetchedUser.name;
   //    console.log(req.user);
   //  res.json({token:  token, refreshToken: refreshToken}) 
  // console.log(req.session.user);
   res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
},

  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log('got here');
    const token = signToken(req.user);
   res.render('home.ejs');
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  },
  verify: async( req, res, next) => {
      Vemail.findOne({"userID": req.params.id1}, (err, result) =>{
    if(err) throw err;
  
      User.updateOne({_id: req.params.id1},{"isEmailVerified": true}).then(result =>{console.log(result)});
        Vemail.deleteOne({"userID": req.params.id1}).catch(error => {
          console.log(error);
        })
      res.status(201).json({
        message: "Email Verified"
      });
 
    // else{
    //   res.status(500).json({
    //     message: "Invalid User Credentials!"
    //   })
    // }
  })   
 },
 profile: async(req,res,next) =>{
  if(!req.session.user){
    return res.status(401).send("Not Authorized");
  }
  User.findById(req.session.user._id).then(user => {
    if (user) {
      const details = {
        email: user.email,
        name: user.name,
        year: user.year,
        gender: user.gender,
        branch: user.branch,
        profilePic: user.profilePic,
        hostel:user.hostel,
        dob:user.dob,
        phone:user.phone
      }
      res.status(200).json(details);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching User failed!"
    });
  });
 },
 updateProfile: async(req,res,next) =>{
  if(!req.session.user){
    return res.status(401).send("Not Authorized");
  }
  User.updateOne({'email':req.session.user.email},{'branch':req.body.branch,'year':req.body.year,'gender':req.body.gender,'hostel':req.body.hostel,'phone':req.body.phone,'dob':req.body.dob})
  .then(result =>{
    console.log(result);
     if (result.n > 0) {
      res.status(200).json({ message: "successfully Updated profile" });
      }else {
        res.status(401).json({ message: "err in Updating" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "User not found"
      });
    });
  },
  generateToken: async(req,res,next)=>{
    var userId = req.body.id
  var refreshToken = req.body.refreshToken
  if( refreshTokens[refreshToken] == userId) {
    var token = JWT.sign(userId,  JWT_SECRET, { expiresIn: 300 })
    res.status(200).json({token: token});
  }
  else {
    res.send(401)
  }
  }
}
 
  
