
import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: '/api', // Change this to your actual API URL in production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token and redirect to login if the token is invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
