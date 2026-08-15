import Button from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function ExpenseItem({ expense, categoryName, onEdit, onDelete }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-2 pl-4 pr-4 text-sm text-slate-600">{formatDate(expense.date)}</td>
      <td className="py-2 pr-4 text-sm text-slate-900">{categoryName}</td>
      <td className="py-2 pr-4 text-sm text-slate-600">{expense.description || '—'}</td>
      <td className="py-2 pr-4 text-right text-sm font-medium text-slate-900">{formatCurrency(expense.amount)}</td>
      <td className="py-2 pl-2 text-right">
        <div className="flex justify-end gap-2">
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
