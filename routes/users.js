const express = require('express');
const router = require('express-promise-router')();
const {check, validationResult } = require('express-validator');
const passport = require('passport');
const passportConf = require('../passport');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const forgotPassword = require('../controllers/forgotPassword');
router.route('/signup')
.post(UsersController.signUp);

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

router.route('/coverpic/:id')
	.get(UsersController.getCoverPic);	
	
module.exports = router;