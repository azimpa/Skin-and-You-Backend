const express = require('express');
const router = express.Router()
const { createAppointment, getAppointment } = require('../controllers/appointmentController.js')

router.post('/', createAppointment);

module.exports = router;

