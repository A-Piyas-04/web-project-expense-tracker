import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { colors, layout } from '../../theme';

export default function BudgetList({ budgets, onEdit, onDelete }) {
  if (budgets.length === 0) {
    return (
      <p
        style={{
          maxWidth: '720px',
          margin: '8px 0 0 0',
          color: colors.muted,
          fontSize: '14px',
          fontStyle: 'italic',
        }}
      >
        No budgets set yet. Add one above to get overspend warnings.
      </p>
    );
  }

  return (
    <ul
      style={{
        ...layout.panel,
        listStyle: 'none',
        margin: 0,
        maxWidth: '720px',
        padding: '4px 18px',
      }}
    >
      {budgets.map((budget, index) => {
        const spent = Number(budget.spent);
        const limit = Number(budget.monthly_limit);
        const percent = Math.min(100, Math.round((spent / limit) * 100));
        const barColor = budget.is_over_budget ? colors.red : colors.teal;

        return (
          <li
            key={budget.id}
            style={{
              padding: '18px 0',
              borderTop: index === 0 ? `1px solid ${colors.rule}` : 'none',
              borderBottom: `1px solid ${colors.rule}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: 1, minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: colors.text }}>
                    {budget.category_name}
                  </p>
                  {budget.is_over_budget && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: colors.red,
                      }}
                    >
                      Over budget
                    </span>
                  )}
                </div>
                <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: colors.muted }}>
                  <span style={{ color: colors.text, fontWeight: '600' }}>
                    {formatCurrency(spent)}
                  </span>
                  {' of '}
                  {formatCurrency(limit)}
                  <span style={{ marginLeft: '10px', color: colors.muted }}>{percent}%</span>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Button type="button" variant="secondary" onClick={() => onEdit(budget)}>
                  Edit
                </Button>
                <Button type="button" variant="danger" onClick={() => onDelete(budget)}>
                  Delete
                </Button>
              </div>
            </div>

            <div
              style={{
                marginTop: '14px',
                height: '2px',
                width: '100%',
                backgroundColor: colors.rule,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${percent}%`,
                  backgroundColor: barColor,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
