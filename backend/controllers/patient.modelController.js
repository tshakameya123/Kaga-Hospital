const Patient = require('../models/patient.model.js');

// Create a new patient
exports.createPatient = async (req, res) => {
    const { user, dateOfBirth, gender, phoneNumber, address, medicalHistory } = req.body;

    try {
        const newPatient = new Patient({
            user,
            dateOfBirth,
            gender,
            phoneNumber,
            address,
            medicalHistory
        });

        const savedPatient = await newPatient.save();
        // populate user before sending back (optional)
        await savedPatient.populate('user');

        res.status(201).json(savedPatient);
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ message: 'Server Error: Unable to create patient' });
    }
};

// Get all patients (with optional pagination and phone search)
exports.getPatients = async (req, res) => {
    try {
        const { page = 1, limit = 25, phone } = req.query;
        const query = {};

        if (phone) {
            // simple exact match; change to regex for partial matches if desired
            query.phoneNumber = phone;
        }

        const patients = await Patient.find(query)
            .populate('user')
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        // return total count optionally for client-side pagination
        const total = await Patient.countDocuments(query);

        res.status(200).json({ data: patients, meta: { page: Number(page), limit: Number(limit), total } });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch patients' });
    }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('user');

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        console.error('Error fetching patient:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch patient' });
    }
};

// Update a patient by ID
exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('user');

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ message: 'Server Error: Unable to update patient' });
    }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ message: 'Server Error: Unable to delete patient' });
    }
};
