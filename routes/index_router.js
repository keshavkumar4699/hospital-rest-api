const express = require('express');
const router = express.Router();

router.use('/doctors', require('./doctors_router'));
router.use('/patients', require('./patients_router'));
router.use('/reports', require('./reports_router'));  

module.exports = router;