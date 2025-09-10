import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../api/authApi';
import toast from 'react-hot-toast';
import { jwtDecode } from "jwt-decode"; // <-- fixed import

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
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const roles = decoded.authorities || decoded.roles || [];
        setUser({ username: decoded.sub, roles });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        Cookies.remove('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const token = response.token || response.accessToken || response.jwt || response.idToken;
      if (!token) {
        toast.error('Login failed: No token received from backend.');
        return { success: false, error: 'No token received from backend' };
      }
      const decoded = jwtDecode(token); // <-- fixed usage
      const roles = decoded.authorities || decoded.roles || [];
      setUser({ username: decoded.sub || credentials.username, roles });
      setIsAuthenticated(true);
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('username', decoded.sub || credentials.username, { expires: 7 });
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
    roles: user?.roles || [], // <-- add this
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};