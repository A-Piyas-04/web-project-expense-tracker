import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { colors, layout } from '../theme';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(email, password);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        backgroundColor: colors.page,
      }}
    >
      <aside
        style={{
          width: '36%',
          minWidth: '180px',
          maxWidth: '360px',
          backgroundColor: colors.tealDark,
          color: colors.white,
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>ExpenseTracker</p>
        <div>
          <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Start tracking in minutes.
          </p>
          <p style={{ margin: '14px 0 0 0', fontSize: '14px', opacity: 0.85, lineHeight: 1.5 }}>
            Create an account to log expenses and set monthly budgets.
          </p>
        </div>
      </aside>

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '380px', ...layout.panelStrong }}>
          <h1 style={layout.sectionTitle}>Create an account</h1>
          <p style={layout.sectionHint}>Use your email and a password with at least 8 characters.</p>
          <hr style={layout.hairline} />

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <Input
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                style={authFieldStyle}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                autoComplete="new-password"
                required
                style={authFieldStyle}
              />
            </div>

            {error && <p style={layout.errorText}>{error}</p>}

            <Button type="submit" disabled={isSubmitting} style={{ width: '100%' }}>
              {isSubmitting ? 'Creating account…' : 'Register'}
            </Button>
          </form>

          <p style={{ marginTop: '24px', fontSize: '14px', color: colors.muted }}>
            Already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              style={{ color: colors.teal, fontWeight: '700', textDecoration: 'none' }}
            >
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

const authFieldStyle = {
  border: 'none',
  borderBottom: `1px solid ${colors.rule}`,
  borderRadius: 0,
  backgroundColor: 'transparent',
  padding: '10px 0',
};
