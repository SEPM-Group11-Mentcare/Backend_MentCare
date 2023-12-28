const express = require('express')
const router = express.Router()
const patient = require('../controllers/patientController')
const { isAuthenticated } = require("../middlewares/auth")

router.post('/booking', patient.bookAppointment);

router.get('/view', patient.getTherapists);

router.get('/therapist/:id', patient.getTherapist);

router.get('/schedule/:id', patient.getTherapistSchedule);


/* Define patient api */
router.get('/profile', isAuthenticated, patient.getPatient);
router.put('/profile', isAuthenticated, patient.updateProfile);

module.exports = router;


