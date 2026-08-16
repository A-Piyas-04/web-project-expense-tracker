import { colors } from '../../theme';

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '64px 16px',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: `3px solid ${colors.tealSoft}`,
          borderTopColor: colors.teal,
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ margin: 0, fontSize: '14px', color: colors.muted }}>{label}</p>
    </div>
  );
}
