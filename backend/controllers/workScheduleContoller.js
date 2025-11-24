const WorkSchedule = require('../models/workSchedule.js');

// Create a new work schedule
exports.createWorkSchedule = async (req, res) => {
    const { user, availableSlots } = req.body;

    try {
        const newSchedule = new WorkSchedule({
            user,
            availableSlots
        });

        const savedSchedule = await newSchedule.save();
        await savedSchedule.populate('user');

        res.status(201).json(savedSchedule);
    } catch (error) {
        console.error('Error creating work schedule:', error);
        res.status(500).json({ message: 'Server Error: Unable to create work schedule' });
    }
};

// Get all work schedules
exports.getWorkSchedules = async (req, res) => {
    try {
        const schedules = await WorkSchedule.find()
            .populate('user')
            .sort({ createdAt: -1 });

        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching work schedules:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch work schedules' });
    }
};

// Get a single work schedule by ID
exports.getWorkScheduleById = async (req, res) => {
    try {
        const schedule = await WorkSchedule.findById(req.params.id).populate('user');

        if (!schedule) {
            return res.status(404).json({ message: 'Work schedule not found' });
        }

        res.status(200).json(schedule);
    } catch (error) {
        console.error('Error fetching work schedule:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch work schedule' });
    }
};

// Update a work schedule by ID
exports.updateWorkSchedule = async (req, res) => {
    try {
        const updatedSchedule = await WorkSchedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('user');

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Work schedule not found' });
        }

        res.status(200).json(updatedSchedule);
    } catch (error) {
        console.error('Error updating work schedule:', error);
        res.status(500).json({ message: 'Server Error: Unable to update work schedule' });
    }
};

// Delete a work schedule by ID
exports.deleteWorkSchedule = async (req, res) => {
    try {
        const deletedSchedule = await WorkSchedule.findByIdAndDelete(req.params.id);

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Work schedule not found' });
        }

        res.status(200).json({ message: 'Work schedule deleted successfully' });
    } catch (error) {
        console.error('Error deleting work schedule:', error);
        res.status(500).json({ message: 'Server Error: Unable to delete work schedule' });
    }
};
