import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          ...data.user,
          type: data.user.role === 'doctor' ? 'doctor' : 'patient'
        });
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const loginDoctor = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/doctor-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        setUser({
          ...data.user,
          type: 'doctor'
        });
        return true;
      } else {
        console.error('Doctor login failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Doctor login error:', error);
      return false;
    }
  };

  const loginPatient = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        setUser({
          ...data.user,
          type: 'patient'
        });
        return true;
      } else {
        console.error('Patient login failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Patient login error:', error);
      return false;
    }
  };

  const registerPatient = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        setUser({
          ...data.user,
          type: 'patient'
        });
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isDoctor = () => user?.type === 'doctor' || user?.role === 'doctor';
  const isPatient = () => user?.type === 'patient' || user?.role === 'patient';
  const isLoggedIn = () => !!user;

  return (
    <UserContext.Provider value={{
      user,
      loading,
      loginDoctor,
      loginPatient,
      registerPatient,
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
