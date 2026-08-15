import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const EMPTY_FORM = { categoryId: '', amount: '', description: '', date: '' };

function toFormState(expense) {
  if (!expense) return EMPTY_FORM;
  return {
    categoryId: String(expense.category_id),
    amount: String(expense.amount),
    description: expense.description ?? '',
    date: expense.date,
  };
}

export default function ExpenseForm({ categories, initialExpense, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => toFormState(initialExpense));
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(initialExpense);

  useEffect(() => {
    setForm(toFormState(initialExpense));
    setError('');
  }, [initialExpense]);

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const amount = Number(form.amount);
    if (!form.categoryId) {
      setError('Choose a category.');
      return;
    }
    if (!form.amount || Number.isNaN(amount) || amount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    if (!form.date) {
      setError('Choose a date.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        category_id: Number(form.categoryId),
        amount,
        description: form.description || null,
        date: form.date,
      });
      if (!isEditing) setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Could not save this expense.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-semibold text-slate-900">{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="expense-category" className="text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="expense-category"
            value={form.categoryId}
            onChange={updateField('categoryId')}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="expense-amount"
          type="number"
          step="0.01"
          min="0"
          label="Amount"
          value={form.amount}
          onChange={updateField('amount')}
        />

        <Input id="expense-date" type="date" label="Date" value={form.date} onChange={updateField('date')} />

        <Input
          id="expense-description"
          type="text"
          label="Description (optional)"
          value={form.description}
          onChange={updateField('description')}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Add Expense'}
        </Button>
        {isEditing && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
