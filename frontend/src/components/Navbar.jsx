/**
 * ==================================================================
 * NAVIGATION BAR COMPONENT
 * ==================================================================
 * Top navigation bar that appears on all main pages
 * Features responsive design with mobile hamburger menu
 * 
 * Features:
 * - Fixed position at top of page
 * - Logo/brand link to home
 * - Navigation links (Home, Book, Appointments, Contact)
 * - Active page highlighting
 * - Mobile-responsive hamburger menu
 * - Smooth transitions
 * 
 * State:
 * - isMenuOpen: Controls mobile menu visibility
 * ==================================================================
 */

import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Navbar = () => {
  // ============================================
  // STATE & HOOKS
  // ============================================
  
  // Control mobile menu open/closed state
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Get current page location to highlight active link
  const location = useLocation()
  
  // Get user context for role-based rendering
  const { user, logout } = useUser()
  
  // For navigation after logout
  const navigate = useNavigate()

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  
  /**
   * Toggle mobile menu visibility
   * Opens or closes the side menu on mobile devices
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  /**
   * Check if given path matches current page
   * Used to highlight active navigation link
   */
  const isActive = (path) => {
    return location.pathname === path
  }

  /**
   * Handle logout and redirect to login
   */
  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    navigate('/')
  }

  // ============================================
  // RENDER JSX
  // ============================================
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo/Brand - Links to home page */}
            <Link to="/home" className="navbar-brand">
              <img src="/icons/hospital.svg" alt="Hospital" style={{ width: 24, height: 24, verticalAlign: 'middle', marginRight: 8 }} />
              Kaga Hospital
            </Link>
          
          {/* Desktop Navigation Links */}
          <ul className={`navbar-nav ${isMenuOpen ? 'navbar-nav-mobile' : ''}`}>
            {/* PATIENT LINKS - only visible to authenticated patients */}
            {user?.type === 'patient' && (
              <>
                <li>
                  <Link 
                    to="/home" 
                    className={isActive('/home') ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                      <img src="/icons/home.svg" alt="Home" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
                      Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/book" 
                    className={isActive('/book') ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                      <img src="/icons/calendar.svg" alt="Book" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
                      Book Appointment
                  </Link>
                </li>
              </>
            )}

            {/* DOCTOR LINKS - only visible to authenticated doctors */}
            {user?.type === 'doctor' && (
              <li>
                <Link 
                  to="/doctors-portal" 
                  className={isActive('/doctors-portal') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                    <img src="/icons/doctor.svg" alt="Portal" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
                    Portal
                </Link>
              </li>
            )}

            {/* LOGOUT BUTTON - visible when logged in */}
            {user?.isLoggedIn && (
              <li>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--light-gray)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    <img src="/icons/logout.svg" alt="Logout" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} />
                    Logout
                </button>
              </li>
            )}
          </ul>
          
          {/* Mobile Menu Toggle Button (Hamburger) */}
          <button 
            className="navbar-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
          <img src="/icons/menu.svg" alt="Menu" style={{ width: 22, height: 22 }} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Drawer - Only shows when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          {/* Slide-in menu panel */}
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {/* PATIENT LINKS - only visible to authenticated patients */}
            {user?.type === 'patient' && (
              <>
                <Link to="/home" onClick={() => setIsMenuOpen(false)}>
                    <img src="/icons/home.svg" alt="Home" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} /> Home
                </Link>
                <Link to="/book" onClick={() => setIsMenuOpen(false)}>
                    <img src="/icons/calendar.svg" alt="Book" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} /> Book Appointment
                </Link>
              </>
            )}

            {/* DOCTOR LINKS - only visible to authenticated doctors */}
            {user?.type === 'doctor' && (
              <Link to="/doctors-portal" onClick={() => setIsMenuOpen(false)}>
                  <img src="/icons/doctor.svg" alt="Portal" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} /> Portal
              </Link>
            )}

            {/* LOGOUT BUTTON - visible when logged in */}
            {user?.isLoggedIn && (
              <button 
                onClick={handleLogout}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-color)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                  <img src="/icons/logout.svg" alt="Logout" style={{ width: 18, height: 18, verticalAlign: 'middle', marginRight: 6 }} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar