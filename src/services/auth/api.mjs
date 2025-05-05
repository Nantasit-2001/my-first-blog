import axios from 'axios';

const API_Auth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // เช่น http://localhost:5000/api
});

API_Auth.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API_Auth;
