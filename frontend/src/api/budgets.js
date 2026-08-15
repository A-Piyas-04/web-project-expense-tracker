import client from './client';

export const budgetsApi = {
  getAll: async () => {
    const response = await client.get('/budgets/');
    return response.data;
  },
  create: async (budget) => {
    const response = await client.post('/budgets/', budget);
    return response.data;
  },
  update: async (id, budget) => {
    const response = await client.put(`/budgets/${id}`, budget);
    return response.data;
  },
  remove: async (id) => {
    await client.delete(`/budgets/${id}`);
  },
};
