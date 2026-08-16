import { useEffect, useState } from 'react';
import CategoryPieChart from '../components/analytics/CategoryPieChart';
import CategoryBarChart from '../components/analytics/CategoryBarChart';
import MonthlyLineChart from '../components/analytics/MonthlyLineChart';
import OverspendBanner from '../components/common/OverspendBanner';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import { analyticsApi } from '../api/analytics';
import { budgetsApi } from '../api/budgets';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency } from '../utils/formatters';
import { colors, layout } from '../theme';

export default function DashboardPage() {
  const { user } = useAuth();
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [monthTotals, setMonthTotals] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [byCategory, byMonth, budgetData] = await Promise.all([
          analyticsApi.getByCategory(),
          analyticsApi.getByMonth(),
          budgetsApi.getAll(),
        ]);

        setCategoryTotals(
          byCategory.map((row) => ({
            ...row,
            total: Number(row.total),
          })),
        );
        setMonthTotals(
          byMonth.map((row) => ({
            ...row,
            total: Number(row.total),
          })),
        );
        setBudgets(budgetData);
      } catch {
        setLoadError('Could not load your analytics. Try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  async function handleExport() {
    setIsExporting(true);
    setExportError('');

    try {
      await analyticsApi.exportCsv();
    } catch {
      setExportError('Could not export your expenses. Try again.');
    } finally {
      setIsExporting(false);
    }
  }

  if (isLoading) {
    return <LoadingSpinner label="Loading your dashboard…" />;
  }

  let totalSpent = 0;
  for (const row of categoryTotals) {
    totalSpent += row.total;
  }

  const overBudgetCount = budgets.filter((budget) => budget.is_over_budget).length;
  const greetingName = user?.email ? user.email.split('@')[0] : '';

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '8px',
        }}
      >
        <div>
          <h1 style={layout.sectionTitle}>
            {greetingName ? `Hi, ${greetingName}` : 'Dashboard'}
          </h1>
          <p style={layout.sectionHint}>A quick look at where your money is going.</p>
        </div>

        <Button type="button" variant="secondary" onClick={handleExport} disabled={isExporting}>
          {isExporting ? 'Exporting…' : 'Export CSV'}
        </Button>
      </div>

      <hr style={layout.hairline} />

      {loadError && <p style={layout.errorText}>{loadError}</p>}
      {exportError && <p style={layout.errorText}>{exportError}</p>}

      <div style={{ marginBottom: '28px' }}>
        <OverspendBanner budgets={budgets} />
      </div>

      {/* Metrics: green outlined strip */}
      <div
        style={{
          ...layout.panelStrong,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0',
          marginBottom: '24px',
          padding: '8px 18px',
        }}
      >
        <MetricBlock
          label="Total spent"
          value={formatCurrency(totalSpent)}
          emphasis="primary"
          showDivider
        />
        <MetricBlock
          label="Categories used"
          value={String(categoryTotals.length)}
          emphasis="secondary"
          showDivider
        />
        <MetricBlock
          label="Budgets over limit"
          value={String(overBudgetCount)}
          emphasis={overBudgetCount > 0 ? 'alert' : 'secondary'}
          showDivider={false}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <CategoryPieChart data={categoryTotals} />
        <CategoryBarChart data={categoryTotals} />
      </div>

      <MonthlyLineChart data={monthTotals} />
    </div>
  );
}

function MetricBlock({ label, value, emphasis, showDivider }) {
  let valueColor = colors.text;
  let valueSize = '28px';

  if (emphasis === 'primary') {
    valueColor = colors.tealDark;
    valueSize = '34px';
  } else if (emphasis === 'alert') {
    valueColor = colors.red;
  }

  return (
    <div
      style={{
        padding: '20px 18px 22px 0',
        marginRight: showDivider ? '18px' : '0',
        borderRight: showDivider ? `1.5px solid ${colors.tealLine}` : 'none',
      }}
    >
      <p style={{ ...layout.label, marginBottom: '10px' }}>{label}</p>
      <p
        style={{
          margin: 0,
          fontSize: valueSize,
          fontWeight: '700',
          color: valueColor,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
    </div>
  );
}
