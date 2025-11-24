import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'
import Login from './pages/Login'
import Home from './pages/Home'
import Book from './pages/Book'
import Doctors from './pages/Doctors'
import './styles/components.css'

// Route protection component for patients
const PatientRoute = ({ element }) => {
  const { isPatient } = useUser();
  return isPatient() ? element : <Navigate to="/" />;
};

// Route protection component for doctors
const DoctorRoute = ({ element }) => {
  const { isDoctor } = useUser();
  return isDoctor() ? element : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<PatientRoute element={<Home />} />} />
      <Route path="/book" element={<PatientRoute element={<Book />} />} />
      <Route path="/doctors-portal" element={<DoctorRoute element={<Doctors />} />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App