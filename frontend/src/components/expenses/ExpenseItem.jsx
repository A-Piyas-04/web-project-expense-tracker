export default function ExpenseItem({ expense }) {
  // TODO: implement edit and delete actions
  return <div>{expense?.description ?? 'Expense Item — TODO'}</div>;
}
