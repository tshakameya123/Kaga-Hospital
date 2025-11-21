const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true 
    },
    dateOfBirth: {
        type: date 
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: string 
    },
    medicalHistory: {
        type: string 
    },
    createdAt: {
        type: date,
        default: date.now
    }
});

module.exports = mongoose.model('Patient', patientSchema);