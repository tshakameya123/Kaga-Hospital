const mongoose = require('mongoose');

const doctorNotesSchema = new mongoose.Schema({
  appointment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment', 
    required: true
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'medicalStaff', 
    required: true
  },
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true
  },
  notes: { 
    type: String
  },
  medicines: [{ 
    name: String, 
    dose: String, 
    frequency: String, 
    duration: String
  }],
  createdAt: { 
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('doctorNotes', prescriptionSchema);