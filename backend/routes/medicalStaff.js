const express = require('express');
const router = express.Router();
const medicalStaffController = require('../controllers/medicalStaffController.js');

// Create a new medical staff member
router.post('/', medicalStaffController.createMedicalStaff);

// Get all medical staff members
router.get('/', medicalStaffController.getMedicalStaff);

// Get a medical staff member by ID
router.get('/:id', medicalStaffController.getMedicalStaffById);

// Update a medical staff member by ID
router.put('/:id', medicalStaffController.updateMedicalStaff);

// Delete a medical staff member by ID
router.delete('/:id', medicalStaffController.deleteMedicalStaff);

module.exports = router;