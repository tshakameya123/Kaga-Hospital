const mongoose = require('mongoose');

const workScheduleSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    availableSlots: [{
        day: {
            type: String
        },
        slots: [{
            type: String
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('workSchedule', workScheduleSchema);