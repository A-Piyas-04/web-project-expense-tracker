import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

export default function BudgetList({ budgets, onEdit, onDelete }) {
  if (budgets.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
        No budgets set yet.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {budgets.map((budget) => {
        const percent = Math.min(100, Math.round((Number(budget.spent) / Number(budget.monthly_limit)) * 100));
        return (
          <li key={budget.id} className="rounded-md border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-slate-900">{budget.category_name}</p>
                <p className="text-sm text-slate-600">
                  {formatCurrency(budget.spent)} of {formatCurrency(budget.monthly_limit)}
                  {budget.is_over_budget && (
                    <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Over budget</span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={() => onEdit(budget)}>
                  Edit
                </Button>
                <Button type="button" variant="danger" onClick={() => onDelete(budget)}>
                  Delete
                </Button>
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${budget.is_over_budget ? 'bg-red-500' : 'bg-slate-900'}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
