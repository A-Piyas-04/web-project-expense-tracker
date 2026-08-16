import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { colors, layout } from '../../theme';

const CHART_COLORS = [
  colors.teal,
  colors.tealDark,
  '#0f766e',
  '#2f9b75',
  '#5b8f7a',
  '#64748b',
  '#94a3b8',
];

export default function CategoryPieChart({ data }) {
  return (
    <section style={layout.panel}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: colors.teal, letterSpacing: '0.08em' }}>
          01
        </span>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.tealDark }}>
          Spending by category
        </h3>
      </div>
      <p style={{ ...layout.sectionHint, marginTop: '4px', marginLeft: '28px' }}>
        How your money is split across categories.
      </p>
      <hr style={{ ...layout.hairline, marginLeft: '28px' }} />

      {data.length === 0 ? (
        <p style={{ marginLeft: '28px', color: colors.muted, fontSize: '14px' }}>
          Add an expense to see this chart.
        </p>
      ) : (
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="category_name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => entry.category_name}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.category_id} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
