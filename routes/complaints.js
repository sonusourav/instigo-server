const express = require('express');
const router = require('express-promise-router')();
const complaintsController = require('../controllers/complaints');
router.route("").
get(complaintsController.getcomplaints);
router.route("/create").
post(complaintsController.postcomplaints);
module.exports = router;