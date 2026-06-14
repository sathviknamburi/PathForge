import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto login from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('pathforge_token');
      const savedUser = localStorage.getItem('pathforge_user');
      
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          // Refresh user data from API to ensure it's up to date (e.g. streaks, achievements)
          const refreshed = await api.get('/auth/profile');
          setUser(refreshed.user);
          localStorage.setItem('pathforge_user', JSON.stringify(refreshed.user));
        } catch (err) {
          console.error('Failed to restore session:', err);
          // Token expired or invalid
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('pathforge_token', data.token);
      localStorage.setItem('pathforge_user', JSON.stringify(data.user));
      setUser(data.user);
      setLoading(false);
      return data.user;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please check credentials.');
      throw err;
    }
  };

  const register = async (name, email, password, college, branch) => {
    setError(null);
    setLoading(true);
    try {
      const data = await api.post('/auth/register', { name, email, password, college, branch });
      localStorage.setItem('pathforge_token', data.token);
      localStorage.setItem('pathforge_user', JSON.stringify(data.user));
      setUser(data.user);
      setLoading(false);
      return data.user;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed.');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('pathforge_token');
    localStorage.removeItem('pathforge_user');
    setUser(null);
    setError(null);
  };

  const refreshUser = async () => {
    try {
      const refreshed = await api.get('/auth/profile');
      setUser(refreshed.user);
      localStorage.setItem('pathforge_user', JSON.stringify(refreshed.user));
      return refreshed.user;
    } catch (err) {
      console.error('Failed to refresh user profile:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
