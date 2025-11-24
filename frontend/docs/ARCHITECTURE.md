# Architecture & Code Flow Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     REACT APPLICATION                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           UserProvider (Context API)                  │  │
│  │  - Manages user authentication state                  │  │
│  │  - Provides loginDoctor, loginPatient, logout         │  │
│  │  - Stores user info: name, type, email               │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Router (Routes)                    │  │
│  │  - / → Login page (public)                           │  │
│  │  - /home → Home (patient protected)                  │  │
│  │  - /book → Book (patient protected)                  │  │
│  │  - /doctors-portal → Doctors (doctor protected)      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Route Protection Components                │  │
│  │  - PatientRoute: Checks isPatient()                  │  │
│  │  - DoctorRoute: Checks isDoctor()                    │  │
│  │  - Redirects to / if unauthorized                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        Page Components (Role-Specific)               │  │
│  │  - Login: Dual auth (doctor + patient)               │  │
│  │  - Home: Patient dashboard                           │  │
│  │  - Book: Appointment booking                         │  │
│  │  - Doctors: Doctor portal with availability          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

### Doctor Login Flow

```
Doctor Login Page
    ↓
Select Name (Dropdown of 16 doctors)
    ↓
Enter Password
    ↓
Click "Login"
    ↓
validate in loginDoctor():
  - Check if doctor exists in DOCTOR_LIST
  - Verify password (all use "password123")
    ↓
SUCCESS: {
  - Set user: { type: 'doctor', name: 'Dr. X', isLoggedIn: true }
  - Navigate to /doctors-portal
}

FAILURE: {
  - Show error "Invalid credentials"
  - Stay on login page
}
```

### Patient Login Flow

```
Patient Login Page
    ↓
Enter Email + Password
    ↓
Click "Login"
    ↓
validate in loginPatient():
  - Check email format (basic validation)
  - Check password length (min 6)
    ↓
SUCCESS: {
  - Set user: { type: 'patient', email: 'test@example.com', isLoggedIn: true }
  - Navigate to /home
}

FAILURE: {
  - Show validation errors
  - Stay on login page
}
```

### Patient Signup Flow

```
Patient Signup Page
    ↓
Enter Name, Email, Password, Confirm Password
    ↓
Click "Create Account"
    ↓
Validate:
  - Name not empty
  - Email format valid
  - Password min 6 chars
  - Passwords match
    ↓
SUCCESS: {
  - Create user: { type: 'patient', name, email, password }
  - Set user logged in
  - Navigate to /home
}

FAILURE: {
  - Show validation errors
  - Stay on signup page
}
```

---

## Doctor Portal Flow

```
Doctor Portal (/doctors-portal)
    ↓
1. Component Mounts
    - Get doctor name from useUser() context
    - Load saved availability from localStorage
    - Initialize appointments (mock data)
    ↓
2. Availability Section
    User sets work days and hours
    ↓
    Save Availability:
      - Collect selected days & times
      - localStorage.setItem("doctorAvailability-{name}", data)
      - Show success message
    ↓
3. Calendar Section
    - React Calendar component
    - Highlight available days (green)
    - User clicks date
    ↓
4. Appointments Section
    - Show all appointments for selected date
    - For each appointment:
      ┌─ Patient Name
      ├─ Patient Email
      ├─ Appointment Time
      ├─ Reason for Visit
      └─ Action Buttons
    ↓
5. Action Buttons
    ┌─ Notes
    │  - Open modal
    │  - Load saved notes from localStorage
    │  - User edits notes
    │  - Save: localStorage.setItem("doctorNotes-{id}", notes)
    │
    ├─ Clear
    │  - Mark appointment as cleared
    │  - Update UI to show cleared status
    │
    └─ Cancel
       - Mark appointment as cancelled
       - Update UI to show cancelled status
```

---

## Patient Portal Flow

```
Patient Home (/home)
    ↓
1. Component Mounts
    - Load all patient's appointments
    - Initialize calendar
    ↓
2. Hero Section
    - Display welcome message
    - Show "Book Appointment" button
    ↓
3. Calendar & Appointments
    - Show calendar with appointment dates marked
    - Display all upcoming appointments
    ↓
4. Appointment Cards
    For each appointment:
      ├─ Doctor name
      ├─ Department
      ├─ Date & Time
      ├─ Status
      └─ Cancel Button
    ↓
5. Book New Appointment
    Navigate to /book:
    - Select doctor from available list
    - Choose date from doctor's available days
    - Select time slot
    - Confirm booking
```

---

## Navigation & Role-Based Access

### Navbar Components Based on User Role

```
┌─ useUser() ────────────────────────────────────┐
│                                                 │
│  IF Doctor Authenticated:                      │
│  ├─ Navbar shows: "Portal" | "Logout"         │
│  ├─ Home link NOT shown                        │
│  └─ Accessing /home → Redirects to /          │
│                                                 │
│  IF Patient Authenticated:                     │
│  ├─ Navbar shows: "Home" | "Book" | "Logout"  │
│  ├─ Portal link NOT shown                      │
│  └─ Accessing /doctors-portal → Redirects to / │
│                                                 │
│  IF Not Authenticated:                         │
│  ├─ Only shows Login link (if visible)         │
│  └─ Accessing protected routes → Redirects to /│
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Route Protection Logic

### PatientRoute Component

```javascript
const PatientRoute = ({ element }) => {
  const { isPatient } = useUser();

  if (isPatient()) {
    return element; // Show patient page
  } else {
    return <Navigate to="/" />; // Redirect to login
  }
};
```

### DoctorRoute Component

```javascript
const DoctorRoute = ({ element }) => {
  const { isDoctor } = useUser();

  if (isDoctor()) {
    return element; // Show doctor page
  } else {
    return <Navigate to="/" />; // Redirect to login
  }
};
```

### Usage in Routes

```javascript
<Routes>
  {/* Public routes */}
  <Route path="/" element={<Login />} />

  {/* Patient-only routes */}
  <Route path="/home" element={<PatientRoute element={<Home />} />} />
  <Route path="/book" element={<PatientRoute element={<Book />} />} />

  {/* Doctor-only routes */}
  <Route
    path="/doctors-portal"
    element={<DoctorRoute element={<Doctors />} />}
  />
</Routes>
```

---

## Data Storage (localStorage)

### Key Structures

```javascript
// Doctor Availability
localStorage key: "doctorAvailability-Dr. Sarah Johnson"
{
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  from: "09:00",
  to: "17:00"
}

// Clinical Notes
localStorage key: "doctorNotes-1"
"Patient presented with symptoms of..."

// User Session (implicit)
User data stored in React Context
Persists only for current session
Cleared on page refresh (demo mode)
```

---

## Component Hierarchy

```
App
├── UserProvider
│   ├── Router
│   │   ├── Login (/)
│   │   ├── Home (/home)
│   │   │   ├── Navbar
│   │   │   ├── Calendar
│   │   │   └── AppointmentCard[]
│   │   ├── Book (/book)
│   │   │   ├── Navbar
│   │   │   ├── Doctor Selector
│   │   │   ├── Calendar
│   │   │   └── BookingForm
│   │   └── Doctors (/doctors-portal)
│   │       ├── Navbar
│   │       ├── Availability Form
│   │       ├── Calendar
│   │       └── Appointments List
│   │           └── Appointment Item
│   │               ├── Notes Button → Modal
│   │               ├── Clear Button
│   │               └── Cancel Button
```

---

## State Management Pattern

### useUser() Hook Usage

```javascript
// In any component
import { useUser } from "../context/UserContext";

const MyComponent = () => {
  const {
    user, // Current user object
    loginDoctor, // Function(name, pwd)
    loginPatient, // Function(email, pwd)
    logout, // Function()
    isDoctor, // Function() returns bool
    isPatient, // Function() returns bool
    isLoggedIn, // Function() returns bool
  } = useUser();

  // Use in conditions
  if (isDoctor()) {
    // Show doctor-only content
  }

  // Use in handlers
  const handleLogin = () => {
    const success = loginDoctor(name, password);
    if (success) navigate("/doctors-portal");
  };
};
```

---

## API Integration Points (Future)

When connecting to backend, replace these functions:

```javascript
// OLD (Mock) - in UserContext.jsx
const loginDoctor = (name, password) => {
  // Mock verification
  return DOCTOR_LIST.includes(name) && password === "password123";
};

// NEW (API) - Example
const loginDoctor = async (name, password) => {
  try {
    const response = await fetch("/api/auth/doctor-login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();
    if (data.token) {
      // Save token
      // Set user state
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};
```

---

## Testing Points

### Unit Testing Examples

```javascript
// Test 1: Doctor login validation
test("Doctor login accepts valid credentials", () => {
  const { loginDoctor } = useUser();
  expect(loginDoctor("Dr. Sarah Johnson", "password123")).toBe(true);
});

// Test 2: Patient role protection
test("Patient cannot access doctor portal", () => {
  // Login as patient
  // Try to access /doctors-portal
  // Should redirect to /
});

// Test 3: Availability persistence
test("Doctor availability saves and loads from localStorage", () => {
  // Set availability
  // Refresh page
  // Verify availability still present
});

// Test 4: Clinical notes persist
test("Clinical notes are saved to localStorage", () => {
  // Add notes to appointment
  // Refresh page
  // Notes should be present
});
```

---

## Performance Optimizations (Future)

- [ ] Lazy load route components
- [ ] Memoize context values
- [ ] Implement pagination for appointments
- [ ] Cache doctor availability data
- [ ] Optimize calendar re-renders
- [ ] Lazy load images
- [ ] Minify bundle

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Purpose**: Complete architecture reference for developers
