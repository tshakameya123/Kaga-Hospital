/**
 * ==================================================================
 * DOCTOR PORTAL / AVAILABILITY MANAGEMENT PAGE
 * ==================================================================
 * Doctor dashboard for managing their availability and patient appointments
 * Only accessible to authenticated doctors
 * 
 * Features:
 * - Set work hours (from/to times)
 * - Select work days (Monday-Sunday)
 * - Calendar showing available days
 * - Click day to view appointments for that day
 * - Mark appointments as "Cleared" or "Cancelled"
 * - Add clinical notes to appointments
 * - View patient information with each appointment
 * 
 * Data Storage:
 * - localStorage keys:
 *   - doctorAvailability-${doctorName}: { days, from, to }
 *   - doctorNotes-${appointmentId}: clinical notes
 * ==================================================================
 */

import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import Calendar from 'react-calendar'
import './Doctors.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DAY_NUMBERS = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }

const Doctors = () => {
  const { user } = useUser()
  const doctorName = user?.name

  // Availability form state
  const [selectedDays, setSelectedDays] = useState([])
  const [fromTime, setFromTime] = useState('09:00')
  const [toTime, setToTime] = useState('17:00')
  const [savingAvailability, setSavingAvailability] = useState(false)

  // Calendar & appointment state
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAppointments, setShowAppointments] = useState(false)
  const [appointmentsForDay, setAppointmentsForDay] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [clinicalNotes, setClinicalNotes] = useState('')
  const [showNotesModal, setShowNotesModal] = useState(false)

  // Load availability on component mount
  useEffect(() => {
    if (doctorName) {
      const saved = localStorage.getItem(`doctorAvailability-${doctorName}`)
      if (saved) {
        const avail = JSON.parse(saved)
        setSelectedDays(avail.days || [])
        setFromTime(avail.from || '09:00')
        setToTime(avail.to || '17:00')
      }
    }
  }, [doctorName])

  // Get appointments for the doctor (mock data)
  const getMockAppointments = () => {
    const mockAppointments = [
      {
        id: 1,
        doctorName: 'Dr. Sarah Johnson',
        patientName: 'John Doe',
        patientEmail: 'john@example.com',
        department: 'Cardiology',
        date: new Date(2024, 0, 15),
        time: '10:00',
        status: 'scheduled',
        reason: 'Regular checkup'
      },
      {
        id: 2,
        doctorName: 'Dr. Sarah Johnson',
        patientName: 'Jane Smith',
        patientEmail: 'jane@example.com',
        department: 'Cardiology',
        date: new Date(2024, 0, 15),
        time: '11:00',
        status: 'scheduled',
        reason: 'Follow-up consultation'
      },
      {
        id: 3,
        doctorName: 'Dr. Sarah Johnson',
        patientName: 'Mike Johnson',
        patientEmail: 'mike@example.com',
        department: 'Cardiology',
        date: new Date(2024, 0, 16),
        time: '14:00',
        status: 'scheduled',
        reason: 'Blood pressure check'
      }
    ]

    return mockAppointments.filter(apt => apt.doctorName === doctorName)
  }

  /**
   * Handle day checkbox change for availability
   */
  const handleDayChange = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  /**
   * Save availability to localStorage
   */
  const handleSaveAvailability = (e) => {
    e.preventDefault()
    setSavingAvailability(true)

    const availability = {
      days: selectedDays,
      from: fromTime,
      to: toTime
    }

    localStorage.setItem(`doctorAvailability-${doctorName}`, JSON.stringify(availability))

    setTimeout(() => setSavingAvailability(false), 1500)
  }

  /**
   * Check if a date is an available work day
   */
  const isAvailableDay = (date) => {
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
    return selectedDays.includes(dayName)
  }

  /**
   * Handle calendar date selection
   */
  const handleDateSelect = (date) => {
    setSelectedDate(date)
    const appointments = getMockAppointments().filter(apt => {
      const aptDate = new Date(apt.date)
      return aptDate.toDateString() === date.toDateString()
    })
    setAppointmentsForDay(appointments)
    setShowAppointments(true)
  }

  /**
   * Open notes modal for an appointment
   */
  const handleAddNotes = (appointment) => {
    setSelectedAppointment(appointment)
    const saved = localStorage.getItem(`doctorNotes-${appointment.id}`)
    setClinicalNotes(saved || '')
    setShowNotesModal(true)
  }

  /**
   * Save clinical notes
   */
  const handleSaveNotes = () => {
    if (selectedAppointment) {
      localStorage.setItem(`doctorNotes-${selectedAppointment.id}`, clinicalNotes)
      setShowNotesModal(false)
      setClinicalNotes('')
      setSelectedAppointment(null)
    }
  }

  /**
   * Mark appointment as cleared or cancelled
   */
  const handleAppointmentStatus = (appointment, status) => {
    const updated = appointmentsForDay.map(apt =>
      apt.id === appointment.id ? { ...apt, status } : apt
    )
    setAppointmentsForDay(updated)
    // In a real app, this would be saved to backend
  }

  return (
    <div className="doctor-portal-bg">
      <div className="doctor-portal-container">
      
      {/* ==================== HEADER ==================== */}
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <img src="/icons/doctor.svg" alt="Doctor" style={{ width: 32, height: 32, marginRight: 12 }} />
          <h1>Doctor Portal</h1>
        </div>
        <p style={{ fontSize: '16px', color: '#666' }}>Welcome, {doctorName}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 40 }}>
        
        {/* ==================== AVAILABILITY FORM (Left) ==================== */}
        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <img src="/icons/calendar.svg" alt="Availability" style={{ width: 24, height: 24, marginRight: 10 }} />
            Your Availability
          </h2>

          <form onSubmit={handleSaveAvailability}>
            {/* Work Days Selection */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600, marginBottom: 12, display: 'block', fontSize: '14px' }}>
                <img src="/icons/check.svg" alt="Days" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Select Work Days:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {DAYS.map(day => (
                  <label key={day} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '8px 0' }}>
                    <input
                      type="checkbox"
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px' }}>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Work Hours */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600, marginBottom: 12, display: 'block', fontSize: '14px' }}>
                <img src="/icons/clock.svg" alt="Hours" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Work Hours:
              </label>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: 4, color: '#666' }}>From</label>
                  <input
                    type="time"
                    value={fromTime}
                    onChange={e => setFromTime(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: 4, color: '#666' }}>To</label>
                  <input
                    type="time"
                    value={toTime}
                    onChange={e => setToTime(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: 16 }}
              disabled={savingAvailability}
            >
              <img src="/icons/check.svg" alt="Save" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
              {savingAvailability ? 'Saving...' : 'Save Availability'}
            </button>

            {savingAvailability && (
              <div style={{ color: 'var(--primary-green)', marginTop: 12, textAlign: 'center', fontSize: '14px' }}>
                ✓ Availability saved successfully!
              </div>
            )}
          </form>
        </div>

        {/* ==================== CALENDAR (Right) ==================== */}
        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <img src="/icons/calendar.svg" alt="Calendar" style={{ width: 24, height: 24, marginRight: 10 }} />
            Your Schedule
          </h2>

          <Calendar
            value={selectedDate}
            onChange={handleDateSelect}
            tileClassName={({ date }) =>
              isAvailableDay(date) ? 'available-day' : ''
            }
            style={{
              width: '100%',
              border: 'none'
            }}
          />

          <p style={{ fontSize: '12px', color: '#666', marginTop: 16, textAlign: 'center' }}>
            Click on any day to view appointments
          </p>
        </div>
      </div>

      {/* ==================== APPOINTMENTS FOR SELECTED DAY ==================== */}
      {showAppointments && (
        <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
            <img src="/icons/calendar.svg" alt="Appointments" style={{ width: 24, height: 24, marginRight: 10 }} />
            Appointments for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h2>

          {appointmentsForDay.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
              <img src="/icons/calendar.svg" alt="No appointments" style={{ width: 48, height: 48, opacity: 0.3, marginBottom: 12 }} />
              <p>No appointments scheduled for this day</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {appointmentsForDay.map(appointment => (
                <div key={appointment.id} style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: 16,
                  backgroundColor: appointment.status === 'cleared' ? '#f0f8f0' : appointment.status === 'cancelled' ? '#f8f0f0' : '#f9f9f9'
                }}>
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: 4 }}>Patient Name</p>
                        <p style={{ fontWeight: 600, fontSize: '16px' }}>{appointment.patientName}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: 4 }}>Email</p>
                        <p style={{ fontSize: '14px' }}>{appointment.patientEmail}</p>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: 4 }}>Time</p>
                        <p style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{appointment.time}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: 4 }}>Reason for Visit</p>
                        <p style={{ fontSize: '14px' }}>{appointment.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160 }}>
                    <button
                      onClick={() => handleAddNotes(appointment)}
                      className="btn btn-secondary"
                      style={{ fontSize: '13px', padding: '8px 12px' }}
                    >
                      <img src="/icons/edit.svg" alt="Notes" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 4 }} />
                      Notes
                    </button>
                    <button
                      onClick={() => handleAppointmentStatus(appointment, 'cleared')}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: 'var(--primary-green)',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4
                      }}
                    >
                      <img src="/icons/check.svg" alt="Clear" style={{ width: 14, height: 14 }} />
                      Clear
                    </button>
                    <button
                      onClick={() => handleAppointmentStatus(appointment, 'cancelled')}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #ff6b6b',
                        backgroundColor: 'transparent',
                        color: '#ff6b6b',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4
                      }}
                    >
                      <img src="/icons/close.svg" alt="Cancel" style={{ width: 14, height: 14 }} />
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== CLINICAL NOTES MODAL ==================== */}
      {showNotesModal && selectedAppointment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowNotesModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src="/icons/edit.svg" alt="Notes" style={{ width: 24, height: 24 }} />
                Clinical Notes
              </h3>
              <button
                onClick={() => setShowNotesModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: 8 }}>Patient: <strong>{selectedAppointment.patientName}</strong></p>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: 16 }}>Appointment: {new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}</p>
            </div>

            <textarea
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Enter clinical notes, observations, treatment plan, etc."
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontFamily: 'inherit',
                fontSize: '14px',
                marginBottom: 20,
                resize: 'vertical'
              }}
            />

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleSaveNotes}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <img src="/icons/check.svg" alt="Save" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 4 }} />
                Save Notes
              </button>
              <button
                onClick={() => setShowNotesModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Doctors
