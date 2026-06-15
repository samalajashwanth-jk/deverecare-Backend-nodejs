// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Users
  getUsers: () => fetch(`${API_BASE_URL}/users`),
  getUser: (id) => fetch(`${API_BASE_URL}/users/${id}`),
  createUser: (data) => fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  // Login
  login: (credentials) => fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  // Office Use
  updateOfficeUse: (id, data) => fetch(`${API_BASE_URL}/users/${id}/office-use`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  // AI Resume Parsing
  parseResume: (formData) => fetch(`${API_BASE_URL}/parse-resume`, {
    method: 'POST',
    body: formData
  })
};