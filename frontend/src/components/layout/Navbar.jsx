import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export default function Navbar() {
  // TODO: add logout action and active link styling
  return (
    <nav className="border-b px-4 py-3">
      <div className="container mx-auto flex gap-4">
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
        <Link to={ROUTES.EXPENSES}>Expenses</Link>
      </div>
    </nav>
  );
}
