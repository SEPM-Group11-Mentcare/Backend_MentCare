const express = require('express')
const router = express.Router()
const admin = require('../controllers/adminControllers')

router.get('/requests', admin.getTherapistRequestList)

router.put('/updatestatus', admin.changeTherapistStatus)

router.get('/appointments', admin.getAppointments)

router.put('/updateappointment', admin.changeAppointmentStatus)

module.exports = router