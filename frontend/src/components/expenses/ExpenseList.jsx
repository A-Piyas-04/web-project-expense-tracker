import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, categories, onEdit, onDelete }) {
  const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));

  if (expenses.length === 0) {
    return <p className="rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No expenses yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="py-2 pl-4 pr-4 font-medium">Date</th>
            <th className="py-2 pr-4 font-medium">Category</th>
            <th className="py-2 pr-4 font-medium">Description</th>
            <th className="py-2 pr-4 text-right font-medium">Amount</th>
            <th className="py-2 pr-4"></th>
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
