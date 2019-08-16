const express = require('express');
const router = require('express-promise-router')();
const complaintsController = require('../controllers/complaints');
router.route("/").
get(complaintsController.getcomplaints);
router.route("/level1").
get(complaintsController.secyComplaints);
router.route("/level2/:id").
get(complaintsController.wardenComplaints);
router.route("/my").
get(complaintsController.mycomplaints);
router.route("/tosecy/valid/:id").
post(complaintsController.validcomplaints);
router.route("/tosecy/notvalid/:id").
post(complaintsController.notvalidcomplaints);
router.route("/create").
post(complaintsController.postcomplaints);
router.route("/warden/valid/:id").
post(complaintsController.wardenVerification);
router.route("/ips/valid/:id").
post(complaintsController.ipsVerification);
router.route("/final/close/:id").
post(complaintsController.close);
router.route("/final/ongoing/:id").
post(complaintsController.onGoing);
router.route("/final/resolved/:id").
post(complaintsController.resolved);
module.exports = router;