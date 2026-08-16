import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { colors, layout } from '../../theme';

export default function MonthlyLineChart({ data }) {
  return (
    <section style={layout.panelStrong}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: colors.teal, letterSpacing: '0.08em' }}>
          03
        </span>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.tealDark }}>
          Spending over time
        </h3>
      </div>
      <p style={{ ...layout.sectionHint, marginTop: '4px', marginLeft: '28px' }}>
        See how your monthly spending changes.
      </p>
      <hr style={{ ...layout.hairline, marginLeft: '28px' }} />

      {data.length === 0 ? (
        <p style={{ marginLeft: '28px', color: colors.muted, fontSize: '14px' }}>
          Add an expense to see this chart.
        </p>
      ) : (
        <div style={{ width: '100%', height: '280px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.rule} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: colors.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: colors.muted }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line
                type="monotone"
                dataKey="total"
                stroke={colors.tealDark}
                strokeWidth={2}
                dot={{ r: 3, fill: colors.tealDark }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
