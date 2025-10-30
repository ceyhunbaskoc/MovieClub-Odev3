import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tvmaze.com',
  timeout: 10000,
});

export default api;
