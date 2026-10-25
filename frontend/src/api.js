import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getAll = (path) => api.get(`/${path}`).then((r) => r.data);
export const search = (path, keyword) =>
  api.get(`/${path}/search`, { params: { keyword } }).then((r) => r.data);
export const create = (path, data) => api.post(`/${path}`, data).then((r) => r.data);
export const update = (path, id, data) => api.put(`/${path}/${id}`, data).then((r) => r.data);
export const remove = (path, id) => api.delete(`/${path}/${id}`);
