export default function OverspendBanner({ budgets }) {
  const overBudget = budgets.filter((budget) => budget.is_over_budget);

  if (overBudget.length === 0) return null;

  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p className="font-medium">You're over budget in {overBudget.length === 1 ? 'this category' : 'these categories'}:</p>
      <ul className="mt-1 list-disc pl-5">
        {overBudget.map((budget) => (
          <li key={budget.id}>
            {budget.category_name} &mdash; {Number(budget.spent).toFixed(2)} / {Number(budget.monthly_limit).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
