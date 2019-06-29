const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const Vemail = require('../models/verifyemail')
const verifyEmail = require ('./emailVerification');

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}
module.exports = {

  signUp: async (req, res, next) => {
    

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": req.body.email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Create a new user
    const newUser = new User({ 
      method: 'local',
      local: {
        email: req.body.email, 
        password: req.body.password
      }
    });

    await newUser.save().then(result => { const token = signToken(newUser);
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
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log('got here');
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  },
  verify: async( req, res, next) => {
      Vemail.findOne({"userID": req.params.id1}, (err, result) =>{
    if(err) throw err;
    if(result.rand == req.params.id){
      User.updateOne({_id: req.params.id1},{"local.isEmailVerified": true}).then(result =>{console.log(result)});
        Vemail.deleteOne({"userID": req.params.id1}).catch(error => {
          console.log(error);
        })
      res.status(201).json({
        message: "Email Verified"
      });
    }
    else{
      res.status(500).json({
        message: "Invalid User Credentials!"
      })
    }
  })
  }
}