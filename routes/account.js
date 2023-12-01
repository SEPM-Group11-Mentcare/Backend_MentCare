const express = require('express')
const router = express.Router()
const account = require('../controllers/accountControllers')

router.post('/signup', account.signup)

router.post('/signin', account.signin)

module.exports = router