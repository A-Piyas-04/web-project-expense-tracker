import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { colors, layout } from '../../theme';

const EMPTY_FORM = {
  categoryId: '',
  monthlyLimit: '',
};

function toFormState(budget) {
  if (!budget) {
    return EMPTY_FORM;
  }

  return {
    categoryId: String(budget.category_id),
    monthlyLimit: String(budget.monthly_limit),
  };
}

const selectStyle = {
  width: '100%',
  padding: '10px 0',
  border: 'none',
  borderBottom: `1px solid ${colors.rule}`,
  borderRadius: 0,
  fontSize: '14px',
  color: colors.text,
  backgroundColor: 'transparent',
};

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
    return (event) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
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
      await onSubmit({
        category_id: Number(form.categoryId),
        monthly_limit: monthlyLimit,
      });

      if (!isEditing) {
        setForm(EMPTY_FORM);
      }
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Could not save this budget.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ ...layout.panelStrong, maxWidth: '640px' }}>
      <h2 style={layout.sectionTitle}>{isEditing ? 'Edit budget' : 'Set a budget'}</h2>
      <p style={layout.sectionHint}>Choose a category and a monthly spending limit.</p>
      <hr style={layout.hairline} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <div>
          <label htmlFor="budget-category" style={layout.label}>
            Category
          </label>
          <select
            id="budget-category"
            value={form.categoryId}
            onChange={updateField('categoryId')}
            style={selectStyle}
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
          label="Monthly limit"
          value={form.monthlyLimit}
          onChange={updateField('monthlyLimit')}
          style={{
            border: 'none',
            borderBottom: `1px solid ${colors.rule}`,
            borderRadius: 0,
            backgroundColor: 'transparent',
            padding: '10px 0',
          }}
        />
      </div>

      {error && <p style={layout.errorText}>{error}</p>}

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : isEditing ? 'Save changes' : 'Set budget'}
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
