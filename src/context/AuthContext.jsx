import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../api/authApi';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    
    if (token && username) {
      setUser({ username });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      console.log('Login response data:', response); // Debug: log the actual response data
      // Try to find the token property
      const token = response.token || response.accessToken || response.jwt || response.idToken;
      if (!token) {
        toast.error('Login failed: No token received from backend.');
        return { success: false, error: 'No token received from backend' };
      }
      // Store token and username in cookies
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('username', credentials.username, { expires: 7 });
      setUser({ username: credentials.username });
      setIsAuthenticated(true);
      // Debug: log the token value after saving
      console.log('Saved JWT token:', token);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      return { success: false, error: error.response?.data || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      await authService.register(userData);
      toast.success('Registration successful! Please login.');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data || 'Registration failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};