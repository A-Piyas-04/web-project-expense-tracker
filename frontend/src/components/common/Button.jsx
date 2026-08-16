import { colors } from '../../theme';

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 16px',
  borderRadius: '2px',
  border: 'none',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
};

const variants = {
  primary: {
    backgroundColor: colors.teal,
    color: colors.white,
  },
  secondary: {
    backgroundColor: colors.white,
    color: colors.teal,
    border: `2px solid ${colors.teal}`,
  },
  danger: {
    backgroundColor: colors.red,
    color: colors.white,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.muted,
    border: `1px solid ${colors.border}`,
  },
};

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  style = {},
  disabled = false,
  ...props
}) {
  const variantStyle = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...variantStyle,
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
