const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    query: String,
    message: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;