const express = require('express')
const router = express.Router()
const patient = require('../controllers/patientController')
const { isAuthenticated } = require("../middlewares/auth")

router.get('/:id', patient.getScheduleTime);

module.exports = router