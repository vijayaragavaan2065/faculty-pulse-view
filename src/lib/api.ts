import axios from 'axios';

// API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (NOTE: In production, consider httpOnly cookies for better security)
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth state
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints - these match the expected backend contract
export const endpoints = {
  // Authentication
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    me: '/api/auth/me',
  },
  // Users (admin functionality)
  users: {
    list: '/api/users',
    detail: (id: string) => `/api/users/${id}`,
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`,
  },
  // Forms
  forms: {
    my: '/api/forms/my',
    list: '/api/forms',
    detail: (id: string) => `/api/forms/${id}`,
    create: '/api/forms',
    update: (id: string) => `/api/forms/${id}`,
    verify: (id: string) => `/api/forms/${id}/verify`,
  },
  // AI
  ai: {
    evaluate: '/api/ai/evaluate',
    plagiarism: '/api/ai/plagiarism',
  },
  // Upload
  upload: '/api/upload',
};

export default api;