const express = require('express');
const router = require('express-promise-router')();
const complaintsController = require('../controllers/complaints');
router.route("/").
get(complaintsController.getcomplaints);
router.route("/secy").
get(complaintsController.secyComplaints);
router.route("/warden/:id").
get(complaintsController.wardenComplaints);
router.route("/my/:id").
get(complaintsController.mycomplaints);
router.route("/tosecy/valid/:id").
post(complaintsController.validcomplaints);
router.route("/tosecy/notvalid/:id").
post(complaintsController.notvalidcomplaints);
router.route("/tosecy/changes/:id").
post(complaintsController.changesRequested);
router.route("/create").
post(complaintsController.postcomplaints);
router.route("/warden/:id").
post(complaintsController.finalVerification);
module.exports = router;