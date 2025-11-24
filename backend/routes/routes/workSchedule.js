const express = require('express');
const router = express.Router();
const workScheduleController = require('../controllers/workScheduleController.js');

// Create a new work schedule
router.post('/', workScheduleController.createWorkSchedule);

// Get all work schedules
router.get('/', workScheduleController.getWorkSchedules);

// Get a work schedule by ID
router.get('/:id', workScheduleController.getWorkScheduleById);

// Update a work schedule by ID
router.put('/:id', workScheduleController.updateWorkSchedule);

// Delete a work schedule by ID
router.delete('/:id', workScheduleController.deleteWorkSchedule);

module.exports = router;