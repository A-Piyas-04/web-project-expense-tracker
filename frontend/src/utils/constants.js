export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  EXPENSES: '/expenses',
};

export const DEFAULT_CATEGORIES = [
  'Food',
  'Transport',
  'Books',
  'Entertainment',
  'Utilities',
  'Other',
];
