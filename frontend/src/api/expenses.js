import client from './client';

export const expensesApi = {
  getAll: async (filters = {}) => {
    const params = {};
    if (filters.categoryId) params.category_id = filters.categoryId;
    if (filters.startDate) params.start_date = filters.startDate;
    if (filters.endDate) params.end_date = filters.endDate;

    const response = await client.get('/expenses/', { params });
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
