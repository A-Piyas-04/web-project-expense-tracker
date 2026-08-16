import client from './client';

export const analyticsApi = {
  getByCategory: async () => {
    const response = await client.get('/analytics/by-category');
    return response.data;
  },
  getByMonth: async () => {
    const response = await client.get('/analytics/by-month');
    return response.data;
  },
  exportCsv: async () => {
    const response = await client.get('/analytics/export/csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
