const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * 🌐 Centralized API Service
 * 
 * Automatically attaches the JWT token from localStorage to all outgoing requests.
 * Handles JSON parsing and unified error handling.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('pathforge_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle session expiration
      if (response.status === 410) {
        localStorage.removeItem('pathforge_token');
        localStorage.removeItem('pathforge_user');
        window.location.href = '/login';
      }
      throw new Error(data.message || 'Something went wrong with the request.');
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => request(endpoint, { method: 'POST', body, ...options }),
  put: (endpoint, body, options) => request(endpoint, { method: 'PUT', body, ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
};
