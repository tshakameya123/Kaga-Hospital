const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Users = require('../models/user.model');
const MedicalStaff = require('../models/medicalStaff');

dotenv.config({ path: './config.env' });

const doctors = [
  { username: 'ben', name: 'Dr. Ben Mitchell', department: 'General Medicine', email: 'ben.mitchell@kagahospital.com' },
  { username: 'sarah', name: 'Dr. Sarah Johnson', department: 'Cardiology', email: 'sarah.johnson@kagahospital.com' },
  { username: 'robert', name: 'Dr. Robert Miller', department: 'Cardiology', email: 'robert.miller@kagahospital.com' },
  { username: 'michael', name: 'Dr. Michael Chen', department: 'General Medicine', email: 'michael.chen@kagahospital.com' },
  { username: 'lisa', name: 'Dr. Lisa Wang', department: 'General Medicine', email: 'lisa.wang@kagahospital.com' },
  { username: 'emily', name: 'Dr. Emily Rodriguez', department: 'Dental', email: 'emily.rodriguez@kagahospital.com' },
  { username: 'david', name: 'Dr. David Kim', department: 'Dental', email: 'david.kim@kagahospital.com' },
  { username: 'jennifer', name: 'Dr. Jennifer Lee', department: 'Pediatrics', email: 'jennifer.lee@kagahospital.com' },
  { username: 'mark', name: 'Dr. Mark Thompson', department: 'Pediatrics', email: 'mark.thompson@kagahospital.com' },
  { username: 'james', name: 'Dr. James Wilson', department: 'Orthopedics', email: 'james.wilson@kagahospital.com' },
  { username: 'maria', name: 'Dr. Maria Garcia', department: 'Orthopedics', email: 'maria.garcia@kagahospital.com' },
  { username: 'amanda', name: 'Dr. Amanda Davis', department: 'Dermatology', email: 'amanda.davis@kagahospital.com' },
  { username: 'kevin', name: 'Dr. Kevin Brown', department: 'Dermatology', email: 'kevin.brown@kagahospital.com' },
  { username: 'rachel', name: 'Dr. Rachel Adams', department: 'Neurology', email: 'rachel.adams@kagahospital.com' },
  { username: 'thomas', name: 'Dr. Thomas Clark', department: 'Neurology', email: 'thomas.clark@kagahospital.com' },
  { username: 'susan', name: 'Dr. Susan Martinez', department: 'Gynecology', email: 'susan.martinez@kagahospital.com' },
  { username: 'laura', name: 'Dr. Laura Anderson', department: 'Gynecology', email: 'laura.anderson@kagahospital.com' }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Users.deleteMany({ role: 'doctor' });
    await MedicalStaff.deleteMany({});
    console.log('Cleared existing doctor data');

    for (const doctor of doctors) {
      const user = await Users.create({
        name: doctor.name,
        email: doctor.email,
        password: '123456',
        role: 'doctor'
      });

      await MedicalStaff.create({
        user: user._id,
        department: doctor.department,
        email: doctor.email,
        phoneNumber: '+256700000000',
        bio: `Experienced ${doctor.department} specialist`
      });

      console.log(`Created doctor: ${doctor.name}`);
    }

    console.log('All doctors seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding doctors:', error);
    process.exit(1);
  }
};

seedDoctors();
