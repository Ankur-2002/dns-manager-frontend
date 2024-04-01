import axios from 'axios';
export const api = axios.create({
  baseURL: 'http://13.239.37.185:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('dns_manage_token');
    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export const GET = url => api.get(url);
export const POST = (url, data) => api.post(url, data);
export const PUT = (url, data) => api.put(url, data);
export const DELETE = (url, data) => api.delete(url, data);

export default api;
