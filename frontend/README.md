# 🏥 Hospital Appointment System

A professional React-based appointment booking system with **separate doctor and patient portals**, supporting complete appointment lifecycle management with role-based access control.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-4-purple)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen)
![Router](https://img.shields.io/badge/React%20Router-v6-orange)

## ✨ Key Features

### �‍⚕️ Doctor Portal

- 🔐 Secure login (16 pre-registered doctors, password: password123)
- 📅 Set availability (work days & hours with persistence)
- � View patient appointments by date
- 📝 Add clinical notes to appointments
- ✅ Mark appointments as "cleared" or "cancelled"
- 📊 Calendar view with availability highlights

### 👤 Patient Portal

- ✍️ Create account & login with validation
- � Book appointments with available doctors
- 📌 View scheduled appointments
- ❌ Cancel appointments
- 🔍 Browse doctor availability

### 🔐 Security

- **Role-based access control** - Different views for doctors vs patients
- **Route protection** - Unauthorized access redirected to login
- **Navbar awareness** - Links shown based on user role
- **Session management** - Logout clears user data

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14
- npm >= 6

### Installation

```bash
cd "Hospital Appointment System"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Demo Credentials

**Doctor Login**

- Any doctor from list: Dr. Sarah Johnson, Dr. Robert Miller, etc. (16 total)
- Password: `password123`
- Redirects to: `/doctors-portal`

**Patient**

- Email: Any valid format (e.g., `test@example.com`)
- Password: Minimum 6 characters
- Redirects to: `/home`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with responsive menu
│   ├── Calendar.jsx    # Interactive appointment calendar
│   └── AppointmentCard.jsx # Individual appointment display
├── pages/              # Main application pages
│   ├── Login.jsx       # Authentication page
│   ├── Home.jsx        # Dashboard with appointments overview
│   └── Book.jsx        # Appointment booking form
├── styles/             # CSS styling
│   ├── theme.css       # Global variables and base styles
│   └── components.css  # Component-specific styles
└── assets/             # Static assets (logos, images)
```

## 🎯 Usage

### Login

1. Enter any valid email format and password (6+ characters)
2. Click "Login" to access the dashboard

### Dashboard

- View upcoming appointments in an interactive calendar
- Browse appointments by date selection
- Cancel appointments with confirmation modal
- Quick access to book new appointments

### Booking Appointments

1. Fill in patient details (name, age, contact, email)
2. Select healthcare department
3. Optionally request a specific doctor
4. Choose date from calendar (green checkmarks show availability)
5. Select preferred time slot
6. Confirm booking and receive confirmation

## 🛠️ Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#1976d2` - Main brand color, navbar, headers
- **Action Green**: `#2e7d32` - Action buttons only (Book, Submit, Login)
- **Danger Red**: `#d32f2f` - Cancel, delete, error states
- **Light Grey**: `#f5f5f5` - Backgrounds, subtle elements
- **White**: `#ffffff` - Cards, input backgrounds, main background

### Typography

- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 📱 Responsive Breakpoints

- **Mobile**: `< 480px`
- **Tablet**: `481px - 768px`
- **Desktop**: `> 768px`

## 🔗 Future Backend Integration

The frontend is designed to easily integrate with a REST API backend:

### Authentication Endpoints

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/forgot-password
```

### Appointment Endpoints

```
GET /api/appointments
POST /api/appointments
PUT /api/appointments/:id
DELETE /api/appointments/:id
```

### Doctor & Department Endpoints

```
GET /api/departments
GET /api/doctors
GET /api/doctors/:id/availability
```

## 🧪 Demo Data

The application includes realistic dummy data:

- **Sample appointments** across different departments
- **8 healthcare departments** (Cardiology, General, Dental, etc.)
- **16 doctors** with varying availability schedules
- **Time slots** from 9:00 AM to 4:30 PM

## 🔧 Customization

### Theming

Modify CSS custom properties in `src/styles/theme.css`:

```css
:root {
  --primary-green: #2e7d32;
  --light-green: #4caf50;
  --primary-grey: #f5f5f5;
  /* Update colors here */
}
```

### Adding Components

1. Create new component in appropriate directory
2. Import and use in parent components
3. Add any necessary styling to component files

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📚 Dependencies

### Core

- `react` - UI framework
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing

### UI & Calendar

- `react-calendar` - Interactive calendar component
- `react-hook-form` - Form handling and validation

### Development

- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React plugin for Vite
- `eslint` - Code linting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Design inspiration from Zocdoc and Doctolib
- Google Fonts for typography
- React Calendar library for date selection
- Vite team for excellent build tooling

---

**Built with ❤️ for better healthcare accessibility**
