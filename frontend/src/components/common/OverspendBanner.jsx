import { formatCurrency } from '../../utils/formatters';
import { colors } from '../../theme';

export default function OverspendBanner({ budgets }) {
  const overBudget = budgets.filter((budget) => budget.is_over_budget);

  if (overBudget.length === 0) {
    return null;
  }

  const heading =
    overBudget.length === 1
      ? "You're over budget in this category"
      : "You're over budget in these categories";

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '4px 1fr',
        gap: '14px',
        alignItems: 'start',
        backgroundColor: colors.redSoft,
        border: `1.5px solid ${colors.red}`,
        borderRadius: '6px',
        padding: '14px 16px',
      }}
    >
      <div style={{ width: '4px', minHeight: '100%', backgroundColor: colors.red, alignSelf: 'stretch' }} />
      <div>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: colors.red,
          }}
        >
          Attention
        </p>
        <p style={{ margin: '6px 0 0 0', fontWeight: '700', color: colors.text, fontSize: '15px' }}>
          {heading}
        </p>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', color: colors.muted, fontSize: '14px' }}>
          {overBudget.map((budget) => (
            <li key={budget.id} style={{ marginBottom: '4px' }}>
              <strong style={{ color: colors.text }}>{budget.category_name}</strong>
              {' — '}
              {formatCurrency(budget.spent)} / {formatCurrency(budget.monthly_limit)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
