import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/api/cart';

const cartApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests
cartApi.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const cartService = {
  // Add item to cart
  addToCart: async (productId, quantity) => {
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('quantity', quantity);
    
    const response = await cartApi.post('/add', formData);
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const response = await cartApi.delete('/remove', {
      params: { productId }
    });
    return response.data;
  },

  // Get cart
  getCart: async () => {
    const response = await cartApi.get('/');
    return response.data;
  },
};