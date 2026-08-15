export function formatCurrency(amount) {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (value === null || value === undefined || Number.isNaN(value)) return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function formatDate(date) {
  if (!date) return '';
  const parsed = date instanceof Date ? date : new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(parsed);
}
