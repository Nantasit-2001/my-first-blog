import axios from 'axios';
import showToast from '@/utils/showToast';
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

API_Auth.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      showToast(
        "bg-[#fb2c36]",
        "Please log in first.",
        "You must be logged in to access this page."
      );
      setTimeout(() => {
        window.location.href = '/login';
      }, 4300); 
    }
    if (error.response?.status === 403) {
      localStorage.removeItem('token');
      showToast(
        "bg-[#fb2c36]",
        "An error occurred while verifying your identity.",
        "No access or token expired, Please login."
      );
      setTimeout(() => {
        window.location.href = '/login';
      }, 4300); 
    }
    return Promise.reject(error);
  }
);

export default API_Auth;
