const express = require('express');
const router = express.Router();

const doctorConroller = require('../controllers/doctor_controller');

router.post('/register', doctorConroller.register);
router.post('/login/:id', doctorConroller.login);

module.exports = router;