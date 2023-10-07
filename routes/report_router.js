const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report_controller');

router.get('/:status', reportController.report);

module.exports = router;

