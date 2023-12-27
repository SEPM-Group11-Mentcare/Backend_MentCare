const express = require('express')
const router = express.Router()
const patient = require('../controllers/patientController')
const { isAuthenticated } = require("../middlewares/auth")

router.get('/view', patient.getTherapists);

router.get('/therapist/:id', patient.getTherapist);

router.get('/schedule/:id', patient.getTherapistSchedule);

module.exports = router