import CategoryPieChart from '../components/analytics/CategoryPieChart';
import CategoryBarChart from '../components/analytics/CategoryBarChart';
import MonthlyLineChart from '../components/analytics/MonthlyLineChart';
import OverspendBanner from '../components/common/OverspendBanner';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome{user ? `, ${user.email}` : ''}
      </h1>
      <OverspendBanner />
      <CategoryPieChart />
      <CategoryBarChart />
      <MonthlyLineChart />
    </div>
  );
}
