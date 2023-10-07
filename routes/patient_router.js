const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patient_controller');

router.post('/register', patientController.register);
router.get('/:id/create_report', patientController.create_report);
router.get('/:id/all_reports', patientController.all_reports);

module.exports = router;