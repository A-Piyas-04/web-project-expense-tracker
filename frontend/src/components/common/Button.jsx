export default function Button({ children, type = 'button', ...props }) {
  // TODO: add variants (primary, secondary, danger)
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
