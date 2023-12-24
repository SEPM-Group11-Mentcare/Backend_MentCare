const express = require('express')
const router = express.Router()
const therapist = require('../controllers/therapistController')

router.post('/schedule', therapist.setSchedule)

module.exports = router