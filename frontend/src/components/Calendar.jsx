/**
 * CALENDAR COMPONENT 📅
 * 
 * A customized calendar component that displays appointment availability
 * and doctor schedules with visual indicators.
 * 
 * KEY FEATURES:
 * - Interactive date selection
 * - Green dot indicators for dates with existing appointments
 * - Green checkmarks for doctor availability (when doctor selected)
 * - Disables past dates (can't book appointments in the past)
 * - Highlights selected date
 * - Hides neighboring month dates for cleaner look
 * 
 * PROPS:
 * @param {Date} selectedDate - Currently selected date from parent
 * @param {Function} onDateChange - Callback when user clicks a date
 * @param {Array} appointments - Array of existing appointments (for Home page)
 * @param {string} selectedDoctor - Doctor name selected in booking form (or null)
 * @param {Array} availableDoctors - Array of doctor availability data:
 *   Example: [{ name: 'Dr. Smith', availableDays: [1, 2, 3, 4, 5] }]
 *   Days: 0=Sunday, 1=Monday, 2=Tuesday, etc.
 * 
 * VISUAL INDICATORS:
 * - Green dot below date = Has appointments
 * - Green checkmark = Doctor available on this date
 * - Disabled/grayed = Past date (cannot select)
 * - Blue highlight = Currently selected date
 */

import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const CalendarComponent = ({ 
  selectedDate, 
  onDateChange, 
  appointments = [],  // Default to empty array if not provided
  selectedDoctor = null,  // Default to null if not provided
  availableDoctors = []  // Default to empty array if not provided
}) => {
  /**
   * ACTIVE START DATE STATE
   * Tracks the currently displayed month/year in the calendar
   * Allows calendar to remember position when re-rendering
   */
  const [activeStartDate, setActiveStartDate] = useState(new Date())

  /*==============================================
    HELPER FUNCTIONS
  ==============================================*/
  
  /**
   * CHECK IF DATE HAS APPOINTMENTS
   * Determines if a given date has any appointments scheduled
   * Used to show green dot indicator
   * 
   * @param {Date} date - The date to check
   * @returns {boolean} - True if appointments exist on this date
   */
  const hasAppointments = (date) => {
    return appointments.some(apt => {  // .some() returns true if any appointment matches
      const aptDate = new Date(apt.date)
      return aptDate.toDateString() === date.toDateString()  // Compare date strings
    })
  }

  /**
   * CHECK IF DOCTOR IS AVAILABLE ON DATE
   * Determines if the selected doctor works on the given date's day of week
   * Used to show green checkmark indicator
   * 
   * @param {Date} date - The date to check
   * @returns {boolean} - True if doctor is available, or true if no doctor selected
   * 
   * Logic:
   * 1. If no doctor selected → return true (all dates available)
   * 2. Get day of week from date (0-6)
   * 3. Find doctor in availableDoctors array
   * 4. Check if dayOfWeek is in doctor's availableDays array
   */
  const isDoctorAvailable = (date) => {
    if (!selectedDoctor) return true  // No doctor selected = all dates available
    
    const dayOfWeek = date.getDay()  // Get day: 0 = Sunday, 1 = Monday, etc.
    const doctor = availableDoctors.find(doc => doc.name === selectedDoctor)  // Find doctor object
    
    if (!doctor) return false  // Doctor not found in availability data
    
    return doctor.availableDays.includes(dayOfWeek)  // Check if day is in available days
  }

  /**
   * CHECK IF DATE IS IN THE PAST
   * Prevents users from booking appointments on past dates
   * 
   * @param {Date} date - The date to check
   * @returns {boolean} - True if date is before today
   * 
   * Note: Sets hours to 0 to compare dates only (not times)
   */
  const isPastDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)  // Reset time to midnight for accurate date comparison
    return date < today
  }

  /*==============================================
    CALENDAR CUSTOMIZATION FUNCTIONS
  ==============================================*/
  
  /**
   * CUSTOM TILE CONTENT
   * Adds visual indicators inside calendar date tiles
   * 
   * @param {Date} date - The date of the tile
   * @param {string} view - Calendar view ('month', 'year', 'decade')
   * @returns {JSX.Element|null} - Custom content to display in tile
   * 
   * Visual Elements Added:
   * 1. Green dot = Date has appointments
   * 2. Green checkmark (✓) = Doctor available on this date
   */
  const tileContent = ({ date, view }) => {
    if (view === 'month') {  // Only customize month view tiles
      const content = []  // Array to hold multiple indicators
      
      // ===== APPOINTMENT INDICATOR (Green Dot) =====
      if (hasAppointments(date)) {
        content.push(
          <div 
            key="appointment-indicator"  // Unique key for React
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: 'var(--primary-green)',  // Green dot
              borderRadius: '50%',  // Make it circular
              margin: '2px auto'  // Center it
            }}
          />
        )
      }
      
      // ===== DOCTOR AVAILABILITY INDICATOR (Green Checkmark) =====
      // Only show if:
      // 1. A doctor is selected
      // 2. Doctor is available on this day
      // 3. Date is not in the past
      if (selectedDoctor && isDoctorAvailable(date) && !isPastDate(date)) {
        content.push(
          <div 
            key="availability-indicator"  // Unique key for React
            style={{
              fontSize: '12px',
              color: 'var(--primary-green)',  // Green checkmark
              fontWeight: 'bold'
            }}
          >
            ✓
          </div>
        )
      }
      
      // Return all indicators, or null if no indicators
      return content.length > 0 ? <div>{content}</div> : null
    }
  }

  /**
   * CUSTOM TILE CLASS NAMES
   * Adds CSS classes to calendar tiles for custom styling
   * 
   * @param {Date} date - The date of the tile
   * @param {string} view - Calendar view
   * @returns {string} - Space-separated class names
   * 
   * Classes Added:
   * - react-calendar__tile--hasAppointment: For dates with appointments
   * - react-calendar__tile--disabled: For past dates (grayed out)
   */
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {  // Only for month view
      const classes = []  // Array to collect class names
      
      // Add class for dates with appointments
      if (hasAppointments(date)) {
        classes.push('react-calendar__tile--hasAppointment')
      }
      
      // Add class for past dates
      if (isPastDate(date)) {
        classes.push('react-calendar__tile--disabled')
      }
      
      return classes.join(' ')  // Join with space to create valid className string
    }
  }

  /**
   * TILE DISABLED FUNCTION
   * Determines if a calendar tile should be disabled (not clickable)
   * 
   * @param {Date} date - The date of the tile
   * @param {string} view - Calendar view
   * @returns {boolean} - True to disable the tile
   * 
   * Disabled tiles are:
   * - Grayed out
   * - Not clickable
   * - Cannot be selected
   */
  const tileDisabled = ({ date, view }) => {
    return view === 'month' && isPastDate(date)  // Disable if month view AND past date
  }

  /*==============================================
    RENDER / JSX
  ==============================================*/
  
  return (
    <div className="calendar-container">
      {/*
        REACT CALENDAR COMPONENT
        Third-party library with extensive customization
        
        PROPS EXPLAINED:
        - onChange: Callback when user clicks a date
        - value: Currently selected date (controlled component)
        - activeStartDate: Currently displayed month/year
        - onActiveStartDateChange: Callback when user navigates months
        - tileContent: Custom content inside date tiles (dots, checkmarks)
        - tileClassName: Custom CSS classes for tiles
        - tileDisabled: Function to disable specific dates
        - minDate: Minimum selectable date (today)
        - showNeighboringMonth: Hide dates from adjacent months
        - prev2Label/next2Label: Remove year navigation (null = hidden)
      */}
      <Calendar
        onChange={onDateChange}  // Update parent state when date clicked
        value={selectedDate}  // Highlight selected date
        activeStartDate={activeStartDate}  // Control displayed month
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}  // Track month changes
        tileContent={tileContent}  // Add green dots and checkmarks
        tileClassName={tileClassName}  // Add custom CSS classes
        tileDisabled={tileDisabled}  // Disable past dates
        minDate={new Date()}  // Can't select dates before today
        showNeighboringMonth={false}  // Cleaner look - only show current month
        prev2Label={null}  // Hide year back button
        next2Label={null}  // Hide year forward button
      />
      
      {/* ===== DOCTOR AVAILABILITY LEGEND ===== */}
      {/* Only shown when a specific doctor is selected */}
      {selectedDoctor && (
        <div className="doctor-availability">
          <div className="availability-indicator">✓</div>
          <span>Green checkmarks show Dr. {selectedDoctor.split(' ').pop()}'s available days</span>
        </div>
      )}
    </div>
  )
}

export default CalendarComponent