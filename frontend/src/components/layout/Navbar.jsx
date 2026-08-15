import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function linkClass(path) {
    return `text-sm font-medium ${
      location.pathname === path ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
    }`;
  }

  function handleLogout() {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  }

  return (
    <nav className="border-b px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex gap-4">
          <Link to={ROUTES.DASHBOARD} className={linkClass(ROUTES.DASHBOARD)}>
            Dashboard
          </Link>
          <Link to={ROUTES.EXPENSES} className={linkClass(ROUTES.EXPENSES)}>
            Expenses
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-slate-600">{user.email}</span>}
          <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-slate-900">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
