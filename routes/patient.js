const express = require('express')
const router = express.Router()
const patient = require('../controllers/patientController')
const { isAuthenticated } = require("../middlewares/auth")

router.post('/booking', isAuthenticated, patient.bookAppointment);

router.get('/view', isAuthenticated, patient.getTherapists);

router.get('/therapist/:id', isAuthenticated, patient.getTherapist);

router.get('/schedule/:id', isAuthenticated, patient.getTherapistSchedule);

router.put('/profile', isAuthenticated, patient.updateProfile);

router.get('/appointments', isAuthenticated, patient.getAppointment);

router.put('/appointment', isAuthenticated, patient.changeAppointmentStatus);

router.get("/access", isAuthenticated, patient.getAccessList);

router.put("/removeaccess/:id", isAuthenticated, patient.removeAccess);

module.exports = router;


