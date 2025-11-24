# Hospital Appointment Booking System - Frontend

## Project Overview

This is a modern, responsive React frontend application for a hospital appointment booking system. The application is built using Vite for fast development and optimized build processes, featuring a professional healthcare-focused design with green and white color themes.

## Features

### 🔐 Authentication

- **Login Page**: Clean, centered login form with validation
- Email and password authentication
- Links for account creation and password recovery
- Professional healthcare branding

### 🏠 Dashboard/Home Page

- **Hero Section**: Welcoming banner with call-to-action
- **Interactive Calendar**: View existing appointments with visual indicators
- **Appointment Management**: View, filter, and cancel appointments
- **Responsive Navigation**: Professional navbar with mobile support

### 📅 Appointment Booking

- **Two-Panel Layout**: Form on left, calendar on right
- **Comprehensive Form**: Patient details, department selection, doctor preferences
- **Smart Calendar**: Shows doctor availability, disables past dates
- **Time Selection**: Interactive time slot picker
- **Form Validation**: Real-time validation with error messages
- **Success Confirmation**: Modal with appointment details

## Tech Stack

### Core Technologies

- **React 18.2.0**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router DOM 6.15.0**: Client-side routing

### UI & Styling

- **CSS Custom Properties**: Consistent theming system
- **Google Fonts (Poppins)**: Modern, clean typography
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Custom CSS**: Professional healthcare styling

### Libraries & Dependencies

- **react-calendar 4.6.0**: Interactive calendar component
- **react-hook-form 7.45.4**: Form handling and validation

## Component Architecture

### Pages

```
/src/pages/
├── Login.jsx          # Authentication page
├── Home.jsx           # Dashboard with appointments overview
└── Book.jsx           # Appointment booking form
```

### Components

```
/src/components/
├── Navbar.jsx         # Navigation bar with responsive menu
├── Calendar.jsx       # Custom calendar with appointment indicators
└── AppointmentCard.jsx # Individual appointment display card
```

### Styling

```
/src/styles/
├── theme.css          # Global variables, base styles, utilities
└── components.css     # Component-specific styles
```

## Key Features Implemented

### 🎨 Professional Healthcare Design

- **Color Scheme**: Green primary (#2e7d32), light backgrounds, professional whites
- **Typography**: Poppins font family for modern, clean appearance
- **Shadows & Transitions**: Subtle depth and smooth interactions
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

### 📱 Interactive Components

- **Smart Calendar**:
  - Visual appointment indicators
  - Doctor availability display
  - Past date restrictions
  - Month navigation
- **Form Validation**: Real-time feedback with error messages
- **Modal System**: Confirmation dialogs and success messages
- **Hover Effects**: Enhanced user experience with visual feedback

### 🔄 State Management

- **React Hooks**: useState and useEffect for local state management
- **Form Handling**: Controlled components with validation
- **Navigation**: React Router for seamless page transitions

## File Structure

```
hospital-appointment-system/
├── public/
│   └── hospital-icon.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── AppointmentCard.jsx
│   │   ├── Calendar.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Book.jsx
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── styles/
│   │   ├── components.css
│   │   └── theme.css
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   └── frontend.md
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**

   ```bash
   cd hospital-appointment-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload on file changes

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Usage Guide

### Login

1. Enter email and password (any valid format for demo)
2. Click "Login" to proceed to dashboard
3. Use "Create Account" or "Forgot Password" links (demo alerts)

### Dashboard

1. View hero section with booking call-to-action
2. Use calendar to browse appointment dates
3. Click dates to see appointments for that day
4. Hover over appointment cards for details
5. Click "Cancel" to remove appointments (with confirmation)

### Booking Appointments

1. Fill out patient information form
2. Select department from dropdown
3. Choose whether to request specific doctor
4. If yes, select from available doctors
5. Pick date from calendar (green checkmarks show doctor availability)
6. Select time from available slots
7. Click "Book Appointment" to confirm
8. Review details in success modal

## Dummy Data

The application includes realistic dummy data for demonstration:

### Sample Appointments

- Cardiology with Dr. Sarah Johnson
- General Medicine with Dr. Michael Chen
- Dental with Dr. Emily Rodriguez

### Available Departments

- Cardiology, General Medicine, Dental, Pediatrics
- Orthopedics, Dermatology, Neurology, Gynecology

### Doctor Availability

- Each doctor has specific available days
- Shown as green checkmarks on calendar
- Different schedules (some work Mon-Fri, others have specific days)

## Future Backend Integration Points

### Authentication API

```javascript
// POST /api/auth/login
{
  email: "user@example.com",
  password: "password123"
}
```

### Appointments API

```javascript
// GET /api/appointments
// POST /api/appointments
// DELETE /api/appointments/:id
```

### Doctors & Departments API

```javascript
// GET /api/departments
// GET /api/doctors?department=cardiology
// GET /api/doctors/:id/availability
```

### User Profile API

```javascript
// GET /api/user/profile
// PUT /api/user/profile
```

## Customization

### Theming

Modify CSS custom properties in `src/styles/theme.css`:

```css
:root {
  --primary-green: #2e7d32;
  --light-green: #4caf50;
  --primary-grey: #f5f5f5;
  /* ... other variables */
}
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

### Styling Guidelines

- Use CSS custom properties for consistency
- Follow mobile-first responsive design
- Maintain accessibility standards
- Use semantic HTML elements

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Vite for fast development and optimized builds
- CSS custom properties for efficient styling
- Minimal bundle size with tree shaking
- Optimized images and assets
- Efficient React patterns and hooks

## Accessibility Features

- Semantic HTML structure
- Proper form labels and ARIA attributes
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

---

**Note**: This is a frontend-only implementation with dummy data. All data is stored in component state and will reset on page refresh. Backend integration would replace the dummy data with actual API calls.
