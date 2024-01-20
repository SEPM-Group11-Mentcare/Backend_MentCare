const express = require('express')
const router = express.Router()
const admin = require('../controllers/adminControllers')
const { isAuthenticated } = require('../middlewares/auth')

router.get('/requests', isAuthenticated, admin.getTherapistRequestList)

router.put('/updatestatus', isAuthenticated, admin.changeTherapistStatus)

router.get('/appointments', isAuthenticated, admin.getAppointments)

router.put('/updateappointment', isAuthenticated, admin.changeAppointmentStatus)

module.exports = router