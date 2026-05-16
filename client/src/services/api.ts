import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hiregenius_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (payload: object) => api.post('/auth/login', payload),
  register: (payload: object) => api.post('/auth/register', payload)
};

export const candidateApi = {
  create: (payload: object) => api.post('/candidates/add', payload),
  list: (params?: object) => api.get('/candidates', { params }),
  get: (id: string) => api.get(`/candidates/${id}`),
  update: (id: string, payload: object) => api.put(`/candidates/${id}`, payload),
  remove: (id: string) => api.delete(`/candidates/${id}`),
  shortlist: (id: string) => api.put(`/candidates/${id}/shortlist`)
};

export const jobApi = {
  create: (payload: object) => api.post('/jobs/create', payload),
  list: () => api.get('/jobs')
};

export const matchApi = {
  basic: (payload: object) => api.post('/match/basic', payload),
  questions: (payload: object) => api.post('/match/questions', payload)
};

export default api;