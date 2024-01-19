const express = require("express");
const router = express.Router();
const therapist = require("../controllers/therapistController");
const { isAuthenticated } = require("../middlewares/auth");

// router.get('/view', therapist.getTherapists);
// router.get('/profile', therapist.getTherapist);


// router.get('/profile', therapist.getTherapist);


// router.put("/profile", therapist.updateProfile);

router.post("/schedule", isAuthenticated, therapist.setSchedule);

router.get("/schedules", isAuthenticated, therapist.getSchedule);

router.delete("/delete/:id", isAuthenticated, therapist.deleteSchedule);

router.get('/requests', isAuthenticated, therapist.getRequestList);

router.get('/patients', isAuthenticated, therapist.getPatientList);

router.put('/profile', isAuthenticated, therapist.updateProfile);
// router.get('/:id', therapist.getTherapist);

module.exports = router;
