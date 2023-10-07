const express = require('express');
const router = express.Router();

router.use('/doctor', require('./doctor_router'));
router.use('/patient', require('./patient_router'));
router.use('/report', require('./report_router'));  

module.exports = router;