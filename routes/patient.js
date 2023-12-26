const express = require('express');
const router = express.Router();
const patient = require('../controllers/patientController');
const {isAuthenticated} = require('../middlewares/auth');

/* Define patient api */
router.get('/profile', isAuthenticated, patient.getPatient);
router.put('/profile', isAuthenticated, patient.updateProfile);

module.exports = router;


