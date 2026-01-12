import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000',
  withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token storage
api.interceptors.response.use(
  (response) => {
    // If login response contains token, store it
    if (response.config.url?.includes('/auth/login') && response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error) => {
    // If 401 error, clear token
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
