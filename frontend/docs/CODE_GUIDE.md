# 📚 Complete Code Guide - Hospital Appointment System

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Configuration Files](#configuration-files)
4. [Styling Files](#styling-files)
5. [React Components](#react-components)
6. [Pages](#pages)
7. [Key Concepts](#key-concepts)

---

## Project Overview

This is a **React-based hospital appointment booking system** with a modern **blue and white theme**. The application allows patients to:

- Login to the system
- View their appointments on a calendar
- Book new appointments with doctors
- Cancel existing appointments
- Select specific doctors and time slots

### Tech Stack

- **React 18.2.0** - UI framework
- **Vite 4.4.5** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **React Calendar** - Interactive calendar component
- **CSS3** - Styling with custom properties (CSS variables)

---

## File Structure

```
hospital-appointment-system/
├── public/                          # Static assets
│   └── hospital-icon.svg           # Favicon icon
├── src/                            # Source code
│   ├── assets/                     # Images, logos
│   │   └── logo.svg               # Hospital logo
│   ├── components/                 # Reusable components
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── Calendar.jsx           # Calendar component
│   │   └── AppointmentCard.jsx    # Appointment display card
│   ├── pages/                      # Main pages
│   │   ├── Login.jsx              # Login/authentication page
│   │   ├── Home.jsx               # Dashboard with appointments
│   │   └── Book.jsx               # Booking form page
│   ├── styles/                     # CSS files
│   │   ├── theme.css              # Global styles and variables
│   │   └── components.css         # Component-specific styles
│   ├── App.jsx                     # Main app component with routing
│   └── main.jsx                    # Entry point, renders App
├── docs/                           # Documentation
│   ├── frontend.md                # Frontend documentation
│   └── CODE_GUIDE.md              # This file
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── vite.config.js                 # Vite configuration
└── README.md                       # Project readme
```

---

## Configuration Files

### 📄 `package.json`

**Purpose**: Manages project dependencies and npm scripts

**Key Dependencies**:

```json
{
  "react": "^18.2.0", // React library
  "react-dom": "^18.2.0", // React DOM rendering
  "react-router-dom": "^6.15.0", // Routing between pages
  "react-calendar": "^4.6.0", // Calendar component
  "react-hook-form": "^7.45.4" // Form handling
}
```

**Scripts**:

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

### 📄 `vite.config.js`

**Purpose**: Configure Vite build tool

**What it does**:

- Sets up React plugin for JSX support
- Configures fast refresh for development
- Optimizes build output

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Enable React support
});
```

---

### 📄 `index.html`

**Purpose**: HTML template and entry point

**Key Elements**:

```html
<head>
  <!-- Google Fonts for Poppins font -->
  <link href="...fonts.googleapis.com/css2?family=Poppins..." />
  <title>Kaga Health - Appointment Booking</title>
</head>
<body>
  <div id="root"></div>
  <!-- React app mounts here -->
  <script src="/src/main.jsx"></script>
  <!-- Entry point -->
</body>
```

---

## Styling Files

### 🎨 `src/styles/theme.css`

**Purpose**: Global styles, CSS variables, and theme colors

#### Color Scheme (Blue & White Theme)

```css
:root {
  /* PRIMARY BLUE COLORS */
  --primary-blue: #1976d2; /* Main brand color */
  --light-blue: #42a5f5; /* Lighter shade for hover */
  --dark-blue: #0d47a1; /* Darker shade */
  --sky-blue: #e3f2fd; /* Very light background */

  /* GREEN FOR ACTION BUTTONS ONLY */
  --action-green: #2e7d32; /* Book, Submit buttons */
  --action-green-hover: #4caf50; /* Hover state */

  /* NEUTRAL COLORS */
  --white: #ffffff; /* Card backgrounds */
  --light-grey: #f5f7fa; /* Page background */
  --border-color: #e0e0e0; /* Input borders */

  /* TEXT COLORS */
  --text-dark: #333333; /* Primary text */
  --text-light: #666666; /* Secondary text */

  /* DANGER COLOR */
  --danger-red: #d32f2f; /* Cancel/delete actions */
}
```

#### Key Style Classes

1. **`.btn-primary`** - GREEN button for main actions (Book, Submit)
2. **`.btn-secondary`** - BLUE outlined button for secondary actions
3. **`.btn-danger`** - RED button for destructive actions (Cancel)
4. **`.navbar`** - Fixed navigation bar at top
5. **`.hero`** - Full-screen hero section with blue gradient
6. **`.modal`** - Popup dialog boxes
7. **`.card`** - White content cards with shadow
8. **`.form-input`** - Text input fields with blue focus
9. **`.react-calendar`** - Calendar component styling

---

### 🎨 `src/styles/components.css`

**Purpose**: Component-specific styles

#### Key Classes

1. **`.booking-form`** - Form panel on booking page
2. **`.calendar-panel`** - Calendar panel on booking page
3. **`.time-slot`** - Individual time selection buttons
4. **`.appointment-card`** - Appointment display cards
5. **`.form-validation-error`** - Red error messages
6. **`.success-message`** - Green success notifications
7. **`.loading-spinner`** - Animated loading indicator

---

## React Components

### 🧩 `src/main.jsx`

**Purpose**: Application entry point

**What it does**:

1. Imports React and the main App component
2. Imports global styles (theme.css)
3. Mounts the App to the `<div id="root">` element
4. Wraps in `React.StrictMode` for development warnings

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/theme.css"; // Load global styles

// Mount React app to #root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

### 🧩 `src/App.jsx`

**Purpose**: Main application component with routing

**What it does**:

1. Sets up React Router for navigation
2. Defines routes for Login, Home, and Book pages
3. Manages which page shows based on URL

**Routes**:

- `/` - Login page
- `/home` - Dashboard/Home page
- `/book` - Booking page

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Book from "./pages/Book";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </Router>
  );
}
```

---

### 🧩 `src/components/Navbar.jsx`

**Purpose**: Top navigation bar

**Features**:

- Fixed position at top of page
- Logo link to home
- Navigation links (Home, Book, Appointments, Contact)
- Active page highlighting
- Responsive hamburger menu for mobile

**State**:

- `isMenuOpen` - Boolean: controls mobile menu visibility

**Key Functions**:

- `toggleMenu()` - Opens/closes mobile menu
- `isActive(path)` - Checks if current page matches given path

**Icons Used**:

- Hospital logo
- Home icon
- Calendar icon for booking
- List icon for appointments
- Phone icon for contact

---

### 🧩 `src/components/Calendar.jsx`

**Purpose**: Interactive calendar with appointment indicators

**Props**:

```jsx
{
  selectedDate, // Currently selected date
    onDateChange, // Function called when date is clicked
    appointments, // Array of existing appointments
    selectedDoctor, // Currently selected doctor name
    availableDoctors; // Array of doctor availability data
}
```

**Features**:

1. **Shows appointment dots** - Green dots on dates with appointments
2. **Doctor availability** - Green checkmarks on days doctor is available
3. **Disables past dates** - Can't book appointments in the past
4. **Month navigation** - Browse different months
5. **Highlight selected date** - Shows current selection

**Key Functions**:

- `hasAppointments(date)` - Checks if date has appointments
- `isDoctorAvailable(date)` - Checks if doctor works that day
- `isPastDate(date)` - Checks if date is before today
- `tileContent()` - Adds custom content to calendar tiles
- `tileClassName()` - Adds custom CSS classes to tiles

---

### 🧩 `src/components/AppointmentCard.jsx`

**Purpose**: Display individual appointment with cancel option

**Props**:

```jsx
{
  appointment: {
    id,            // Unique appointment ID
    date,          // Appointment date (YYYY-MM-DD)
    time,          // Appointment time (HH:MM)
    doctor,        // Doctor name
    department,    // Medical department
    patientName    // Patient name
  },
  onCancel       // Function to call when cancelling
}
```

**Features**:

1. **Displays appointment info** - Time, date, doctor, department
2. **Hover tooltip** - Shows details on hover
3. **Cancel button** - RED button to cancel appointment
4. **Confirmation modal** - Asks for confirmation before cancelling
5. **Format dates/times** - Converts to readable format

**State**:

- `showTooltip` - Boolean: show/hide hover tooltip
- `showCancelModal` - Boolean: show/hide confirmation dialog

**Key Functions**:

- `formatDate(dateString)` - Converts date to "Monday, October 16, 2025"
- `formatTime(timeString)` - Converts "14:30" to "2:30 PM"
- `handleCancelClick()` - Opens confirmation modal
- `confirmCancel()` - Actually cancels the appointment

---

## Pages

### 📄 `src/pages/Login.jsx`

**Purpose**: User authentication page

**State**:

```jsx
formData: {
  email: '',      // User's email address
  password: ''    // User's password
}
errors: {
  email: '',      // Email validation error message
  password: ''    // Password validation error message
}
```

**Features**:

1. **Email validation** - Checks for valid email format
2. **Password validation** - Requires minimum 6 characters
3. **Real-time error display** - Shows errors as user types
4. **Error clearing** - Errors disappear when user starts typing
5. **Professional layout** - Centered card with blue accent

**Key Functions**:

- `handleChange(e)` - Updates form data when user types
- `validateForm()` - Checks if all inputs are valid
- `handleSubmit(e)` - Processes login and navigates to home
- `handleCreateAccount()` - Placeholder for registration
- `handleForgotPassword()` - Placeholder for password reset

**Validation Rules**:

- Email must not be empty
- Email must contain @ and .
- Password must not be empty
- Password must be at least 6 characters

**Icons Used**:

- 🏥 Hospital logo
- 📧 Email icon
- 🔒 Password icon

---

### 📄 `src/pages/Home.jsx`

**Purpose**: Dashboard showing user's appointments

**State**:

```jsx
appointments: [
  // Array of user's appointments
  {
    id,
    date,
    time,
    doctor,
    department,
    patientName,
  },
];
selectedDate; // Currently selected date on calendar
```

**Features**:

1. **Hero section** - Large blue banner with welcome message
2. **Interactive calendar** - Shows all appointment dates
3. **Date selection** - Click date to see appointments that day
4. **Appointment cards** - Display all appointments with details
5. **Cancel appointments** - Click cancel with confirmation
6. **Filter by date** - View appointments for specific date
7. **Empty states** - Shows message when no appointments

**Key Functions**:

- `handleCancelAppointment(id)` - Removes appointment from list
- `hasAppointments(date)` - Checks if date has appointments
- `tileContent()` - Adds green dots to calendar dates
- `tileClassName()` - Styles dates with appointments

**Sections**:

1. **Navbar** - Navigation at top
2. **Hero** - Large banner with "Book Appointment" button (GREEN)
3. **Calendar Section** - Two-column layout:
   - Left: Interactive calendar
   - Right: Appointments for selected date
4. **All Appointments** - Grid of all upcoming appointments

---

### 📄 `src/pages/Book.jsx`

**Purpose**: Appointment booking form

**State**:

```jsx
formData: {
  fullName, // Patient's full name
    age, // Patient's age
    contactNumber, // Phone number
    email, // Email address
    department, // Selected department
    requestSpecificDoctor, // 'yes' or 'no'
    selectedDoctor; // Doctor name if requested
}
selectedDate; // Chosen appointment date
selectedTime; // Chosen time slot
errors; // Validation error messages
showSuccessModal; // Show success confirmation
```

**Features**:

1. **Two-column layout**:
   - Left: Patient information form
   - Right: Calendar and time selection
2. **Department dropdown** - 8 medical departments
3. **Doctor selection** - Optional, enabled by radio button
4. **Dynamic doctor list** - Changes based on department
5. **Interactive calendar** - Shows doctor availability
6. **Time slot grid** - 12 available time slots
7. **Comprehensive validation** - All fields required
8. **Success modal** - Shows booking confirmation
9. **Green submit button** - Emphasizes main action

**Available Departments**:

1. Cardiology
2. General Medicine
3. Dental
4. Pediatrics
5. Orthopedics
6. Dermatology
7. Neurology
8. Gynecology

**Time Slots**:

- Morning: 9:00 AM - 11:30 AM (30-minute intervals)
- Afternoon: 2:00 PM - 4:30 PM (30-minute intervals)

**Key Functions**:

- `handleInputChange(e)` - Updates form as user types
- `handleDateChange(date)` - Sets selected date
- `handleTimeChange(time)` - Sets selected time
- `validateForm()` - Checks all required fields
- `handleSubmit(e)` - Processes booking
- `handleBookingSuccess()` - Navigates to home after booking

**Validation Rules**:

- Full name: Required, cannot be empty
- Age: Required, must be 1-120
- Contact: Required, must be 10 digits
- Email: Required, valid email format
- Department: Required
- Doctor: Required if "Yes, I have a preference" selected
- Date: Required
- Time: Required

**Doctor Availability**:
Each doctor has specific working days:

- Some work Monday-Friday
- Some work Monday, Wednesday, Friday
- Some work Tuesday, Thursday, Saturday
- Green checkmarks show available days on calendar

---

## Key Concepts

### 1. **State Management**

React uses `useState` hook to manage component data:

```jsx
const [data, setData] = useState(initialValue);
// data = current value
// setData = function to update value
```

### 2. **Props (Properties)**

Data passed from parent to child components:

```jsx
<Calendar selectedDate={date} onDateChange={handleChange} />
// Calendar receives selectedDate and onDateChange as props
```

### 3. **React Router**

Handles navigation between pages without page reload:

```jsx
<Route path="/home" element={<Home />} />
// When URL is /home, show Home component
```

### 4. **Event Handlers**

Functions that respond to user actions:

```jsx
onClick = { handleClick }; // When element is clicked
onChange = { handleChange }; // When input value changes
onSubmit = { handleSubmit }; // When form is submitted
```

### 5. **Conditional Rendering**

Show/hide elements based on conditions:

```jsx
{
  isMenuOpen && <MobileMenu />;
}
// Only show MobileMenu if isMenuOpen is true

{
  errors.email && <ErrorMessage />;
}
// Only show error if errors.email exists
```

### 6. **Mapping Arrays**

Create multiple elements from array data:

```jsx
{
  appointments.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />);
}
// Creates an AppointmentCard for each appointment
```

### 7. **CSS Variables**

Reusable color values defined once:

```css
:root {
  --primary-blue: #1976d2;
}
.button {
  background-color: var(--primary-blue);
}
```

### 8. **Form Validation**

Check if user input is valid:

```jsx
if (!email.trim()) {
  errors.email = "Email is required";
}
if (!/\S+@\S+\.\S+/.test(email)) {
  errors.email = "Please enter a valid email";
}
```

### 9. **Date Formatting**

Convert dates to readable format:

```jsx
new Date("2024-10-16").toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
// Result: "Monday, October 16, 2024"
```

### 10. **Responsive Design**

Adapt layout for different screen sizes:

```css
@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr; /* Single column on mobile */
  }
}
```

---

## Color Usage Guide

### When to Use Each Color:

**BLUE** (Primary Theme Color):

- Navbar brand/logo
- Section headings
- Calendar navigation header
- Selected calendar dates
- Secondary buttons (outlined)
- Links and navigation items
- Card accent borders
- Focus states on inputs

**GREEN** (Action Buttons Only):

- "Book Appointment" button
- "Submit" / "Confirm" buttons
- "Login" button
- Selected time slots
- Doctor availability indicators
- Success messages

**RED** (Dangerous Actions):

- "Cancel Appointment" button
- "Delete" actions
- Error messages
- Validation errors

**WHITE**:

- Card backgrounds
- Input backgrounds
- Modal backgrounds
- Button text (on colored backgrounds)

**GREY**:

- Page backgrounds (light grey)
- Secondary text
- Borders
- Disabled elements

---

## Icons Used Throughout

- 🏥 Hospital/Medical (logo, branding)
- 📅 Calendar (booking, appointments)
- 📧 Email (login, contact)
- 🔒 Lock/Security (password)
- 🏠 Home (navigation)
- 📋 List/Clipboard (my appointments)
- 📞 Phone (contact)
- ✓ Checkmark (doctor availability, success)

---

## Data Flow

### Login → Home:

1. User enters credentials in Login page
2. Validation checks email/password format
3. If valid, navigate to `/home`
4. Home page shows user's appointments

### Home → Book:

1. User clicks "Book Appointment" button (GREEN)
2. Navigate to `/book`
3. Form loads with empty fields

### Booking Process:

1. User fills out patient information
2. Selects department from dropdown
3. Optionally selects specific doctor
4. Calendar shows doctor's available days (green checkmarks)
5. User clicks date (past dates disabled)
6. Time slots appear below calendar
7. User clicks time slot (turns GREEN when selected)
8. User clicks "Book Appointment" (GREEN button)
9. Validation checks all fields
10. If valid, success modal appears
11. User clicks "Go to Dashboard"
12. Navigate back to `/home` with new appointment

### Cancelling Appointment:

1. User sees appointment card on Home page
2. Clicks RED "Cancel" button
3. Confirmation modal appears
4. User confirms cancellation
5. Appointment removed from list
6. Modal closes

---

## Future Backend Integration

### API Endpoints Needed:

```
POST   /api/auth/login              // User login
POST   /api/auth/register           // Create account
POST   /api/auth/forgot-password    // Password reset

GET    /api/appointments            // Get user's appointments
POST   /api/appointments            // Book new appointment
DELETE /api/appointments/:id        // Cancel appointment

GET    /api/departments             // Get all departments
GET    /api/doctors                 // Get all doctors
GET    /api/doctors/:id/availability // Get doctor's schedule
```

### Current Dummy Data Locations:

- `Home.jsx` - appointments array (lines 15-32)
- `Book.jsx` - departments array (lines 28-37)
- `Book.jsx` - doctors object (lines 39-50)
- `Book.jsx` - timeSlots array (lines 53-56)
- `Book.jsx` - doctorAvailability array (lines 59-76)

Replace these with actual API calls when backend is ready.

---

## Common Customization Tasks

### Change Theme Colors:

Edit `src/styles/theme.css`:

```css
:root {
  --primary-blue: #YOUR_COLOR; /* Change main blue */
  --action-green: #YOUR_COLOR; /* Change button green */
}
```

### Add New Department:

Edit `src/pages/Book.jsx`, departments array:

```jsx
const departments = [
  // ... existing departments
  "Your New Department",
];
```

### Add New Navigation Link:

Edit `src/components/Navbar.jsx`:

```jsx
<li>
  <Link to="/your-page">🆕 Your Link</Link>
</li>
```

### Change Time Slots:

Edit `src/pages/Book.jsx`, timeSlots array:

```jsx
const timeSlots = [
  "08:00",
  "08:30", // Add your times
];
```

---

## Troubleshooting

### Problem: Styles not loading

**Solution**: Ensure theme.css is imported in main.jsx

### Problem: Navigation not working

**Solution**: Check that BrowserRouter wraps App in App.jsx

### Problem: Calendar not showing appointments

**Solution**: Verify appointment dates are in 'YYYY-MM-DD' format

### Problem: Form validation not working

**Solution**: Check that validateForm() is called in handleSubmit

### Problem: Mobile menu not appearing

**Solution**: Check that isMenuOpen state is toggling correctly

---

## Performance Tips

1. **Use React.memo()** for components that don't change often
2. **Avoid inline styles** - use CSS classes instead
3. **Lazy load images** - use loading="lazy" attribute
4. **Minimize state updates** - batch updates when possible
5. **Use proper keys** - always use unique keys in map()

---

## Accessibility Features

1. **Semantic HTML** - Uses proper HTML5 elements
2. **ARIA labels** - Descriptive labels for screen readers
3. **Keyboard navigation** - Tab through all interactive elements
4. **Color contrast** - Meets WCAG AA standards
5. **Focus indicators** - Blue glow on focused inputs
6. **Alt text** - Descriptive text for icons (use aria-label)

---

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in src/
3. **See changes**: Browser updates automatically (hot reload)
4. **Check errors**: Look at browser console and terminal
5. **Build for production**: `npm run build`
6. **Test production build**: `npm run preview`

---

## File Relationships Diagram

```
index.html
    ↓ loads
main.jsx
    ↓ imports
App.jsx (Router)
    ↓ routes to
┌─────────────┬────────────┬─────────────┐
Login.jsx   Home.jsx    Book.jsx
               ↓ uses       ↓ uses
            Navbar.jsx   Navbar.jsx
            Calendar     Calendar
            AppointmentCard
```

---

## Summary of Responsibilities

| File                    | What It Does           | Key Features                          |
| ----------------------- | ---------------------- | ------------------------------------- |
| **theme.css**           | Global styles & colors | CSS variables, blue theme, responsive |
| **Login.jsx**           | Authentication page    | Form validation, navigation           |
| **Home.jsx**            | Dashboard              | Show appointments, calendar, cancel   |
| **Book.jsx**            | Booking form           | Form, calendar, time selection        |
| **Navbar.jsx**          | Navigation bar         | Links, mobile menu, active states     |
| **Calendar.jsx**        | Date picker            | Availability, past dates, indicators  |
| **AppointmentCard.jsx** | Appointment display    | Show details, cancel, tooltip         |

---

**Need help?** Refer to the inline comments in each file for detailed explanations of specific code sections.

**Last Updated**: October 2025
