const MedicalStaff = require('../models/medicalStaff.js');

// Create a new medical staff member
exports.createMedicalStaff = async (req, res) => {

    const { user, department, phoneNumber, email, bio } = req.body;
    try {
        // Create new medical staff instance
        const newMedicalStaff = new MedicalStaff({
            user,
            department,
            phoneNumber,
            email,
            bio,
        });

        // Save to database
        const savedMedicalStaff = await newMedicalStaff.save();
        // Send success response with saved data
        res.status(201).json(savedMedicalStaff);

    } catch (error) {
        console.error('Error creating medical staff:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to create medical staff' });
    }
};

// Get all medical staff members
exports.getMedicalStaff = async (req, res) => {
    try {
        // Fetch all medical staff and populate user reference
        const medicalStaff = await MedicalStaff.find()
            .populate('user');
        // Send success response with all medical staff
        res.status(200).json(medicalStaff);
    } catch (error) {
        console.error('Error fetching medical staff:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to fetch medical staff' });
    }
};

// Get a single medical staff member by ID
exports.getMedicalStaffById = async (req, res) => {
    try {
        // Find medical staff by ID and populate user reference
        const medicalStaff = await MedicalStaff.findById(req.params.id)
            .populate('user');
        
        // Check if medical staff exists
        if (!medicalStaff) {
            return res.status(404).json({ message: 'Medical staff not found' });
        }
        
        // Send success response with medical staff
        res.status(200).json(medicalStaff);
    } catch (error) {
        console.error('Error fetching medical staff:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to fetch medical staff' });
    }
};

// Update a medical staff member by ID
exports.updateMedicalStaff = async (req, res) => {
    try {
        // Find and update medical staff, return updated document
        const updatedMedicalStaff = await MedicalStaff.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        
        // Check if medical staff exists
        if (!updatedMedicalStaff) {
            return res.status(404).json({ message: 'Medical staff not found' });
        }
        
        // Send success response with updated medical staff
        res.status(200).json(updatedMedicalStaff);
    } catch (error) {
        console.error('Error updating medical staff:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to update medical staff' });
    }
};

// Delete a medical staff member by ID
exports.deleteMedicalStaff = async (req, res) => {
    try {
        // Find and delete medical staff
        const deletedMedicalStaff = await MedicalStaff.findByIdAndDelete(req.params.id);
        
        // Check if medical staff exists
        if (!deletedMedicalStaff) {
            return res.status(404).json({ message: 'Medical staff not found' });
        }
        
        // Send success response
        res.status(200).json({ message: 'Medical staff deleted successfully' });
    } catch (error) {
        console.error('Error deleting medical staff:', error);
        // Send error response
        res.status(500).json({ message: 'Server Error: Unable to delete medical staff' });
    }
};