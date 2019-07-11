const express = require('express');
const router = require('express-promise-router')();
const complaintsController = require('../controllers/complaints');
router.route("").
get(complaintsController.getcomplaints);
router.route("/tosecy/:id").
get(complaintsController.validcomplaints);
router.route("/create/:id").
post(complaintsController.postcomplaints);
module.exports = router;