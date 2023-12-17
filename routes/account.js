const express = require('express')
const router = express.Router()
const account = require('../controllers/accountControllers')

router.post('/signup', account.signup)

router.post('/signin', account.signin)

// router.post('/updatestatus', account.changeTherapistStatus)

// router.get('/gettherapistrequest', account.getTherapistRequestList)

module.exports = router