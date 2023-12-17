const express = require('express')
const router = express.Router()
const admin = require('../controllers/adminControllers')

router.get("/", async(req) => {
  console.log("12345")
})
router.get('/requests', admin.getTherapistRequestList)

router.put('/updatestatus', admin.changeTherapistStatus)

module.exports = router