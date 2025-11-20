const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Patient', 
    required: true 
  },
  department: {
    type: String,
    required: true
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor',  
  },
  appointmentDate: { 
    type: Date, 
    required: true 
  },
  slot: { 
    type: String
  },
  reason: { 
    type: String
  },
  status: { 
    type: String, 
    enum: ['Pending','Confirmed','Cancelled','Completed'], 
    default: 'Pending' 
  },
  createdAt: { type: Date, 
    default: Date.now
  }
});

// Unique index to prevent double-booking a doctor at same appointmentDate
appointmentSchema.index({ doctor: 1, appointmentDate: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);