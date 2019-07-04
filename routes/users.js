const express = require('express');
const router = require('express-promise-router')();
const {check, validationResult } = require('express-validator');
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const forgotPassword = require('../controllers/forgotPassword');
router.route('/signup')
.post([check('password','password must be in 6 characters').isLength({min:6}),
		check('email','Not valid Email').isEmail()],UsersController.signUp);

router.route('/signin')
  .post([check('password','password must be in 6 characters').isLength({min:6}),
		check('email','Not valid Email').isEmail()], UsersController.signIn);

router.route('/oauth/google')
  .get(passport.authenticate('google', { session: false }), UsersController.googleOAuth);

router.route('/secret')
  .get(passportJWT, UsersController.secret);
  console.log("aman");

router.route('/verify/:id1')
	.get(UsersController.verify);

router.route('/forgotp')
	.post( forgotPassword.forgotPassword);	

router.route('/profile')
	.get(UsersController.profile);

router.route('/update/profile')
	.post(UsersController.updateProfile);	
		
module.exports = router;