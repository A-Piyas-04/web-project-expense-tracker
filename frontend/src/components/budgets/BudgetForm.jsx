import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const EMPTY_FORM = { categoryId: '', monthlyLimit: '' };

function toFormState(budget) {
  if (!budget) return EMPTY_FORM;
  return { categoryId: String(budget.category_id), monthlyLimit: String(budget.monthly_limit) };
}

export default function BudgetForm({ categories, initialBudget, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => toFormState(initialBudget));
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(initialBudget);

  useEffect(() => {
    setForm(toFormState(initialBudget));
    setError('');
  }, [initialBudget]);

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const monthlyLimit = Number(form.monthlyLimit);
    if (!form.categoryId) {
      setError('Choose a category.');
      return;
    }
    if (!form.monthlyLimit || Number.isNaN(monthlyLimit) || monthlyLimit <= 0) {
      setError('Monthly limit must be a positive number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ category_id: Number(form.categoryId), monthly_limit: monthlyLimit });
      if (!isEditing) setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Could not save this budget.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-semibold text-slate-900">{isEditing ? 'Edit Budget' : 'Set a Budget'}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="budget-category" className="text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="budget-category"
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
          id="budget-monthly-limit"
          type="number"
          step="0.01"
          min="0"
          label="Monthly Limit"
          value={form.monthlyLimit}
          onChange={updateField('monthlyLimit')}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Set Budget'}
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
