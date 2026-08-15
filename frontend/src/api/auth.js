import client from './client';

export const authApi = {
  login: async (email, password) => {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email, password) => {
    const response = await client.post('/auth/register', { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await client.get('/auth/me');
    return response.data;
  },
};
