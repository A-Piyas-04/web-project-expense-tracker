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
import { colors, layout } from '../theme';

const EMPTY_FILTERS = {
  categoryId: '',
  startDate: '',
  endDate: '',
};

const fieldStyle = {
  width: '100%',
  padding: '10px 0',
  border: 'none',
  borderBottom: `1px solid ${colors.rule}`,
  borderRadius: 0,
  fontSize: '14px',
  color: colors.text,
  backgroundColor: 'transparent',
};

export default function ExpensesPage() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [editingExpense, setEditingExpense] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [activeView, setActiveView] = useState('add');

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
    const label = expense.description || 'expense';
    if (!window.confirm(`Delete this ${label}?`)) {
      return;
    }

    await expensesApi.remove(expense.id);

    if (editingExpense?.id === expense.id) {
      setEditingExpense(null);
    }

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
    if (!window.confirm(`Delete the budget for ${budget.category_name}?`)) {
      return;
    }

    await budgetsApi.remove(budget.id);

    if (editingBudget?.id === budget.id) {
      setEditingBudget(null);
    }

    await loadBudgets();
  }

  function handleEditExpense(expense) {
    setEditingExpense(expense);
    setActiveView('add');
  }

  function handleEditBudget(budget) {
    setEditingBudget(budget);
    setActiveView('budgets');
  }

  const hasActiveFilters = Boolean(
    filters.categoryId || filters.startDate || filters.endDate,
  );

  if (isLoading) {
    return <LoadingSpinner label="Loading expenses…" />;
  }

  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <h1 style={layout.sectionTitle}>Expenses</h1>
        <p style={layout.sectionHint}>
          Use the side menu to add expenses, view your list, or manage budgets.
        </p>
      </div>
      <hr style={layout.hairline} />

      {loadError && <p style={layout.errorText}>{loadError}</p>}

      <div style={{ marginBottom: '24px' }}>
        <OverspendBanner budgets={budgets} />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Side menu: text links with left marker, not boxed cards */}
        <aside
          style={{
            ...layout.panel,
            width: '200px',
            flexShrink: 0,
            padding: '14px',
          }}
        >
          <p style={{ ...layout.label, marginBottom: '14px' }}>Menu</p>

          <SideButton
            label="Add Expense"
            isActive={activeView === 'add'}
            onClick={() => setActiveView('add')}
          />
          <SideButton
            label="Expense List"
            isActive={activeView === 'list'}
            onClick={() => setActiveView('list')}
          />
          <SideButton
            label="Budgets"
            isActive={activeView === 'budgets'}
            onClick={() => setActiveView('budgets')}
          />
        </aside>

        <div style={{ flex: 1, minWidth: '280px' }}>
          {activeView === 'add' && (
            <ExpenseForm
              categories={categories}
              initialExpense={editingExpense}
              onSubmit={handleExpenseSubmit}
              onCancel={() => setEditingExpense(null)}
            />
          )}

          {activeView === 'list' && (
            <div>
              <div
                style={{
                  ...layout.panel,
                  maxWidth: '800px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  alignItems: 'flex-end',
                  marginBottom: '16px',
                }}
              >
                <p
                  style={{
                    ...layout.label,
                    width: '100%',
                    marginBottom: '0',
                  }}
                >
                  Filter expenses
                </p>
                <div style={{ minWidth: '140px', flex: 1 }}>
                  <label htmlFor="filter-category" style={layout.label}>
                    Category
                  </label>
                  <select
                    id="filter-category"
                    value={filters.categoryId}
                    onChange={(e) =>
                      handleFilterChange({ ...filters, categoryId: e.target.value })
                    }
                    style={fieldStyle}
                  >
                    <option value="">All categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ minWidth: '140px', flex: 1 }}>
                  <label htmlFor="filter-start" style={layout.label}>
                    From
                  </label>
                  <input
                    id="filter-start"
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      handleFilterChange({ ...filters, startDate: e.target.value })
                    }
                    style={fieldStyle}
                  />
                </div>

                <div style={{ minWidth: '140px', flex: 1 }}>
                  <label htmlFor="filter-end" style={layout.label}>
                    To
                  </label>
                  <input
                    id="filter-end"
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      handleFilterChange({ ...filters, endDate: e.target.value })
                    }
                    style={fieldStyle}
                  />
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => handleFilterChange(EMPTY_FILTERS)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '10px 0',
                      color: colors.teal,
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <ExpenseList
                expenses={expenses}
                categories={categories}
                onEdit={handleEditExpense}
                onDelete={handleExpenseDelete}
              />
            </div>
          )}

          {activeView === 'budgets' && (
            <div>
              <BudgetForm
                categories={categories}
                initialBudget={editingBudget}
                onSubmit={handleBudgetSubmit}
                onCancel={() => setEditingBudget(null)}
              />
              <div style={{ height: '28px' }} />
              <p style={{ ...layout.label, marginBottom: '4px' }}>Your budgets</p>
              <BudgetList
                budgets={budgets}
                onEdit={handleEditBudget}
                onDelete={handleBudgetDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SideButton({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        marginBottom: '4px',
        padding: '10px 0 10px 12px',
        border: 'none',
        borderLeft: isActive ? `3px solid ${colors.teal}` : '3px solid transparent',
        backgroundColor: isActive ? colors.tealSoft : 'transparent',
        color: isActive ? colors.tealDark : colors.muted,
        fontWeight: isActive ? '700' : '500',
        fontSize: '14px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
