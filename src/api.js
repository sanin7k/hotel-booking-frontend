import axios from 'axios';
const api = axios.create({ baseURL: '/api' });
export function setToken(t){ api.defaults.headers.common['Authorization'] = t ? 'Bearer '+t : ''; }
export default api;
