const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
router.route('/signup')
.post(UsersController.sign);
router.route('/signin')
  .post(passportSignIn, UsersController.signIn);

router.route('/oauth/google')
  .get(passport.authenticate('google', { session: false }), UsersController.googleOAuth);

router.route('/secret')
  .get(passportJWT, UsersController.secret);
  console.log("aman");

router.route('/verify/:id1')
	.get(UsersController.verify);
	
module.exports = router;