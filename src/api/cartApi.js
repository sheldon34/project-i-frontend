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
  console.log("this is token 1:",config.headers.Authorization);
  // console.log("this is token 1:",config);
  return config;
});

export const cartService = {
  // Add item to cart
  addToCart: async (productId, quantity) => {
    const params = new URLSearchParams();
    params.append('productId', productId);
    params.append('quantity', quantity);
    const response = await cartApi.post('/add', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const params = new URLSearchParams();
    params.append('productId', productId);
    const response = await cartApi.delete('/remove', {
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  // Get cart
  getCart: async () => {
    const response = await cartApi.get();
    return response.data;
  },
};