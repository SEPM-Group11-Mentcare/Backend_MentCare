const express = require('express')
const router = express.Router()
const therapist = require('../controllers/therapistController')

router.get('/view', therapist.getTherapists);

router.get('/:id', therapist.getTherapist);

router.post('/schedule', therapist.setSchedule)

router.get('/schedules', therapist.getSchedule);

router.delete('/delete/:id', therapist.deleteSchedule);

module.exports = router