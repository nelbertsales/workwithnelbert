import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Profile API
export const profileAPI = {
  get: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  },
  
  update: async (profileData) => {
    const response = await apiClient.put('/profile', profileData);
    return response.data;
  },
  
  uploadPhoto: async (photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);
    const response = await apiClient.post('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

// Contact API
export const contactAPI = {
  submit: async (contactData) => {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  },
  
  getAll: async () => {
    const response = await apiClient.get('/contact');
    return response.data;
  },
  
  update: async (contactId, updateData) => {
    const response = await apiClient.put(`/contact/${contactId}`, updateData);
    return response.data;
  },
  
  delete: async (contactId) => {
    const response = await apiClient.delete(`/contact/${contactId}`);
    return response.data;
  }
};

// Blog API
export const blogAPI = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/blog', { params });
    return response.data;
  },
  
  getBySlug: async (slug) => {
    const response = await apiClient.get(`/blog/${slug}`);
    return response.data;
  },
  
  create: async (blogData) => {
    const response = await apiClient.post('/blog', blogData);
    return response.data;
  },
  
  update: async (blogId, blogData) => {
    const response = await apiClient.put(`/blog/${blogId}`, blogData);
    return response.data;
  },
  
  delete: async (blogId) => {
    const response = await apiClient.delete(`/blog/${blogId}`);
    return response.data;
  }
};

// Analytics API
export const analyticsAPI = {
  get: async () => {
    const response = await apiClient.get('/analytics');
    return response.data;
  },
  
  trackView: async (viewType = 'website') => {
    const response = await apiClient.post('/analytics/view', null, {
      params: { view_type: viewType }
    });
    return response.data;
  },
  
  update: async (analyticsData) => {
    const response = await apiClient.put('/analytics', analyticsData);
    return response.data;
  }
};

// Error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle common errors
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

export default apiClient;