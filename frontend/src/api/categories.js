import client from './client';

export const categoriesApi = {
  getAll: async () => {
    const response = await client.get('/categories/');
    return response.data;
  },
};
