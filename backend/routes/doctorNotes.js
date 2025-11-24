const express = require('express');
const router = express.Router();
const doctorNotesController = require('../controllers/doctorNotesController.js');

// Create a new doctor note
router.post('/', doctorNotesController.createDoctorNotes);

// Get all doctor notes
router.get('/', doctorNotesController.getDoctorNotes);

// Get a doctor note by ID
router.get('/:id', doctorNotesController.getDoctorNotesById);

// Update a doctor note by ID
router.put('/:id', doctorNotesController.updateDoctorNotes);

// Delete a doctor note by ID
router.delete('/:id', doctorNotesController.deleteDoctorNotes);

module.exports = router;