import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { colors, layout } from '../../theme';

export default function CategoryBarChart({ data }) {
  return (
    <section style={layout.panel}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: colors.teal, letterSpacing: '0.08em' }}>
          02
        </span>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.tealDark }}>
          Category totals
        </h3>
      </div>
      <p style={{ ...layout.sectionHint, marginTop: '4px', marginLeft: '28px' }}>
        Compare how much you spent in each category.
      </p>
      <hr style={{ ...layout.hairline, marginLeft: '28px' }} />

      {data.length === 0 ? (
        <p style={{ marginLeft: '28px', color: colors.muted, fontSize: '14px' }}>
          Add an expense to see this chart.
        </p>
      ) : (
        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.rule} vertical={false} />
              <XAxis dataKey="category_name" tick={{ fontSize: 12, fill: colors.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: colors.muted }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="total" fill={colors.teal} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
