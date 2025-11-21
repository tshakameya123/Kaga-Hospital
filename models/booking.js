const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  appointment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment', 
    required: true
  },
  amount: { 
    type: Number, 
    required: true
  },
  method: { 
    type: String, 
    enum: ['card','mobile_money'], 
    default: 'mobile_money'
  },
  status: { 
    type: String, 
    enum: ['Pending','Paid','Failed'], 
    default: 'Pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);