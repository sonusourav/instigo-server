const express = require('express');
const router = require('express-promise-router')();
const {check, validationResult } = require('express-validator');
const passport = require('passport');
const passportConf = require('../passport');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const forgotPassword = require('../controllers/forgotPassword');
const multer= require('multer');
let fs = require('fs-extra');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
     let path = './images/'+req.body.email;
      fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, req.body.email +'_profilePic_' + file.originalname);
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
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
router.route('/signup')
.post(upload.single(''),UsersController.signUp);

router.route('/signin')
  .post(UsersController.signIn);

// router.route('/oauth/google')
//   .get(passport.authenticate('google', { session: false }), UsersController.googleOAuth);

router.route('/verify/:id/:id1')
	.get(UsersController.verify);

router.route('/forgotp')
	.post( forgotPassword.forgotPassword);	

router.route('/profile/:id')
	.get(UsersController.profile);

router.route('/update/profile/:id')
	.post(UsersController.updateProfile);	

router.route('/profilepic/:id')
	.get(UsersController.getProfilePic);

router.route('/picnameemail/:id')
.get(UsersController.getpicnameemail)		

router.route('/coverpic/:id')
	.get(UsersController.getCoverPic);	
	
module.exports = router;