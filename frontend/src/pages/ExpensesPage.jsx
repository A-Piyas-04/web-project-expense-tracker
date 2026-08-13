import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import BudgetForm from '../components/budgets/BudgetForm';
import BudgetList from '../components/budgets/BudgetList';
import OverspendBanner from '../components/common/OverspendBanner';

export default function ExpensesPage() {
  // TODO: wire expense and budget sections to backend APIs
  return (
    <div>
      <h1>Expenses — TODO</h1>
      <OverspendBanner />
      <ExpenseForm />
      <ExpenseList />
      <BudgetForm />
      <BudgetList />
    </div>
  );
}
