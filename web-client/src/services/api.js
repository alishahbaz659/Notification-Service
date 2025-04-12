import axios from 'axios';

const API_URL = '/api';

const api = {
  // User API calls
  registerUser: (userData) => {
    return axios.post(`${API_URL}/users/register`, null, {
      params: {
        username: userData.username,
        email: userData.email,
        password: userData.password
      }
    });
  },
  
  getUserByUsername: (username) => {
    return axios.get(`${API_URL}/users/${username}`);
  },
  
  // Product API calls
  getProducts: () => {
    return axios.get(`${API_URL}/products`);
  },
  
  addProduct: (productData) => {
    return axios.post(`${API_URL}/products/add`, null, {
      params: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stockQuantity: productData.stockQuantity
      }
    });
  },

  deleteProduct: (productId) => {
    return axios.delete(`${API_URL}/products/${productId}`);
  },
  
  // Notification API calls (if needed in the future)
  getNotifications: () => {
    return axios.get(`${API_URL}/notifications`);
  }
};

export default api; 