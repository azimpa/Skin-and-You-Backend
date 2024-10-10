const Appointment = require('../models/Appointment.js')


const getAvailableSlots = async (req, res) => {
    try {
        const { date } = req.query;
        const bookedAppointments = await Appointment.find({ date: new Date(date) });

        const allSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

        const availableSlots = allSlots.filter(slot =>
            !bookedAppointments.some(app => app.time === slot)
        );

        res.json(availableSlots);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching available slots' });
    }
};


const createAppointment = async (req, res) => {
    try {
        const { date, time } = req.body;
        // const appointmentDate = new Date(date);

        // const today = new Date();
        // today.setHours(0, 0, 0, 0);

        // if (appointmentDate < today) {
        //     return res.status(400).json({ message: 'Cannot book appointments for past dates.' });
        // }

        const existingAppointment = await Appointment.findOne({ date: new Date(date), time });
        if (existingAppointment) {
            return res.status(400).json({ message: 'This slot is already booked. Please choose another.' });
        }

        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error booking appointment' });
    }
};

module.exports = { getAvailableSlots, createAppointment };