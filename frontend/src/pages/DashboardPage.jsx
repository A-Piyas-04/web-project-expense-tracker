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
        setCategoryTotals(byCategory.map((row) => ({ ...row, total: Number(row.total) })));
        setMonthTotals(byMonth.map((row) => ({ ...row, total: Number(row.total) })));
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome{user ? `, ${user.email}` : ''}</h1>
        <Button type="button" variant="secondary" onClick={handleExport} disabled={isExporting}>
          {isExporting ? 'Exporting…' : 'Export CSV'}
        </Button>
      </div>

      {loadError && <p className="text-sm text-red-600">{loadError}</p>}
      {exportError && <p className="text-sm text-red-600">{exportError}</p>}

      <OverspendBanner budgets={budgets} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart data={categoryTotals} />
        <CategoryBarChart data={categoryTotals} />
      </div>
      <MonthlyLineChart data={monthTotals} />
    </div>
  );
}
