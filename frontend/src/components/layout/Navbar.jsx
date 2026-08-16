import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import { colors } from '../../theme';
import logo from '../../public/logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  }

  function getNavButtonStyle(path) {
    const isActive = location.pathname === path || location.pathname.startsWith(path + '/');

    if (isActive) {
      return {
        backgroundColor: colors.tealDark,
        color: colors.white,
        border: 'none',
        borderRadius: '8px',
        padding: '8px 14px',
        fontSize: '14px',
        fontWeight: '700',
        textDecoration: 'none',
        display: 'inline-block',
      };
    }

    return {
      backgroundColor: colors.tealSoft,
      color: colors.tealDark,
      border: 'none',
      borderRadius: '8px',
      padding: '8px 14px',
      fontSize: '14px',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block',
    };
  }

  return (
    <header
      style={{
        backgroundColor: '#449763',
        padding: '12px 16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
      }}
    >
      <nav
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Left: logo + brand name */}
        <Link
          to={ROUTES.DASHBOARD}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: colors.white,
            fontSize: '20px',
            fontWeight: '700',
            textDecoration: 'none',
            justifySelf: 'start',
          }}
        >
          <img
            src={logo}
            alt="ExpenseTracker logo"
            style={{
              width: '47px',
              height: '47px',
              borderRadius: '50%',
              display: 'block',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.35)',
            }}
          />
          ExpenseTracker
        </Link>

        {/* Center: Dashboard + Expenses */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Link to={ROUTES.DASHBOARD} style={getNavButtonStyle(ROUTES.DASHBOARD)}>
            Dashboard
          </Link>
          <Link to={ROUTES.EXPENSES} style={getNavButtonStyle(ROUTES.EXPENSES)}>
            Expenses
          </Link>
        </div>

        {/* Right: email + logout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            justifySelf: 'end',
            flexWrap: 'wrap',
          }}
        >
          {user && (
            <span style={{ color: colors.tealSoft, fontSize: '13px' }}>{user.email}</span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            style={{
              backgroundColor: colors.amberSoft,
              color: colors.amber,
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
}
