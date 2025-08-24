import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/api/product';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to requests for authenticated endpoints
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productApi = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/getAll');
      return response.data.map((product) => ({
        ...product,
        image: product.image ? `data:image/jpeg;base64,${product.image}` : null
      }));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 204) {
        return [];
      }
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await api.get(`/getById/${id}`);
    const product = response.data;
    return {
      ...product,
      image: product.image ? `data:image/jpeg;base64,${product.image}` : null
    };
  },

  // Create product
  createProduct: async (productData) => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price.toString());
    formData.append('Quantity', productData.quantity);
    
    if (productData.image) {
      formData.append('image', productData.image);
    }

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const product = response.data;
    return {
      ...product,
      image: product.image ? `data:image/jpeg;base64,${product.image}` : null
    };
  },

  // Update product
  updateProduct: async (id, productData) => {
    const formData = new FormData();
    
    if (productData.name !== undefined) {
      formData.append('name', productData.name);
    }
    if (productData.description !== undefined) {
      formData.append('description', productData.description);
    }
    if (productData.price !== undefined) {
      formData.append('price', productData.price.toString());
    }
    if (productData.quantity !== undefined) {
      formData.append('Quantity', productData.quantity);
    }
    if (productData.image !== undefined && productData.image !== null) {
      formData.append('image', productData.image);
    }

    const response = await api.put(`/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const product = response.data;
    return {
      ...product,
      image: product.image ? `data:image/jpeg;base64,${product.image}` : null
    };
  },

  // Delete product
  deleteProduct: async (id) => {
    await api.delete(`/delete/${id}`);
  },
};