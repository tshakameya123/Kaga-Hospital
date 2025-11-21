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
        type: string 
    },
    email: {
        type: string,
        required: true,
        lowercase: true
    },
    bio: {
        type: string
    }
});

module.exports = mongoose.model('medicalStaff', medicalStaffSchema);
