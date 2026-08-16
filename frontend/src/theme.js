// Shared colors for the whole app (beginner-friendly).
export const colors = {
  page: '#e8f2ed',
  teal: '#1f7a5a',
  tealDark: '#165c44',
  tealSoft: '#d8f0e6',
  tealWash: '#f3faf7',
  tealLine: '#9cc9b5',
  blue: '#2563eb',
  blueSoft: '#dbeafe',
  amber: '#b45309',
  amberSoft: '#fef3c7',
  red: '#dc2626',
  redSoft: '#fee2e2',
  white: '#ffffff',
  text: '#1f2937',
  muted: '#6b7280',
  border: '#d1d5db',
  rule: '#b7d4c6',
};

// Shared layout helpers — keep styles consistent without a heavy card system.
export const layout = {
  sectionTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: '-0.02em',
  },
  sectionHint: {
    margin: '6px 0 0 0',
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.45,
  },
  hairline: {
    border: 'none',
    borderTop: '1px solid #b7d4c6',
    margin: '14px 0 20px 0',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#1f7a5a',
  },
  errorText: {
    margin: '0 0 12px 0',
    padding: '0 0 0 10px',
    borderLeft: '3px solid #dc2626',
    color: '#dc2626',
    fontSize: '14px',
  },
  // Soft green outlined panel — separates blocks without AI top-strip cards
  panel: {
    backgroundColor: '#f3faf7',
    border: '1.5px solid #9cc9b5',
    borderRadius: '6px',
    padding: '18px',
  },
  panelStrong: {
    backgroundColor: '#ffffff',
    border: '1.5px solid #1f7a5a',
    borderRadius: '6px',
    padding: '18px',
  },
};
