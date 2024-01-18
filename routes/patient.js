const express = require('express')
const router = express.Router()
const patient = require('../controllers/patientController')
const { isAuthenticated } = require("../middlewares/auth")
const uploadImg = require('../utils/upload');

router.post('/booking', patient.bookAppointment);

router.get('/view', patient.getTherapists);

router.get('/therapist/:id', patient.getTherapist);

router.get('/schedule/:id', patient.getTherapistSchedule);

router.put('/profile', uploadImg, patient.updateProfile);

router.get('/appointments', patient.getAppointment);

router.put('/appointment', patient.changeAppointmentStatus);

module.exports = router;


