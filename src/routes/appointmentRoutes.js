const express = require('express');
const router = express.Router();
const { getAvailableSlots, createAppointment } = require('../controllers/appointmentController.js');

router.get('/available-slots', getAvailableSlots);
router.post('/', createAppointment);

module.exports = router;