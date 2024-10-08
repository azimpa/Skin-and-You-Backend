const Appointment = require('../models/Appointment.js')

const createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error booking appointment' });
    }
}

module.exports = {createAppointment}