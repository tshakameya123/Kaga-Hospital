const mongoose = require('mongoose');

const medicalStaffSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    department: {
        type: String,
        required: true 
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    bio: {
        type: String
    }
});

module.exports = mongoose.model('medicalStaff', medicalStaffSchema);
