# 🎨 Theme & Icon Quick Reference Guide

## Color Palette Reference

### Primary Theme: Blue & White

```
BLUE THEME COLORS
═══════════════════════════════════════════════════════════════
Primary Blue:    #1976d2  ████████  Main brand color
Light Blue:      #42a5f5  ████████  Hover states
Dark Blue:       #0d47a1  ████████  Dark accents
Sky Blue:        #e3f2fd  ████████  Light backgrounds

ACTION COLORS (Buttons Only)
═══════════════════════════════════════════════════════════════
Action Green:    #2e7d32  ████████  Book, Submit, Confirm
Green Hover:     #4caf50  ████████  Hover on green buttons

NEUTRAL COLORS
═══════════════════════════════════════════════════════════════
White:           #ffffff  ████████  Cards, backgrounds
Light Grey:      #f5f7fa  ████████  Page backgrounds
Border Grey:     #e0e0e0  ████████  Borders, dividers

TEXT COLORS
═══════════════════════════════════════════════════════════════
Dark Text:       #333333  ████████  Primary text
Light Text:      #666666  ████████  Secondary text
Blue Text:       #1976d2  ████████  Links, emphasis

DANGER/ERROR COLORS
═══════════════════════════════════════════════════════════════
Danger Red:      #d32f2f  ████████  Cancel, delete
Red Hover:       #b71c1c  ████████  Hover on red buttons
```

---

## Color Usage Map

### 🔵 BLUE - Use For:

- ✅ Navbar logo and brand
- ✅ Page headings and titles
- ✅ Calendar header (month/year navigation)
- ✅ Selected calendar dates
- ✅ Secondary buttons (outlined style)
- ✅ Navigation links
- ✅ Card accent borders (blue bar at top)
- ✅ Input field focus states (blue glow)
- ✅ Radio button selections
- ✅ Links and clickable text
- ✅ Appointment time display
- ✅ Hero section background gradient

### 🟢 GREEN - Use For:

- ✅ Primary action buttons ONLY:
  - "Book Appointment" button
  - "Login" button
  - "Submit" button
  - "Confirm" button
- ✅ Selected time slots
- ✅ Doctor availability indicators
- ✅ Success messages
- ✅ Appointment dots on calendar

### 🔴 RED - Use For:

- ✅ Destructive actions:
  - "Cancel Appointment" button
  - "Delete" buttons
- ✅ Error messages
- ✅ Validation errors
- ✅ Warning alerts

### ⚪ WHITE - Use For:

- ✅ Card backgrounds
- ✅ Modal backgrounds
- ✅ Input field backgrounds
- ✅ Button text (on colored backgrounds)
- ✅ Hero text
- ✅ Calendar tile backgrounds

### 🔵 GREY - Use For:

- ✅ Page backgrounds (light grey)
- ✅ Secondary text
- ✅ Borders and dividers
- ✅ Disabled elements
- ✅ Placeholder text
- ✅ Calendar hover states

---

## Icon Reference

### 🏥 Medical/Hospital Icons

```
🏥  - Hospital logo (navbar, login)
💊  - Medicine (optional)
🩺  - Stethoscope (optional)
⚕️  - Medical symbol (optional)
```

### 📅 Date & Time Icons

```
📅  - Calendar/Appointments
🕐  - Clock/Time
⏰  - Alarm/Reminder
📆  - Schedule
```

### 📧 Communication Icons

```
📧  - Email
📞  - Phone/Contact
📱  - Mobile phone
💬  - Chat/Messages
```

### 🔐 Security Icons

```
🔒  - Password/Security
🔑  - Access/Key
👤  - User/Profile
🆔  - ID/Login
```

### 🏠 Navigation Icons

```
🏠  - Home
📋  - My Appointments/List
📝  - Form/Write
⚙️  - Settings
```

### ✓ Status Icons

```
✅  - Success/Complete
✓  - Available/Check
❌  - Error/Close
⚠️  - Warning
ℹ️  - Information
```

### 👥 People Icons

```
👤  - User/Patient
👨‍⚕️  - Doctor (male)
👩‍⚕️  - Doctor (female)
👥  - Users/Group
```

---

## Icon Usage in Components

### Navbar

```jsx
🏥 Kaga Health        // Logo
🏠 Home              // Home link
📅 Book Appointment   // Booking link
📋 My Appointments    // Appointments link
📞 Contact           // Contact link
```

### Login Page

```jsx
🏥 Kaga Health        // Page header
📧 Email Address      // Email field
🔒 Password          // Password field
```

### Home Page

```jsx
• Green dots on calendar dates = has appointments
```

### Booking Page

```jsx
✓ Green checkmarks on calendar = doctor available
```

### Appointment Cards

```jsx
🕐 Time display (could add)
📅 Date display (could add)
👨‍⚕️ Doctor name (could add)
🏥 Department (could add)
```

---

## CSS Variable Reference

### How to Use CSS Variables

**In CSS:**

```css
.element {
  color: var(--primary-blue);
  background-color: var(--white);
}
```

**In JSX Inline Styles:**

```jsx
<div style={{ color: "var(--primary-blue)" }}>Content</div>
```

### All Available Variables

```css
/* COLORS */
--primary-blue: #1976d2;
--light-blue: #42a5f5;
--dark-blue: #0d47a1;
--sky-blue: #e3f2fd;
--action-green: #2e7d32;
--action-green-hover: #4caf50;
--white: #ffffff;
--light-grey: #f5f7fa;
--border-color: #e0e0e0;
--text-dark: #333333;
--text-light: #666666;
--text-blue: #1976d2;
--danger-red: #d32f2f;
--danger-red-hover: #b71c1c;

/* EFFECTS */
--shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
--shadow-blue: 0 4px 16px rgba(25, 118, 210, 0.2);
--border-radius: 8px;
--transition: all 0.3s ease;
```

---

## Button Style Guide

### Primary Button (GREEN - Main Actions)

```jsx
<button className="btn btn-primary">Book Appointment</button>
```

**Use for**: Book, Submit, Login, Confirm

**Appearance**:

- Background: Green (#2e7d32)
- Text: White
- Hover: Lighter green (#4caf50)
- Effect: Lifts up on hover

---

### Secondary Button (BLUE - Alternative Actions)

```jsx
<button className="btn btn-secondary">Back to Home</button>
```

**Use for**: Back, Cancel (non-destructive), View Details

**Appearance**:

- Background: Transparent
- Border: 2px solid Blue
- Text: Blue
- Hover: Filled with blue

---

### Danger Button (RED - Destructive Actions)

```jsx
<button className="btn btn-danger">Cancel Appointment</button>
```

**Use for**: Cancel, Delete, Remove

**Appearance**:

- Background: Red (#d32f2f)
- Text: White
- Hover: Darker red (#b71c1c)
- Effect: Lifts up on hover

---

## Form Element Styles

### Input Fields

```css
Default State:
- Border: 2px solid #e0e0e0 (grey)
- Background: White

Focus State:
- Border: 2px solid #1976d2 (blue)
- Glow: Blue shadow (rgba(25, 118, 210, 0.1))
```

### Dropdown/Select

```css
Same as input fields
- Pointer cursor on hover
- Blue border on focus
```

### Radio Buttons

```css
- Accent color: Blue (#1976d2)
- Size: 18px × 18px
```

### Time Slots

```css
Default:
- White background
- Grey border

Hover:
- Light blue background
- Blue border

Selected:
- GREEN background (#2e7d32)
- White text
```

---

## Card Styles

### Standard Card

```css
.card {
  Background: White
  Border-radius: 8px
  Box-shadow: Subtle grey shadow
  Padding: 24px

  On Hover:
    - Enhanced shadow
    - Slight lift effect
}
```

### Card with Blue Accent

```css
Add:
  border-top: 4px solid var(--primary-blue);

Used for:
  - Booking form panel
  - Calendar panel
  - Login card
  - Modals
```

### Appointment Card

```css
Add:
  border-left: 4px solid var(--primary-blue);

Used for:
  - Appointment display cards
```

---

## Layout Patterns

### Two-Column Layout

```css
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Equal columns */
  gap: 40px;                        /* Space between */
}

Mobile (< 768px):
  grid-template-columns: 1fr;      /* Single column */
```

### Centered Container

```css
.container {
  max-width: 1200px; /* Maximum width */
  margin: 0 auto; /* Center horizontally */
  padding: 0 20px; /* Side padding */
}
```

### Full-Screen Centered

```css
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

---

## Typography Scale

```
HEADINGS
────────────────────────────────────
Hero H1:        3.5rem (56px)   Bold
Section H2:     2.5rem (40px)   Bold
Panel H3:       1.8rem (28.8px) Bold
Card H4:        1.2rem (19.2px) Semi-bold

BODY TEXT
────────────────────────────────────
Large:          1.3rem (20.8px)
Regular:        1.1rem (17.6px)
Body:           1rem   (16px)
Small:          0.875rem (14px)

FONT WEIGHTS
────────────────────────────────────
Light:          300
Regular:        400
Medium:         500
Semi-bold:      600
Bold:           700
```

---

## Responsive Breakpoints

```
DEVICE SIZES
═══════════════════════════════════════════════════════════════

Desktop:        1200px+    Full layout, all features
Tablet:         768px      Simplified, some stacking
Mobile:         < 768px    Single column, hamburger menu
Small Mobile:   < 480px    Compressed, full-width buttons

MEDIA QUERIES
═══════════════════════════════════════════════════════════════

@media (max-width: 768px) {
  /* Tablet and mobile */
  - Hide desktop navigation
  - Show hamburger menu
  - Stack columns vertically
  - Reduce heading sizes
}

@media (max-width: 480px) {
  /* Small mobile */
  - Further reduce text sizes
  - Full-width buttons
  - Reduce padding
}
```

---

## Animation & Transitions

### Standard Transition

```css
transition: all 0.3s ease;
```

**Applied to**: Buttons, links, cards, inputs

### Hover Effects

```css
/* Button Hover */
transform: translateY(-2px); /* Lift up 2px */
box-shadow: Enhanced shadow;

/* Card Hover */
transform: translateY(-2px); /* Lift up 2px */
box-shadow: Enhanced shadow;

/* Link Hover */
color: Change to blue;
background: Light blue background;
```

### Modal Animation

```css
@keyframes modalSlideIn {
  from: translateY(-50px), opacity: 0
  to:   translateY(0),     opacity: 1
}
```

**Duration**: 0.3s ease

### Loading Spinner

```css
@keyframes spin {
  from: rotate(0deg)
  to:   rotate(360deg)
}
```

**Duration**: 1s linear infinite

---

## Shadow Reference

```css
/* Subtle shadow for cards */
--shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Enhanced shadow for hover/modals */
--shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);

/* Blue-tinted shadow (optional) */
--shadow-blue: 0 4px 16px rgba(25, 118, 210, 0.2);
```

**Usage**:

- Cards: `var(--shadow)`
- Cards on hover: `var(--shadow-hover)`
- Modals: `var(--shadow-hover)`
- Login card: `var(--shadow-hover)`

---

## Accessibility Color Contrast

All color combinations meet **WCAG AA standards**:

```
✅ Dark text (#333) on white background    = 12.6:1
✅ Light text (#666) on white background   = 5.7:1
✅ White text on blue (#1976d2)            = 4.6:1
✅ White text on green (#2e7d32)           = 4.7:1
✅ White text on red (#d32f2f)             = 4.5:1
```

---

## Quick Color Change Guide

### To Change Primary Theme from Blue to Another Color:

**Step 1**: Open `src/styles/theme.css`

**Step 2**: Change these variables:

```css
:root {
  --primary-blue: #YOUR_COLOR; /* Change main color */
  --light-blue: #LIGHTER_SHADE; /* Lighter version */
  --dark-blue: #DARKER_SHADE; /* Darker version */
  --sky-blue: #VERY_LIGHT_SHADE; /* Very light background */
}
```

**Step 3**: Keep green for action buttons (or change):

```css
--action-green: #2e7d32; /* Keep or change */
```

**Step 4**: Save and refresh browser

---

## Common Customization Examples

### Example 1: Change to Purple Theme

```css
:root {
  --primary-blue: #7b1fa2; /* Purple */
  --light-blue: #ba68c8; /* Light purple */
  --dark-blue: #4a148c; /* Dark purple */
  --sky-blue: #f3e5f5; /* Very light purple */
}
```

### Example 2: Change to Teal Theme

```css
:root {
  --primary-blue: #00796b; /* Teal */
  --light-blue: #26a69a; /* Light teal */
  --dark-blue: #004d40; /* Dark teal */
  --sky-blue: #e0f2f1; /* Very light teal */
}
```

### Example 3: Keep Blue, Change Green to Orange

```css
:root {
  --action-green: #f57c00; /* Orange */
  --action-green-hover: #fb8c00; /* Light orange */
}
```

---

**Last Updated**: October 2025
**Theme Version**: Blue & White v1.0
