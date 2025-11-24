import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginDoctor = (doctorName, password) => {
    // Mock doctor validation - in production, call backend API
    const validDoctors = {
      'Dr. Ben Mitchell': '123456',
      'Dr. Sarah Johnson': '123456',
      'Dr. Robert Miller': '123456',
      'Dr. Michael Chen': '123456',
      'Dr. Lisa Wang': '123456',
      'Dr. Emily Rodriguez': '123456',
      'Dr. David Kim': '123456',
      'Dr. Jennifer Lee': '123456',
      'Dr. Mark Thompson': '123456',
      'Dr. James Wilson': '123456',
      'Dr. Maria Garcia': '123456',
      'Dr. Amanda Davis': '123456',
      'Dr. Kevin Brown': '123456',
      'Dr. Rachel Adams': '123456',
      'Dr. Thomas Clark': '123456',
      'Dr. Susan Martinez': '123456',
      'Dr. Laura Anderson': '123456'
    };

    if (validDoctors[doctorName] === password) {
      setUser({
        type: 'doctor',
        name: doctorName,
        id: doctorName.toLowerCase().replace(/\s+/g, '_')
      });
      return true;
    }
    return false;
  };

  const loginPatient = (emailOrUsername, password, username = null) => {
    // Mock patient validation - in production, call backend API
    if (emailOrUsername && password && password.length >= 6) {
      setUser({
        type: 'patient',
        email: emailOrUsername,
        username: username || emailOrUsername,
        id: emailOrUsername.toLowerCase()
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isDoctor = () => user?.type === 'doctor';
  const isPatient = () => user?.type === 'patient';
  const isLoggedIn = () => !!user;

  return (
    <UserContext.Provider value={{
      user,
      loginDoctor,
      loginPatient,
      logout,
      isDoctor,
      isPatient,
      isLoggedIn
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
