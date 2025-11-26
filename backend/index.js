const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.js');
const appointmentRoutes = require('./routes/appointment.js');
const bookingRoutes = require('./routes/booking.js');
const doctorNotesRoutes = require('./routes/doctorNotes.js');
const medicalStaffRoutes = require('./routes/medicalStaff.js');
const patientRoutes = require('./routes/patient.model.js');
const userRoutes = require('./routes/user.model.js');
const workScheduleRoutes = require('./routes/workSchedule.js');


dotenv.config({ path: './config.env' }); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

//CORS configuration
const corsOptions = {
    origin:true, // Allow requests from this origin
    credentials:true, // Allow cookies to be sent
};

//middleware 
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser()); 

//routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/doctorNotes', doctorNotesRoutes);
app.use('/api/medicalStaff', medicalStaffRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workSchedules', workScheduleRoutes);


//Health check route
app.get('/', (req, res) => {
    res.send('Kaga Health Backend is running');
});

// database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    } 
};

//start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});