const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./config/dbconfig.js')
const appointmentRouter = require('./routes/appointmentRoutes.js')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDb()

app.use('/api/appointments', appointmentRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});