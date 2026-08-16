import Button from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { colors } from '../../theme';

export default function ExpenseItem({ expense, categoryName, onEdit, onDelete }) {
  return (
    <tr style={{ borderBottom: `1px solid ${colors.rule}` }}>
      <td style={tdStyle}>{formatDate(expense.date)}</td>
      <td style={{ ...tdStyle, fontWeight: '600', color: colors.text }}>{categoryName}</td>
      <td style={tdStyle}>{expense.description || '—'}</td>
      <td style={{ ...tdStyle, textAlign: 'right', fontWeight: '700', color: colors.text }}>
        {formatCurrency(expense.amount)}
      </td>
      <td style={{ ...tdStyle, textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button type="button" variant="secondary" onClick={() => onEdit(expense)}>
            Edit
          </Button>
          <Button type="button" variant="danger" onClick={() => onDelete(expense)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}

const tdStyle = {
  padding: '14px 12px 14px 0',
  fontSize: '14px',
  color: colors.muted,
  verticalAlign: 'middle',
};
