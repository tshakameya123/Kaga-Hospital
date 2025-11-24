const Appointment = require('../models/appointment.js');

// Create a new appointment
exports.createAppointment = async (req, res) => {

    const { patient, department, doctor, appointmentDate, slot, reason, status } = req.body;
    try {
        // Create new appointment instance
        const newAppointment = new Appointment({
            patient,
            department,
            doctor,
            appointmentDate,
            slot,
            reason,
            status,
        });

        // Save to database
        const savedAppointment = await newAppointment.save();
        // Send success response with saved data
        res.status(201).json(savedAppointment);

    } catch (error) {
        console.error('Error creating appointment:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to create appointment' });
    }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
    try {
        // Fetch all appointments and populate referenced documents
        const appointments = await Appointment.find()
            .populate('patient')
            .populate('doctor');
        // Send success response with all appointments
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to fetch appointments' });
    }
};

// Get a single appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        // Find appointment by ID and populate referenced documents
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient')
            .populate('doctor');
        
        // Check if appointment exists
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        // Send success response with appointment
        res.status(200).json(appointment);
    } catch (error) {
        console.error('Error fetching appointment:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to fetch appointment' });
    }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
    try {
        // Find and update appointment, return updated document
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        
        // Check if appointment exists
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        // Send success response with updated appointment
        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error updating appointment:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to update appointment' });
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    try {
        // Find and delete appointment
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        
        // Check if appointment exists
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        // Send success response
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to delete appointment' });
    }
};