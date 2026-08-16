import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { colors } from '../../theme';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.page }}>
      <Navbar />
      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '24px 16px',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
