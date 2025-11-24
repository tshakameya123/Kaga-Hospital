/**
 * BOOK APPOINTMENT PAGE 📅
 * 
 * This is the most complex page in the application where users can book medical appointments.
 * It features a comprehensive booking form with real-time validation, calendar integration,
 * and doctor availability checking.
 * 
 * KEY FEATURES:
 * - Multi-field patient information form with validation
 * - Department selection with 8 medical specialties
 * - Optional doctor selection with availability checking
 * - Interactive calendar with date selection
 * - Time slot selection with visual feedback
 * - Real-time form validation
 * - Success modal with appointment confirmation
 * - Responsive two-column layout (form + calendar)
 * 
 * COMPONENTS USED:
 * - Navbar: Top navigation
 * - CalendarComponent: Custom calendar with doctor availability
 * 
 * DATA FLOW:
 * 1. User fills patient information form
 * 2. Selects department → triggers doctor list update
 * 3. Optionally selects specific doctor → affects calendar availability
 * 4. Selects date from calendar → shows available time slots
 * 5. Selects time slot → enables form submission
 * 6. Form validates → shows success modal → navigates to dashboard
 */

import React, { useState, useEffect } from 'react'
import './Book.css'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import Navbar from '../components/Navbar'
import CalendarComponent from '../components/Calendar'

const Book = () => {
  /**
   * NAVIGATION HOOK
   * Used to programmatically navigate to dashboard after successful booking
   */
  const navigate = useNavigate()
  const { user } = useUser()

  // If a user is logged in, we can hide repeated bio fields since account holds them
  const [showEditDetails, setShowEditDetails] = useState(false)

  // Payment state: unpaid | processing | paid
  const [paymentStatus, setPaymentStatus] = useState('unpaid')
  const [paymentPhone, setPaymentPhone] = useState('')
  
  /*==============================================
    STATE MANAGEMENT
  ==============================================*/
  
  /**
   * FORM DATA STATE
   * Stores all patient information fields:
   * - fullName: Patient's full name
   * - age: Patient's age (1-120)
   * - contactNumber: 10-digit phone number
   * - email: Email address for confirmation
   * - department: Selected medical department
   * - requestSpecificDoctor: 'yes' or 'no' - whether user wants specific doctor
   * - selectedDoctor: Doctor's name if requested
   */
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    contactNumber: '',
    email: '',
    department: '',
    requestSpecificDoctor: 'no',
    selectedDoctor: ''
  })

  // Prefill formData from user context when available (non-destructive)
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name || user.username || '',
        email: prev.email || user.email || '',
        contactNumber: prev.contactNumber || user.phone || ''
      }))
      // default payment phone to contact number / user phone
      setPaymentPhone(user.phone || user.contactNumber || '')
    }
  }, [user])
  
  /**
   * DATE AND TIME STATE
   * - selectedDate: Date object for appointment (null initially)
   * - selectedTime: Time string in 'HH:MM' format (e.g., '10:00')
   */
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  
  /**
   * VALIDATION STATE
   * Stores error messages for each form field
   * Example: { fullName: 'Full name is required', email: 'Invalid email' }
   */
  const [errors, setErrors] = useState({})
  
  /**
   * SUCCESS MODAL STATE
   * Controls visibility of success modal after booking
   */
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  /*==============================================
    DATA - DEPARTMENTS, DOCTORS, TIME SLOTS
  ==============================================*/
  
  /**
   * MEDICAL DEPARTMENTS
   * List of available departments for booking
   * In production: Would come from API/database
   */
  const departments = [
    'Cardiology',
    'General Medicine',
    'Dental',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Neurology',
    'Gynecology'
  ]

  /**
   * DOCTORS BY DEPARTMENT
   * Maps each department to available doctors
   * Structure: { 'Department Name': ['Dr. Name 1', 'Dr. Name 2'] }
   * Used to populate doctor dropdown based on selected department
   */
  const doctors = {
    'Cardiology': ['Dr. Sarah Johnson', 'Dr. Robert Miller'],
    'General Medicine': ['Dr. Michael Chen', 'Dr. Lisa Wang'],
    'Dental': ['Dr. Emily Rodriguez', 'Dr. David Kim'],
    'Pediatrics': ['Dr. Jennifer Lee', 'Dr. Mark Thompson'],
    'Orthopedics': ['Dr. James Wilson', 'Dr. Maria Garcia'],
    'Dermatology': ['Dr. Amanda Davis', 'Dr. Kevin Brown'],
    'Neurology': ['Dr. Rachel Adams', 'Dr. Thomas Clark'],
    'Gynecology': ['Dr. Susan Martinez', 'Dr. Laura Anderson']
  }

  /**
   * TIME SLOTS
   * Available appointment times throughout the day
   * Format: 'HH:MM' in 24-hour format
   * Morning slots: 09:00 - 11:30 (30-minute intervals)
   * Afternoon slots: 14:00 - 16:30 (30-minute intervals)
   * Lunch break: 12:00 - 14:00 (not included)
   */
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  /**
   * DOCTOR AVAILABILITY (from localStorage for demo)
   * If a specific doctor is selected, use their saved availability.
   * Otherwise, fallback to default demo data.
   */
  let doctorAvailability = [
    { name: 'Dr. Sarah Johnson', availableDays: [1, 2, 3, 4, 5] },
    { name: 'Dr. Robert Miller', availableDays: [1, 3, 5] },
    { name: 'Dr. Michael Chen', availableDays: [1, 2, 3, 4, 5] },
    { name: 'Dr. Lisa Wang', availableDays: [2, 4, 6] },
    { name: 'Dr. Emily Rodriguez', availableDays: [1, 2, 3, 4, 5] },
    { name: 'Dr. David Kim', availableDays: [1, 3, 4, 5] },
    { name: 'Dr. Jennifer Lee', availableDays: [1, 2, 3, 4, 5] },
    { name: 'Dr. Mark Thompson', availableDays: [2, 4, 6] },
    { name: 'Dr. James Wilson', availableDays: [1, 2, 3, 4, 5] },
    { name: 'Dr. Maria Garcia', availableDays: [1, 3, 5] },
    { name: 'Dr. Amanda Davis', availableDays: [1, 2, 3, 4] },
    { name: 'Dr. Kevin Brown', availableDays: [2, 3, 4, 5] },
    { name: 'Dr. Rachel Adams', availableDays: [1, 2, 4, 5] },
    { name: 'Dr. Thomas Clark', availableDays: [1, 3, 4, 5] },
    { name: 'Dr. Susan Martinez', availableDays: [1, 2, 3, 4, 5] },
    { name: 'Dr. Laura Anderson', availableDays: [2, 4, 5, 6] }
  ];

  // If a specific doctor is selected, try to use their saved availability
  if (formData.selectedDoctor) {
    const saved = localStorage.getItem('doctorAvailability');
    if (saved) {
      const avail = JSON.parse(saved);
      // Map days to 0=Sunday, 1=Monday, ...
      const dayMap = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6
      };
      const availableDays = (avail.days || []).map(day => dayMap[day]);
      doctorAvailability = [
        { name: formData.selectedDoctor, availableDays, from: avail.from, to: avail.to }
      ];
    }
  }

  /*==============================================
    EVENT HANDLERS
  ==============================================*/
  
  /**
   * HANDLE FORM INPUT CHANGES
   * Updates formData state when user types in any form field
   * 
   * @param {Event} e - The input change event
   * 
   * Special Logic:
   * - When department changes, automatically resets selectedDoctor to empty
   *   (because doctors list depends on department)
   * - Clears validation error for the field being edited
   * 
   * Example: User types in fullName → error.fullName is cleared
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target  // Extract field name and value
    setFormData(prev => ({
      ...prev,
      [name]: value,  // Update the specific field
      // If department changes, reset selectedDoctor (spread operator conditionally adds property)
      ...(name === 'department' && { selectedDoctor: '' })
    }))
    
    // Clear validation error for this field when user starts correcting it
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''  // Remove error message
      }))
    }
  }

  /**
   * HANDLE DATE SELECTION
   * Called when user clicks a date on the calendar
   * 
   * @param {Date} date - The selected date object
   * 
   * Effects:
   * - Updates selectedDate state
   * - Resets selectedTime (user must choose time again for new date)
   * - Clears date validation error if present
   * - Triggers time slot display in UI
   */
  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedTime('')  // Reset time selection when date changes
    if (errors.date) {
      setErrors(prev => ({
        ...prev,
        date: ''  // Clear date error
      }))
    }
  }

  // Simulated payment handler. In production replace this with a call to a payment provider
  // (Flutterwave, Paystack, or a local mobile-money API / provider). Many providers offer
  // sandbox/test modes you can use while integrating.
  const handlePayment = async () => {
    if (!paymentPhone) {
      setErrors(prev => ({ ...prev, payment: 'Please provide a phone number to receive the payment prompt' }))
      return
    }

    setErrors(prev => ({ ...prev, payment: '' }))
    setPaymentStatus('processing')

    // Simulate network/payment delay
    setTimeout(() => {
      setPaymentStatus('paid')
    }, 1400)
  }

  /**
   * HANDLE TIME SELECTION
   * Called when user clicks a time slot
   * 
   * @param {string} time - The selected time in 'HH:MM' format
   * 
   * Effects:
   * - Updates selectedTime state
   * - Clears time validation error if present
   * - Visual feedback: selected time slot turns green
   */
  const handleTimeChange = (time) => {
    setSelectedTime(time)
    if (errors.time) {
      setErrors(prev => ({
        ...prev,
        time: ''  // Clear time error
      }))
    }
  }

  /*==============================================
    FORM VALIDATION & EMAIL
  ==============================================*/
  
  /**
   * SEND APPOINTMENT EMAIL CONFIRMATION
   * Sends an email to the patient with appointment details
   * In production: This would call an email service API (SendGrid, Nodemailer, etc.)
   */
  const sendAppointmentEmail = async (appointmentDetails) => {
    try {
      // In production, call your email service API:
      // const response = await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     to: appointmentDetails.email,
      //     subject: 'Appointment Confirmation',
      //     appointmentData: appointmentDetails
      //   })
      // })
      
      // For now, log the email details to console (simulated)
      console.log('📧 Appointment Confirmation Email Sent:', {
        to: appointmentDetails.email,
        subject: 'Your Appointment Confirmation - Kaga Health',
        body: `
Dear ${appointmentDetails.fullName},

Your appointment has been successfully booked!

Appointment Details:
- Date: ${appointmentDetails.date}
- Time: ${appointmentDetails.time}
- Department: ${appointmentDetails.department}
- Doctor: ${appointmentDetails.doctor || 'To be assigned'}
- Contact: ${appointmentDetails.contactNumber}

Please arrive 10 minutes early to your appointment.

If you need to reschedule, please contact us at support@kagahealth.com

Best regards,
Kaga Health Team
        `
      });
      
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
  
  /**
   * VALIDATE FORM
   * Comprehensive validation of all form fields before submission
   * 
   * @returns {boolean} - True if form is valid, false if errors exist
   * 
   * VALIDATION RULES:
   * 1. fullName: Required, not empty after trim
   * 2. age: Required, numeric, between 1-120
   * 3. contactNumber: Required, exactly 10 digits
   * 4. email: Required, valid email format (contains @ and .)
   * 5. department: Required, must select from dropdown
   * 6. selectedDoctor: Required only if requestSpecificDoctor is 'yes'
   * 7. selectedDate: Required, must select from calendar
   * 8. selectedTime: Required, must select from time slots
   * 
   * Sets error messages in errors state object
   * Red error text displays below each invalid field
   */
  const validateForm = () => {
    const newErrors = {}

    // ===== FULL NAME VALIDATION =====
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    
    // ===== AGE VALIDATION =====
    if (!formData.age.trim()) newErrors.age = 'Age is required'
    else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age'  // Must be numeric and reasonable
    }
    
    // ===== CONTACT NUMBER VALIDATION =====
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required'
    else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      // Regex: Remove all non-digits, then check if exactly 10 digits remain
      newErrors.contactNumber = 'Please enter a valid 10-digit phone number'
    }
    
    // ===== EMAIL VALIDATION =====
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Simple regex: must have characters + @ + characters + . + characters
      newErrors.email = 'Please enter a valid email'
    }
    
    // ===== DEPARTMENT VALIDATION =====
    if (!formData.department) newErrors.department = 'Please select a department'
    
    // ===== DOCTOR VALIDATION (conditional) =====
    // Only required if user selected "Yes, I have a preference"
    if (formData.requestSpecificDoctor === 'yes' && !formData.selectedDoctor) {
      newErrors.selectedDoctor = 'Please select a doctor'
    }
    
    // ===== DATE VALIDATION =====
    if (!selectedDate) newErrors.date = 'Please select an appointment date'
    
    // ===== TIME VALIDATION =====
    if (!selectedTime) newErrors.time = 'Please select an appointment time'

    setErrors(newErrors)  // Update errors state
    return Object.keys(newErrors).length === 0  // Return true if no errors
  }

  /**
   * HANDLE FORM SUBMISSION
   * Called when user clicks "Book Appointment" button
   * 
   * @param {Event} e - Form submit event
   * 
   * Process:
   * 1. Prevent default form submission (page refresh)
   * 2. Run validation
   * 3. If valid: Send confirmation email and show success modal
   * 4. If invalid: Display error messages below fields
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form fields first
    if (!validateForm()) return

    // Ensure payment has been completed
    if (paymentStatus !== 'paid') {
      setErrors(prev => ({ ...prev, payment: 'Please complete the UGX 60,000 payment before booking.' }))
      return
    }

    // Build appointment details and proceed
    const appointmentDetails = {
      fullName: formData.fullName,
      email: formData.email || user?.email,
      contactNumber: formData.contactNumber,
      date: selectedDate?.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: selectedTime,
      department: formData.department,
      doctor: formData.selectedDoctor || 'To be assigned'
    }

    // Send confirmation email (simulated) and show success modal
    sendAppointmentEmail(appointmentDetails)
    setShowSuccessModal(true)
    // In production: POST /api/appointments to persist booking + payment reference
  }

  /**
   * HANDLE BOOKING SUCCESS
   * Called when user clicks "Go to Dashboard" in success modal
   * 
   * Effects:
   * - Closes success modal
   * - Navigates to home/dashboard page
   * - New appointment would appear in dashboard (in production)
   */
  const handleBookingSuccess = () => {
    setShowSuccessModal(false)  // Close modal
    navigate('/home')  // Redirect to dashboard
  }

  /*==============================================
    COMPUTED VALUES
  ==============================================*/
  
  /**
   * AVAILABLE DOCTORS FOR SELECTED DEPARTMENT
   * Dynamically filters doctors list based on selected department
   * Returns: Array of doctor names for the selected department
   * Example: If department is 'Cardiology', returns ['Dr. Sarah Johnson', 'Dr. Robert Miller']
   */
  const availableDoctorsForDepartment = formData.department ? doctors[formData.department] || [] : []

  /*==============================================
    RENDER / JSX
  ==============================================*/
  
  return (
    <div className="booking-page">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* ==================== PAGE HEADER ==================== */}
      <div className="page-header">
        <h1>
          <img src="/icons/calendar.svg" alt="Book" style={{ width: 26, height: 26, verticalAlign: 'middle', marginRight: 10 }} />
          Book Your Appointment
        </h1>
        <p>Fill in your details and select your preferred date and time</p>
      </div>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <div className="container" style={{ paddingBottom: '60px' }}>
        {/* TWO-COLUMN LAYOUT: Form (left) + Calendar (right) */}
        <div className="two-column">
          
          {/* ========== LEFT COLUMN: BOOKING FORM ========== */}
          <div className="booking-form">
            <h2>
              <img src="/icons/user.svg" alt="Patient" style={{ width: 22, height: 22, verticalAlign: 'middle', marginRight: 8 }} />
              Patient Information
            </h2>
            
            {/* 
              FORM ELEMENT
              - onSubmit: Triggers validation and booking
              - Multiple form groups with labels, inputs, and error displays
            */}
            <form onSubmit={handleSubmit}>
              
              {/* ----- PATIENT DETAILS (hide repeated fields for logged-in users) ----- */}
              {user && !showEditDetails ? (
                <div className="form-group compact-details">
                  <label className="form-label">Using account details</label>
                  <div className="account-summary">
                    <div><strong>Name:</strong> {formData.fullName || user.name || user.username}</div>
                    {formData.age && <div><strong>Age:</strong> {formData.age}</div>}
                    <div><strong>Phone:</strong> {formData.contactNumber || user.phone || '—'}</div>
                    <div><strong>Email:</strong> {formData.email || user.email || '—'}</div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditDetails(true)}>
                      Edit details
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* ----- FULL NAME FIELD ----- */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="form-input"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                    {/* Conditional error message display */}
                    {errors.fullName && (
                      <div className="form-validation-error">{errors.fullName}</div>
                    )}
                  </div>

                  {/* ----- AGE FIELD ----- */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="age">Age *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      className="form-input"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                      min="1"  // HTML5 validation: minimum value
                      max="120"  // HTML5 validation: maximum value
                    />
                    {errors.age && (
                      <div className="form-validation-error">{errors.age}</div>
                    )}
                  </div>

                  {/* ----- CONTACT NUMBER FIELD ----- */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactNumber">
                      <img src="/icons/phone.svg" alt="Contact" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                      Contact Number *
                    </label>
                    <input
                      type="tel"  // Mobile keyboards show number pad
                      id="contactNumber"
                      name="contactNumber"
                      className="form-input"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                    {errors.contactNumber && (
                      <div className="form-validation-error">{errors.contactNumber}</div>
                    )}
                  </div>

                  {/* ----- EMAIL FIELD ----- */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      <img src="/icons/mail.svg" alt="Email" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                      Email Address *
                    </label>
                    <input
                      type="email"  // HTML5 email validation
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <div className="form-validation-error">{errors.email}</div>
                    )}
                  </div>
                </>
              )}

              {/* ----- DEPARTMENT DROPDOWN ----- */}
              <div className="form-group">
                <label className="form-label" htmlFor="department">
                  <img src="/icons/department.svg" alt="Department" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleInputChange}  // Triggers doctor list update
                >
                  <option value="">Select a department</option>
                  {/* Map through departments array to create options */}
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && (
                  <div className="form-validation-error">{errors.department}</div>
                )}
              </div>

              {/* ----- DOCTOR PREFERENCE RADIO BUTTONS ----- */}
              <div className="form-group">
                <label className="form-label">
                  <img src="/icons/doctor.svg" alt="Doctor" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                  Request a specific doctor?
                </label>
                <div className="radio-group">
                  {/* Option 1: No preference */}
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="doctorNo"
                      name="requestSpecificDoctor"
                      value="no"
                      checked={formData.requestSpecificDoctor === 'no'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="doctorNo">No, any available doctor</label>
                  </div>
                  {/* Option 2: Has preference */}
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="doctorYes"
                      name="requestSpecificDoctor"
                      value="yes"
                      checked={formData.requestSpecificDoctor === 'yes'}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="doctorYes">Yes, I have a preference</label>
                  </div>
                </div>
              </div>

              {/* ----- DOCTOR SELECTION (conditional) ----- */}
              {/* Only shown if user selected "Yes, I have a preference" */}
              {formData.requestSpecificDoctor === 'yes' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="selectedDoctor">Select Doctor *</label>
                  <select
                    id="selectedDoctor"
                    name="selectedDoctor"
                    className="form-select"
                    value={formData.selectedDoctor}
                    onChange={handleInputChange}
                    disabled={!formData.department}  // Disabled until department selected
                  >
                    <option value="">
                      {/* Dynamic placeholder text */}
                      {!formData.department ? 'Please select a department first' : 'Select a doctor'}
                    </option>
                    {/* Map through doctors for selected department */}
                    {availableDoctorsForDepartment.map(doctor => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
                  </select>
                  {errors.selectedDoctor && (
                    <div className="form-validation-error">{errors.selectedDoctor}</div>
                  )}
                </div>
              )}

              {/* ----- PAYMENT PANEL (require UGX 60,000 before booking) ----- */}
              <div className="payment-panel" style={{ marginTop: 6 }}>
                <label className="form-label">Booking Fee: <strong>UGX 60,000</strong></label>
                <p style={{ marginTop: 4, marginBottom: 8, color: '#555' }}>You must complete payment to confirm the appointment.</p>

                <div className="form-group">
                  <label className="form-label" htmlFor="paymentPhone">Phone to receive payment prompt *</label>
                  <input
                    type="tel"
                    id="paymentPhone"
                    name="paymentPhone"
                    className="form-input"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    placeholder="Enter phone for payment prompt"
                  />
                  {errors.payment && (
                    <div className="form-validation-error">{errors.payment}</div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                  {paymentStatus === 'unpaid' && (
                    <button type="button" className="btn btn-primary" onClick={handlePayment}>
                      Pay UGX 60,000
                    </button>
                  )}
                  {paymentStatus === 'processing' && (
                    <button type="button" className="btn" disabled>Processing payment…</button>
                  )}
                  {paymentStatus === 'paid' && (
                    <div className="payment-success" style={{ color: 'green', fontWeight: 600 }}>Payment received ✓</div>
                  )}
                </div>
              </div>

              {/* ----- FORM ACTION BUTTONS ----- */}
              <div className="form-buttons">
                {/* GREEN button - primary action */}
                <button type="submit" className="btn btn-primary">
                  <img src="/icons/calendar.svg" alt="Book" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
                  Book Appointment
                </button>
                {/* BLUE button - secondary action */}
                <Link to="/home" className="btn btn-secondary">
                  <img src="/icons/arrow.svg" alt="" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6, transform: 'rotate(180deg)' }} />
                  Back to Home
                </Link>
              </div>
            </form>
          </div>

          {/* ========== RIGHT COLUMN: CALENDAR & TIME SELECTION ========== */}
          <div>
            <div className="calendar-panel">
              <h3>
                <img src="/icons/calendar.svg" alt="Calendar" style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }} />
                Select Date & Time
              </h3>
              
              {/* 
                CALENDAR COMPONENT
                - Shows interactive calendar
                - Displays doctor availability with green checkmarks
                - Disables past dates and unavailable dates
                - Props: selectedDate, onDateChange, selectedDoctor, availableDoctors
              */}
              <CalendarComponent
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                selectedDoctor={formData.selectedDoctor}
                availableDoctors={doctorAvailability}
              />
              
              {/* Date validation error */}
              {errors.date && (
                <div className="form-validation-error" style={{ textAlign: 'center', marginTop: '10px' }}>
                  {errors.date}
                </div>
              )}

              {/* ----- TIME SLOT SELECTION (conditional) ----- */}
              {/* Only shown after date is selected */}
              {selectedDate && (
                <div className="time-selector">
                  <h4>
                    <img src="/icons/clock.svg" alt="Time" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                    Select Time
                  </h4>
                  <div className="time-grid">
                    {/* Map through time slots to create clickable buttons */}
                    {timeSlots.map(time => (
                      <div
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}  // 'selected' class adds green styling
                        onClick={() => handleTimeChange(time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                  {/* Time validation error */}
                  {errors.time && (
                    <div className="form-validation-error" style={{ marginTop: '10px' }}>
                      {errors.time}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== SUCCESS MODAL ==================== */}
      {/* 
        Overlay modal shown after successful booking
        - Dark semi-transparent background
        - White modal card with booking confirmation
        - Displays all appointment details
        - Button to navigate to dashboard
      */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              <img src="/icons/success.svg" alt="Success" style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }} />
              Appointment Booked Successfully!
            </h3>
            <div className="success-message">
              <p><strong>Appointment Details:</strong></p>
              <p><strong>Patient:</strong> {formData.fullName}</p>
              <p><strong>Department:</strong> {formData.department}</p>
              {/* Conditionally show doctor if selected */}
              {formData.selectedDoctor && (
                <p><strong>Doctor:</strong> {formData.selectedDoctor}</p>
              )}
              <p><strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
            </div>
            <p>
              <img src="/icons/email-success.svg" alt="Email sent" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
              A confirmation email has been sent to {formData.email}
            </p>
            <div className="modal-buttons">
              {/* GREEN button - navigates to dashboard */}
              <button className="btn btn-primary" onClick={handleBookingSuccess}>
                <img src="/icons/check.svg" alt="Go" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Book