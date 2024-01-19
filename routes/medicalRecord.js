const express = require('express');
const router = express.Router();
const medicalRecord = require('../controllers/medicalRecordController');
const { isAuthenticated } = require('../middlewares/auth');

router.post('/create', isAuthenticated, medicalRecord.create);

router.get('/patient/:id', isAuthenticated, medicalRecord.viewRecords);

router.get('/:id', isAuthenticated, medicalRecord.viewRecord);

router.put('/:id', isAuthenticated, medicalRecord.update);

router.delete('/:id', isAuthenticated, medicalRecord.delete);

module.exports = router;