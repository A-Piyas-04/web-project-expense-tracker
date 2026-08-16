import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#0f172a', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#1e40af', '#0891b2'];

export default function CategoryPieChart({ data }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-900">Spending by Category</h3>
      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">Add an expense to see this chart.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="category_name" cx="50%" cy="50%" outerRadius={100} label={(entry) => entry.category_name}>
              {data.map((entry, index) => (
                <Cell key={entry.category_id} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
