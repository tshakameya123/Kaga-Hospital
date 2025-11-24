import React, { useState } from 'react'

const AppointmentCard = ({ appointment, onCancel }) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const handleCancelClick = () => {
    setShowCancelModal(true)
  }

  const confirmCancel = () => {
    onCancel(appointment.id)
    setShowCancelModal(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    const time = new Date(`2024-01-01 ${timeString}`)
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <>
      <div 
        className="appointment-card"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="appointment-header">
          <div className="appointment-time" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <img src="/icons/clock.svg" alt="Time" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />
            {formatTime(appointment.time)}
          </div>
          <button 
            className="btn btn-danger"
            onClick={handleCancelClick}
            style={{ padding: '6px 12px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <img src="/icons/alert.svg" alt="Cancel" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />
            Cancel
          </button>
        </div>
        
        <div className="appointment-details">
          <p><strong>Date:</strong> <img src="/icons/calendar.svg" alt="Date" style={{ width: 14, height: 14, verticalAlign: 'middle', marginRight: 4 }} /> {formatDate(appointment.date)}</p>
          <p><strong>Doctor:</strong> <img src="/icons/doctor.svg" alt="Doctor" style={{ width: 14, height: 14, verticalAlign: 'middle', marginRight: 4 }} /> Dr. {appointment.doctor}</p>
          <p><strong>Department:</strong> <img src="/icons/department.svg" alt="Department" style={{ width: 14, height: 14, verticalAlign: 'middle', marginRight: 4 }} /> {appointment.department}</p>
          <p><strong>Patient:</strong> <img src="/icons/user.svg" alt="Patient" style={{ width: 14, height: 14, verticalAlign: 'middle', marginRight: 4 }} /> {appointment.patientName}</p>
        </div>
        
        {showTooltip && (
          <div className="appointment-tooltip">
            <strong>Appointment Details</strong><br />
            <img src="/icons/doctor.svg" alt="Doctor" style={{ width: 12, height: 12, verticalAlign: 'middle', marginRight: 2 }} /> Dr. {appointment.doctor}<br />
            <img src="/icons/department.svg" alt="Department" style={{ width: 12, height: 12, verticalAlign: 'middle', marginRight: 2 }} /> {appointment.department}<br />
            <img src="/icons/calendar.svg" alt="Date" style={{ width: 12, height: 12, verticalAlign: 'middle', marginRight: 2 }} /> {formatDate(appointment.date)} at {formatTime(appointment.time)}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Cancel Appointment</h3>
            <p>Are you sure you want to cancel your appointment with Dr. {appointment.doctor} on {formatDate(appointment.date)} at {formatTime(appointment.time)}?</p>
            <div className="modal-buttons">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Appointment
              </button>
              <button 
                className="btn btn-danger"
                onClick={confirmCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AppointmentCard