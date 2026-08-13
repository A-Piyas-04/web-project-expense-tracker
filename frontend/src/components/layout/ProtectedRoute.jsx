import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // TODO: replace with real auth check once JWT storage is implemented
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
