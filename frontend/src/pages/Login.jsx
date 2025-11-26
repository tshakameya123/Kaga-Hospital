
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const { loginDoctor, loginPatient, registerPatient } = useUser()
  
  const [loginMode, setLoginMode] = useState('landing')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Doctor registry - maps username to doctor name
  const DOCTOR_REGISTRY = {
    'ben': { name: 'Dr. Ben Mitchell', password: '123456' },
    'sarah': { name: 'Dr. Sarah Johnson', password: '123456' },
    'robert': { name: 'Dr. Robert Miller', password: '123456' },
    'michael': { name: 'Dr. Michael Chen', password: '123456' },
    'lisa': { name: 'Dr. Lisa Wang', password: '123456' },
    'emily': { name: 'Dr. Emily Rodriguez', password: '123456' },
    'david': { name: 'Dr. David Kim', password: '123456' },
    'jennifer': { name: 'Dr. Jennifer Lee', password: '123456' },
    'mark': { name: 'Dr. Mark Thompson', password: '123456' },
    'james': { name: 'Dr. James Wilson', password: '123456' },
    'maria': { name: 'Dr. Maria Garcia', password: '123456' },
    'amanda': { name: 'Dr. Amanda Davis', password: '123456' },
    'kevin': { name: 'Dr. Kevin Brown', password: '123456' },
    'rachel': { name: 'Dr. Rachel Adams', password: '123456' },
    'thomas': { name: 'Dr. Thomas Clark', password: '123456' },
    'susan': { name: 'Dr. Susan Martinez', password: '123456' },
    'laura': { name: 'Dr. Laura Anderson', password: '123456' }
  }

  /**
   * Unified login handler
   * Checks if credentials match a doctor first, then treats as patient
   */
  const handleLogin = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!username.trim()) newErrors.username = 'Username or email is required'
    if (!password) newErrors.password = 'Password is required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)

      const doctorUsernameLower = username.toLowerCase().trim()
      if (DOCTOR_REGISTRY[doctorUsernameLower]) {
        const doctorInfo = DOCTOR_REGISTRY[doctorUsernameLower]

        const success = await loginDoctor(doctorUsernameLower, password)
        if (success) {
          navigate('/doctors-portal')
          return
        } else {
          setErrors({ general: 'Invalid doctor credentials' })
          setIsLoading(false)
          return
        }
      } else {
        if (password.length < 6) {
          setErrors({ password: 'Password must be at least 6 characters' })
          setIsLoading(false)
          return
        }

        const success = await loginPatient(username, password)
        if (success) {
          navigate('/home')
          return
        } else {
          setErrors({ general: 'Invalid credentials' })
          setIsLoading(false)
          return
        }
      }
    }
  }

  /**
   * Patient signup handler
   * Requires both username and email
   */
  const handleSignup = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!username.trim()) newErrors.username = 'Username is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm password'

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)

      const result = await registerPatient({
        name: username,
        email,
        password
      })

      if (result.success) {
        navigate('/home')
        return
      } else {
        setErrors({ general: result.message || 'Unable to create account. Please try again.' })
        setIsLoading(false)
      }
    }
  }

  // ==================== LANDING PAGE ====================
  if (loginMode === 'landing') {
    return (
      <div className="landing-page">
        <section className="landing-hero">
          <div className="container">
            <div className="landing-hero-content">
              <div className="landing-hero-text">
                <div className="landing-logo">
                  <img src="/icons/hospital.svg" alt="Kaga Health" style={{ width: 48, height: 48 }} />
                  <span>Kaga Hospital</span>
                </div>
                <h1>Your Health, Our Priority</h1>
                <p className="landing-subtitle">
                  Book appointments with trusted healthcare professionals in seconds.
                </p>
                <div className="landing-cta-buttons">
                  <button className="btn btn-primary btn-large" onClick={() => setLoginMode('patient-login')}>
                    <img src="/icons/user.svg" alt="Patient" style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }} />
                     Login
                  </button>
                  <button className="btn btn-secondary btn-large" onClick={() => setLoginMode('patient-signup')}>
                    <img src="/icons/user.svg" alt="Sign Up" style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }} />
                     Sign Up
                  </button>
                </div>
              </div>
              <div className="landing-hero-image">
                <img
                  src="/images/group-african-medical-students-posed-outdoor-against-university-door.jpg"
                  alt="Healthcare professionals"
                  className="landing-img"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="landing-services">
          <div className="container">
            <h2 className="section-title">Why Choose Kaga Health?</h2>
            <p className="section-subtitle">Everything you need for seamless healthcare appointments</p>
            
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <img src="/icons/calendar.svg" alt="Easy Booking" />
                </div>
                <h3>Easy Appointment Booking</h3>
                <p>Book appointments with our healthcare professionals in seconds</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <img src="/icons/doctor.svg" alt="Specialists" />
                </div>
                <h3>Experienced Specialists</h3>
                <p>Access to board-certified doctors across multiple medical departments</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <img src="/icons/clock.svg" alt="Scheduling" />
                </div>
                <h3>Flexible Scheduling</h3>
                <p>Choose time slots that fit your busy schedule</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <img src="/icons/check.svg" alt="Quality" />
                </div>
                <h3>Professional Care</h3>
                <p>Quality medical care with secure data handling</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // ==================== PATIENT LOGIN ====================
  if (loginMode === 'patient-login') {
    return (
      <div className="landing-page">
        <div style={{ maxWidth: 500, margin: '100px auto', background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.1)' }}>
          <button onClick={() => setLoginMode('landing')} style={{ float: 'right', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>×</button>
          <h2 style={{ textAlign: 'center', marginBottom: 10, color: 'var(--text-dark)' }}>Patient Login</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 30 }}>Access your appointments</p>
          
          {errors.general && <div style={{ color: 'var(--danger-red)', marginBottom: 15, textAlign: 'center' }}>{errors.general}</div>}
          
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(e); }}>
            <div className="form-group">
              <label className="form-label">
                <img src="/icons/user.svg" alt="Username/Email" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Username or Email
              </label>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setErrors({}); }}
                placeholder="Enter your username or email"
              />
              {errors.username && <div className="form-validation-error">{errors.username}</div>}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <img src="/icons/lock.svg" alt="Password" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Password
              </label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
                placeholder="Enter your password"
              />
              {errors.password && <div className="form-validation-error">{errors.password}</div>}
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 15 }}>Login</button>
          </form>
          
          <p style={{ textAlign: 'center', marginBottom: 15 }}>Don't have an account? <button onClick={() => setLoginMode('patient-signup')} style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer', textDecoration: 'underline' }}>Sign Up</button></p>
          <button onClick={() => setLoginMode('landing')} style={{ width: '100%', background: 'none', border: '1px solid var(--border-color)', padding: 10, borderRadius: 6, cursor: 'pointer', color: 'var(--primary-blue)' }}>Back to Home</button>
        </div>
      </div>
    )
  }

  // ==================== PATIENT SIGNUP ====================
  if (loginMode === 'patient-signup') {
    return (
      <div className="landing-page">
        <div style={{ maxWidth: 500, margin: '60px auto', background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.1)' }}>
          <button onClick={() => setLoginMode('landing')} style={{ float: 'right', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>×</button>
          <h2 style={{ textAlign: 'center', marginBottom: 10, color: 'var(--text-dark)' }}>Create Account</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 30 }}>Join Kaga Health today</p>
          
          {errors.general && <div style={{ color: 'var(--danger-red)', marginBottom: 15, textAlign: 'center' }}>{errors.general}</div>}
          
          <form onSubmit={(e) => { e.preventDefault(); handleSignup(e); }}>
            <div className="form-group">
              <label className="form-label">
                <img src="/icons/user.svg" alt="Username" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Username
              </label>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setErrors({}); }}
                placeholder="Choose a username"
              />
              {errors.username && <div className="form-validation-error">{errors.username}</div>}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <img src="/icons/mail.svg" alt="Email" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Email Address
              </label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                placeholder="Enter your email"
              />
              {errors.email && <div className="form-validation-error">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <img src="/icons/lock.svg" alt="Password" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Password
              </label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
                placeholder="At least 6 characters"
              />
              {errors.password && <div className="form-validation-error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                <img src="/icons/lock.svg" alt="Confirm Password" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 6 }} />
                Confirm Password
              </label>
              <input
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors({}); }}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && <div className="form-validation-error">{errors.confirmPassword}</div>}
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 15 }}>Create Account</button>
          </form>
          
          <p style={{ textAlign: 'center', marginBottom: 15 }}>Already have an account? <button onClick={() => setLoginMode('patient-login')} style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', cursor: 'pointer', textDecoration: 'underline' }}>Login</button></p>
          <button onClick={() => setLoginMode('landing')} style={{ width: '100%', background: 'none', border: '1px solid var(--border-color)', padding: 10, borderRadius: 6, cursor: 'pointer', color: 'var(--primary-blue)' }}>Back to Home</button>
        </div>
      </div>
    )
  }
}

export default Login