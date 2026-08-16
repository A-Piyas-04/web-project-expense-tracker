import { colors, layout } from '../../theme';

export default function Input({ label, id, error, style = {}, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label htmlFor={id} style={layout.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '10px 12px',
          borderRadius: '4px',
          border: `1px solid ${error ? colors.red : colors.border}`,
          fontSize: '14px',
          color: colors.text,
          backgroundColor: colors.white,
          ...style,
        }}
        {...props}
      />
      {error && <p style={{ margin: 0, fontSize: '13px', color: colors.red }}>{error}</p>}
    </div>
  );
}
