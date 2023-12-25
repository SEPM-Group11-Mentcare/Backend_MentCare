const express = require('express');
const router = express.Router();
const therapistController = require('../controllers/therapistController');

// View all therapists
router.get('/therapists', therapistController.getTherapists);
// View a therapist' details
router.get('/therapists/:id', therapistController.getTherapist);

module.exports = router;