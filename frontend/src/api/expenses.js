import client from './client';

export const expensesApi = {
  getAll: async () => {
    const response = await client.get('/expenses/');
    return response.data;
  },
  create: async (expense) => {
    const response = await client.post('/expenses/', expense);
    return response.data;
  },
  update: async (id, expense) => {
    const response = await client.put(`/expenses/${id}`, expense);
    return response.data;
  },
  remove: async (id) => {
    await client.delete(`/expenses/${id}`);
  },
};
