import { useEffect, useState } from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import BudgetForm from '../components/budgets/BudgetForm';
import BudgetList from '../components/budgets/BudgetList';
import OverspendBanner from '../components/common/OverspendBanner';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { categoriesApi } from '../api/categories';
import { expensesApi } from '../api/expenses';
import { budgetsApi } from '../api/budgets';

const EMPTY_FILTERS = { categoryId: '', startDate: '', endDate: '' };

export default function ExpensesPage() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [editingExpense, setEditingExpense] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  async function loadExpenses(activeFilters = filters) {
    const data = await expensesApi.getAll(activeFilters);
    setExpenses(data);
  }

  async function loadBudgets() {
    const data = await budgetsApi.getAll();
    setBudgets(data);
  }

  useEffect(() => {
    async function loadAll() {
      try {
        const [categoryData, expenseData, budgetData] = await Promise.all([
          categoriesApi.getAll(),
          expensesApi.getAll(EMPTY_FILTERS),
          budgetsApi.getAll(),
        ]);
        setCategories(categoryData);
        setExpenses(expenseData);
        setBudgets(budgetData);
      } catch {
        setLoadError('Could not load your data. Try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    }
    loadAll();
  }, []);

  async function handleFilterChange(nextFilters) {
    setFilters(nextFilters);
    await loadExpenses(nextFilters);
  }

  async function handleExpenseSubmit(payload) {
    if (editingExpense) {
      await expensesApi.update(editingExpense.id, payload);
      setEditingExpense(null);
    } else {
      await expensesApi.create(payload);
    }
    await Promise.all([loadExpenses(), loadBudgets()]);
  }

  async function handleExpenseDelete(expense) {
    if (!window.confirm(`Delete this ${expense.description || 'expense'}?`)) return;
    await expensesApi.remove(expense.id);
    if (editingExpense?.id === expense.id) setEditingExpense(null);
    await Promise.all([loadExpenses(), loadBudgets()]);
  }

  async function handleBudgetSubmit(payload) {
    if (editingBudget) {
      await budgetsApi.update(editingBudget.id, payload);
      setEditingBudget(null);
    } else {
      await budgetsApi.create(payload);
    }
    await loadBudgets();
  }

  async function handleBudgetDelete(budget) {
    if (!window.confirm(`Delete the budget for ${budget.category_name}?`)) return;
    await budgetsApi.remove(budget.id);
    if (editingBudget?.id === budget.id) setEditingBudget(null);
    await loadBudgets();
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-slate-900">Expenses</h1>

      {loadError && <p className="text-sm text-red-600">{loadError}</p>}

      <OverspendBanner budgets={budgets} />

      <section className="space-y-3">
        <ExpenseForm
          categories={categories}
          initialExpense={editingExpense}
          onSubmit={handleExpenseSubmit}
          onCancel={() => setEditingExpense(null)}
        />

        <div className="flex flex-wrap items-end gap-3 rounded-md border border-slate-200 bg-white p-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-category" className="text-xs font-medium text-slate-600">
              Category
            </label>
            <select
              id="filter-category"
              value={filters.categoryId}
              onChange={(e) => handleFilterChange({ ...filters, categoryId: e.target.value })}
              className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-start" className="text-xs font-medium text-slate-600">
              From
            </label>
            <input
              id="filter-start"
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange({ ...filters, startDate: e.target.value })}
              className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="filter-end" className="text-xs font-medium text-slate-600">
              To
            </label>
            <input
              id="filter-end"
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange({ ...filters, endDate: e.target.value })}
              className="rounded-md border border-slate-300 px-2 py-1.5 text-sm"
            />
          </div>
          {(filters.categoryId || filters.startDate || filters.endDate) && (
            <button
              type="button"
              onClick={() => handleFilterChange(EMPTY_FILTERS)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              Clear filters
            </button>
          )}
        </div>

        <ExpenseList expenses={expenses} categories={categories} onEdit={setEditingExpense} onDelete={handleExpenseDelete} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Budgets</h2>
        <BudgetForm
          categories={categories}
          initialBudget={editingBudget}
          onSubmit={handleBudgetSubmit}
          onCancel={() => setEditingBudget(null)}
        />
        <BudgetList budgets={budgets} onEdit={setEditingBudget} onDelete={handleBudgetDelete} />
      </section>
    </div>
  );
}
