const express = require('express')
const router = express.Router()
const account = require('../controllers/accountControllers')
const { isAuthenticated } = require('../middlewares/auth')

router.post('/signup/:role', account.signup)

router.post('/signin', account.signin)

router.get('/profile', isAuthenticated, account.getUserInfo)

// router.post('/updatestatus', account.changeTherapistStatus)

// router.get('/gettherapistrequest', account.getTherapistRequestList)

module.exports = router