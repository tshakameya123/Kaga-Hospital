const DoctorNotes = require('../models/doctorNotes.js');

//controller for doctor notes
exports.createDoctorNotes = async (req, res) => {

    const { appointment, doctor, patient, notes, medicines } = req.body;
    try {
        // Create a new DoctorNotes document
        const newDoctorNotes = new DoctorNotes({
            appointment,
            doctor,
            patient,
            notes,
            medicines,
        });

        // Save the document to the database
        const savedDoctorNotes = await newDoctorNotes.save();
        res.status(201).json(savedDoctorNotes);

    } catch (error) {
        console.error('Error creating doctor notes:', error);
        //send error response
        res.status(500).json({ message: 'Server Error: Unable to create doctor notes' });
    }
};

// Get all doctor notes
exports.getDoctorNotes = async (req, res) => {
    try {
        // Fetch all DoctorNotes documents from the database
        const doctorNotes = await DoctorNotes.find()
            .populate('appointment')
            .populate('doctor')
            .populate('patient');

        //send response
        res.status(200).json(doctorNotes);
    } catch (error) {
        console.error('Error fetching doctor notes:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch doctor notes' });
    }
};

// Get doctor notes by ID
exports.getDoctorNotesById = async (req, res) => {
    try {
        // Fetch the DoctorNotes document by ID
        const doctorNotes = await DoctorNotes.findById(req.params.id)
            .populate('appointment')
            .populate('doctor')
            .populate('patient');
        
        // If not found, send 404 response
        if (!doctorNotes) {
            return res.status(404).json({ message: 'Doctor notes not found' });
        }
        
        //send response
        res.status(200).json(doctorNotes);
    } catch (error) {
        console.error('Error fetching doctor notes:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch doctor notes' });
    }
};

// Update doctor notes by ID
exports.updateDoctorNotes = async (req, res) => {
    try {
        // Update the DoctorNotes document by ID
        const updatedDoctorNotes = await DoctorNotes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        
        // If not found, send 404 response
        if (!updatedDoctorNotes) {
            return res.status(404).json({ message: 'Doctor notes not found' });
        }
        
        //send response
        res.status(200).json(updatedDoctorNotes);
    } catch (error) {
        console.error('Error updating doctor notes:', error);
        res.status(500).json({ message: 'Server Error: Unable to update doctor notes' });
    }
};

// Delete doctor notes by ID
exports.deleteDoctorNotes = async (req, res) => {
    try {
        const deletedDoctorNotes = await DoctorNotes.findByIdAndDelete(req.params.id);
        
        if (!deletedDoctorNotes) {
            return res.status(404).json({ message: 'Doctor notes not found' });
        }
        
        res.status(200).json({ message: 'Doctor notes deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor notes:', error);
        res.status(500).json({ message: 'Server Error: Unable to delete doctor notes' });
    }
};