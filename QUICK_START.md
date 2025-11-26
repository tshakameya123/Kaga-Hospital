# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Setup (5 minutes)

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure MongoDB
```bash
# Start MongoDB
sudo systemctl start mongodb  # Linux
net start MongoDB             # Windows
```

### 3. Seed Doctor Accounts
```bash
cd backend
node scripts/seedDoctors.js
```

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Running on http://localhost:5173
```

## Test Credentials

### Doctor Login
- Username: `ben` (or any from: sarah, robert, michael, lisa, emily, david, jennifer, mark, james, maria, amanda, kevin, rachel, thomas, susan, laura)
- Password: `123456`

### Patient Registration
1. Click "Sign Up"
2. Enter any username, valid email, password (6+ chars)
3. Account created and auto-login

## Architecture

```
Frontend (React)
    ↓ HTTP Requests
Backend API (Express)
    ↓ Mongoose ODM
MongoDB Database
```

## API Base URL
`http://localhost:5000/api`

## Key Endpoints
- POST `/auth/register` - Patient registration
- POST `/auth/login` - Patient login
- POST `/auth/doctor-login` - Doctor login
- GET `/auth/me` - Get current user (requires JWT)

## Token Storage
JWT tokens stored in browser localStorage automatically.

## Troubleshooting

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
systemctl status mongodb  # Linux
sc query MongoDB          # Windows
```

**Port Already in Use:**
```bash
# Change PORT in backend/config.env
# Default: 5000
```

**CORS Error:**
- Ensure backend is running on port 5000
- Frontend should be on port 5173
- CORS is configured with `origin: true`

## Next Steps
- See SETUP.md for detailed configuration
- See IMPLEMENTATION_SUMMARY.md for technical details
