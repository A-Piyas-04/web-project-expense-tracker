import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// TODO: attach JWT token via interceptors
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
