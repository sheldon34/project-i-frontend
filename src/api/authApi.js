import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const authService = {
  // Register user
  register: async (userData) => {
    const response = await authApi.post('/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await authApi.post('/login', credentials);
    console.log('Login response data:', response.data);
    return response.data;
  },
  
};