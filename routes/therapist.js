const express = require("express");
const router = express.Router();
const therapist = require("../controllers/therapistController");
const { isAuthenticated } = require("../middlewares/auth");

// router.get('/view', therapist.getTherapists);
// router.get('/profile', therapist.getTherapist);


// router.get('/profile', therapist.getTherapist);


// router.put("/profile", therapist.updateProfile);

router.post("/schedule", therapist.setSchedule);

router.get("/schedules", therapist.getSchedule);

router.delete("/delete/:id", therapist.deleteSchedule);

router.get('/requests', therapist.getRequestList);


// router.get('/:id', therapist.getTherapist);

module.exports = router;
