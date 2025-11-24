/**
 * HOME PAGE / DASHBOARD 🏠
 * 
 * This is the main dashboard page where users can view and manage their appointments.
 * It displays a hero section, an interactive calendar, and appointment cards.
 * 
 * KEY FEATURES:
 * - Hero section with "Book Appointment" call-to-action
 * - Interactive calendar showing dates with appointments (green dots)
 * - View appointments for a specific selected date
 * - View all upcoming appointments in a grid layout
 * - Cancel appointments with confirmation
 * 
 * COMPONENTS USED:
 * - Navbar: Top navigation bar
 * - AppointmentCard: Individual appointment display with cancel functionality
 * - Calendar (react-calendar): Interactive calendar component
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AppointmentCard from '../components/AppointmentCard'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Home = () => {
  /*==============================================
    STATE MANAGEMENT
  ==============================================*/
  
  /**
   * APPOINTMENTS STATE
   * Stores all user appointments with details:
   * - id: Unique identifier
   * - date: Appointment date (YYYY-MM-DD format)
   * - time: Appointment time (HH:MM format)
   * - doctor: Doctor's full name
   * - department: Medical department
   * - patientName: Patient's name
   * 
   * In production, this would come from a database via API call
   */
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-10-20',
      time: '10:00',
      doctor: 'Sarah Johnson',
      department: 'Cardiology',
      patientName: 'John Doe'
    },
    {
      id: 2,
      date: '2024-10-25',
      time: '14:30',
      doctor: 'Michael Chen',
      department: 'General',
      patientName: 'John Doe'
    },
    {
      id: 3,
      date: '2024-11-02',
      time: '09:15',
      doctor: 'Emily Rodriguez',
      department: 'Dental',
      patientName: 'John Doe'
    }
  ])

  /**
   * SELECTED DATE STATE
   * Tracks which date the user has selected on the calendar
   * Default: Current date/time
   * Used to filter appointments for a specific date
   */
  const [selectedDate, setSelectedDate] = useState(new Date())

  /*==============================================
    DATA FILTERING
  ==============================================*/
  
  /**
   * FILTER APPOINTMENTS FOR SELECTED DATE
   * Returns only appointments that match the currently selected date
   * Compares full date strings (e.g., "Mon Oct 20 2024")
   */
  const appointmentsForDate = appointments.filter(apt => {
    const aptDate = new Date(apt.date)
    return aptDate.toDateString() === selectedDate.toDateString()
  })

  /*==============================================
    EVENT HANDLERS
  ==============================================*/
  
  /**
   * HANDLE APPOINTMENT CANCELLATION
   * Removes an appointment from the list when user confirms cancellation
   * 
   * @param {number} appointmentId - The unique ID of the appointment to cancel
   * 
   * Process:
   * 1. Filter out the appointment with matching ID
   * 2. Update state with new filtered array
   * 3. AppointmentCard component shows confirmation modal first
   * 
   * In production: Would send DELETE request to backend API
   */
  const handleCancelAppointment = (appointmentId) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId))
  }

  /*==============================================
    CALENDAR HELPER FUNCTIONS
  ==============================================*/
  
  /**
   * CHECK IF DATE HAS APPOINTMENTS
   * Determines if a specific calendar date has any appointments
   * Used to show green indicator dots on calendar
   * 
   * @param {Date} date - The date to check
   * @returns {boolean} - True if date has appointments, false otherwise
   */
  const hasAppointments = (date) => {
    return appointments.some(apt => {
      const aptDate = new Date(apt.date)
      return aptDate.toDateString() === date.toDateString()
    })
  }

  /**
   * CUSTOM CALENDAR TILE CONTENT
   * Adds a green dot indicator below dates that have appointments
   * 
   * @param {Date} date - The date of the calendar tile
   * @param {string} view - The calendar view ('month', 'year', etc.)
   * @returns {JSX.Element|null} - Green dot indicator or null
   * 
   * Visual: Small circular green dot centered below the date number
   */
  const tileContent = ({ date, view }) => {
    if (view === 'month' && hasAppointments(date)) {
      return (
        <div 
          style={{
            width: '6px',             // Small dot size
            height: '6px',
            backgroundColor: 'var(--primary-green)',  // Green indicator
            borderRadius: '50%',      // Perfect circle
            margin: '2px auto'        // Center the dot
          }}
        />
      )
    }
  }

  /**
   * CUSTOM CALENDAR TILE CLASS NAMES
   * Adds CSS class to calendar tiles that have appointments
   * Allows custom styling in CSS file
   * 
   * @param {Date} date - The date of the calendar tile
   * @param {string} view - The calendar view
   * @returns {string|null} - CSS class name or null
   */
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && hasAppointments(date)) {
      return 'react-calendar__tile--hasAppointment'
    }
  }

  /*==============================================
    RENDER / JSX
  ==============================================*/
  
  return (
    <div>
      {/* Navigation Bar - Fixed at top */}
      <Navbar />
      
      {/* ==================== HERO SECTION ==================== */}
      {/* 
        Large banner with call-to-action
        - Gradient blue background
        - Main heading and description
        - Primary action button (Book Appointment - GREEN)
        - Healthcare professional image
      */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Your health, your time</h1>
            <p>Book an appointment in seconds with our trusted healthcare professionals</p>
            <Link to="/book" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '15px 30px' }}>
            <img src="/icons/calendar.svg" alt="Book" style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }} />
            Book Appointment
            </Link>
          </div>
          <div className="hero-image">
            <img 
              src="/images/istockphoto-1400053534-612x612.jpg" 
              alt="Healthcare professional" 
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* ==================== APPOINTMENTS SECTION ==================== */}
      {/*
        Main content area with:
        1. Interactive calendar (left column)
        2. Appointments for selected date (right column)
        3. All upcoming appointments (below)
      */}
      <section className="calendar-section">
        <div className="container">
          <h2>Your Appointments</h2>
          
          {/* TWO-COLUMN LAYOUT: Calendar + Selected Date Appointments */}
          <div className="two-column">
            
            {/* ========== LEFT COLUMN: CALENDAR ========== */}
            <div className="calendar-panel">
              <h3>Select a Date</h3>
              {/*
                React Calendar Component
                - onChange: Updates selectedDate when user clicks a date
                - value: Currently selected date
                - tileContent: Adds green dots to dates with appointments
                - tileClassName: Adds custom CSS class for styling
                - showNeighboringMonth: Hide dates from previous/next months
                - prev2Label/next2Label: Remove year navigation arrows
              */}
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={tileClassName}
                showNeighboringMonth={false}
                prev2Label={null}
                next2Label={null}
              />
              <p style={{ textAlign: 'center', marginTop: '15px', color: 'var(--text-light)', fontSize: '14px' }}>
             <img src="/icons/dot-green.svg" alt="Green dot" style={{ width: 12, height: 12, marginRight: 4 }} />
             Green dots indicate appointment dates
              </p>
            </div>

            {/* ========== RIGHT COLUMN: APPOINTMENTS FOR SELECTED DATE ========== */}
            <div>
              {/* Display selected date in readable format (e.g., "Monday, October 20, 2024") */}
              <h3 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>
                Appointments for {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              
              {/* CONDITIONAL RENDERING: Show appointments or empty state */}
              {appointmentsForDate.length > 0 ? (
                // Map through filtered appointments and render cards
                appointmentsForDate.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}  // Pass cancel handler
                  />
                ))
              ) : (
                // Empty state when no appointments on selected date
                <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: 'var(--text-light)', fontSize: '16px' }}>
                <img src="/icons/empty.svg" alt="No appointments" style={{ width: 22, height: 22, marginRight: 6 }} />
                No appointments scheduled for this date
                  </p>
                  <Link 
                    to="/book" 
                    className="btn btn-primary" 
                    style={{ marginTop: '15px' }}
                  >
                <img src="/icons/calendar.svg" alt="Book" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
                Book New Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ========== ALL UPCOMING APPOINTMENTS SECTION ========== */}
          {/*
            Grid layout showing all appointments regardless of date
            - Responsive grid: adjusts columns based on screen width
            - Each appointment shown as a card
            - Shows total count in heading
          */}
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--text-dark)' }}>
            <img src="/icons/clipboard.svg" alt="Appointments" style={{ width: 20, height: 20, marginRight: 6 }} />
            All Upcoming Appointments ({appointments.length})
            </h3>
            
            {/* CONDITIONAL RENDERING: Show grid of appointments or empty state */}
            {appointments.length > 0 ? (
              // Responsive grid layout
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',  // Responsive columns
                gap: '20px'  // Space between cards
              }}>
                {/* Map all appointments to cards */}
                {appointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}  // Pass cancel handler
                  />
                ))}
              </div>
            ) : (
              // Empty state when user has no appointments at all
              <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: 'var(--text-light)', fontSize: '18px' }}>
              <img src="/icons/empty.svg" alt="No appointments" style={{ width: 22, height: 22, marginRight: 6 }} />
              You have no upcoming appointments
                </p>
                <Link 
                  to="/book" 
                  className="btn btn-primary" 
                  style={{ marginTop: '20px' }}
                >
              <img src="/icons/calendar.svg" alt="Book" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
              Book Your First Appointment
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home