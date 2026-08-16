import ExpenseItem from './ExpenseItem';
import { colors, layout } from '../../theme';

export default function ExpenseList({ expenses, categories, onEdit, onDelete }) {
  const categoryNameById = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  if (expenses.length === 0) {
    return (
      <p
        style={{
          maxWidth: '800px',
          margin: '8px 0 0 0',
          padding: '8px 0',
          color: colors.muted,
          fontSize: '14px',
          fontStyle: 'italic',
        }}
      >
        No expenses yet. Add one to start tracking.
      </p>
    );
  }

  return (
    <div style={{ ...layout.panel, maxWidth: '800px', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Description</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              categoryName={categoryNameById.get(expense.category_id) ?? 'Unknown'}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  ...layout.label,
  padding: '0 12px 10px 0',
  borderBottom: `2px solid ${colors.teal}`,
  marginBottom: 0,
};
