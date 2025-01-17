import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password, rememberMe = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
      setUser(userData);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/register', userData);
      const { token, user: newUser } = response.data;
      localStorage.setItem('token', token);
      setUser(newUser);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put('/users/profile', profileData);
      setUser(response.data);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      await api.put('/users/change-password', { currentPassword, newPassword });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to change password.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);
      await api.post('/auth/forgot-password', { email });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send password reset email.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      await api.post('/auth/reset-password', { token, newPassword });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return false;
    }

    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
      return true;
    } catch (err) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCallback = useCallback(async (token) => {
    if (!token) {
      throw new Error('No token provided');
    }
    localStorage.setItem('token', token);
    await checkAuth();
  }, [checkAuth]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    handleCallback,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 