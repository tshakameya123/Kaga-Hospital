# Kaga Hospital Management System - Setup Guide

## Backend Setup with MongoDB

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally

### Installation Steps

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Configure Environment Variables**
Edit `backend/config.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/kaga-hospital
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

3. **Start MongoDB**
```bash
# On macOS/Linux
sudo systemctl start mongodb

# On Windows
net start MongoDB
```

4. **Seed Doctor Accounts**
```bash
cd backend
node scripts/seedDoctors.js
```

5. **Start Backend Server**
```bash
cd backend
npm run dev
```

Backend should now be running on http://localhost:5000

## Frontend Setup

1. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

2. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```

Frontend should now be running on http://localhost:5173

## Testing the Application

### Doctor Login
Use any of these usernames with password `123456`:
- ben, sarah, robert, michael, lisa, emily, david, jennifer, mark, james, maria, amanda, kevin, rachel, thomas, susan, laura

### Patient Registration
1. Go to the landing page
2. Click "Sign Up"
3. Fill in:
   - Username: Any name
   - Email: Valid email format
   - Password: At least 6 characters
   - Confirm Password: Same as password
4. Click "Create Account"

### Patient Login
After registration, use your email and password to login.

## Features Implemented

### Authentication
- JWT-based authentication
- Role-based access control (doctor/patient)
- Secure password hashing with bcrypt
- Token persistence in localStorage

### Database Integration
- User accounts stored in MongoDB
- Patient profiles automatically created on registration
- Doctor accounts pre-seeded with medical staff profiles
- All data persisted in database

### API Endpoints

**Authentication**
- POST `/api/auth/register` - Patient registration
- POST `/api/auth/login` - Patient login
- POST `/api/auth/doctor-login` - Doctor login
- GET `/api/auth/me` - Get current user (protected)
- POST `/api/auth/logout` - Logout

**Appointments**
- GET `/api/appointments` - Get all appointments
- POST `/api/appointments` - Create appointment
- GET `/api/appointments/:id` - Get appointment by ID
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Delete appointment

**Patients**
- GET `/api/patients` - Get all patients (with pagination)
- GET `/api/patients/:id` - Get patient by ID
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient

**Medical Staff**
- GET `/api/medicalStaff` - Get all medical staff
- GET `/api/medicalStaff/:id` - Get medical staff by ID

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in config.env
- Verify MongoDB is accessible on localhost:27017

### CORS Error
- Backend should have CORS enabled with `origin: true`
- Frontend API_URL should match backend URL (http://localhost:5000/api)

### Authentication Not Working
- Check browser console for errors
- Verify token is stored in localStorage
- Check backend logs for authentication errors

## Security Notes

- Change JWT_SECRET in production
- Never commit config.env to version control
- Use HTTPS in production
- Implement rate limiting for login endpoints
- Add input validation middleware
- Regular security audits
