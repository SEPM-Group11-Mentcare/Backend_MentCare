const express = require('express')
const router = express.Router()
const account = require('../controllers/accountControllers')

router.post('/signup/:role', account.signup)

router.post('/signin', account.signin)

module.exports = router