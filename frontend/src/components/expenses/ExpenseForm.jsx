import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { colors, layout } from '../../theme';

const EMPTY_FORM = {
  categoryId: '',
  amount: '',
  description: '',
  date: '',
};

function toFormState(expense) {
  if (!expense) {
    return EMPTY_FORM;
  }

  return {
    categoryId: String(expense.category_id),
    amount: String(expense.amount),
    description: expense.description ?? '',
    date: expense.date,
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

      if (!isEditing) {
        setForm(EMPTY_FORM);
      }
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Could not save this expense.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ ...layout.panelStrong, maxWidth: '640px' }}>
      <h2 style={layout.sectionTitle}>{isEditing ? 'Edit expense' : 'Add expense'}</h2>
      <p style={layout.sectionHint}>
        {isEditing
          ? 'Update the details below, then save your changes.'
          : 'Record a new purchase with category, amount, and date.'}
      </p>
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
          <label htmlFor="expense-category" style={layout.label}>
            Category
          </label>
          <select
            id="expense-category"
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
          id="expense-amount"
          type="number"
          step="0.01"
          min="0"
          label="Amount"
          value={form.amount}
          onChange={updateField('amount')}
          style={underlineInputStyle}
        />

        <Input
          id="expense-date"
          type="date"
          label="Date"
          value={form.date}
          onChange={updateField('date')}
          style={underlineInputStyle}
        />

        <Input
          id="expense-description"
          type="text"
          label="Description (optional)"
          value={form.description}
          onChange={updateField('description')}
          placeholder="e.g. Lunch with friends"
          style={underlineInputStyle}
        />
      </div>

      {error && <p style={layout.errorText}>{error}</p>}

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : isEditing ? 'Save changes' : 'Add expense'}
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

const underlineInputStyle = {
  border: 'none',
  borderBottom: `1px solid ${colors.rule}`,
  borderRadius: 0,
  backgroundColor: 'transparent',
  padding: '10px 0',
};
