const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true 
    },
    dateOfBirth: {
        type: Date 
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String 
    },
    medicalHistory: {
        type: String 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patient', patientSchema);