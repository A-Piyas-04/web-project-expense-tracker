import ExpenseItem from './ExpenseItem';

export default function ExpenseList() {
  // TODO: fetch and display expenses in table or card layout
  const expenses = [];

  return (
    <div>
      <p>Expense List — TODO</p>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
