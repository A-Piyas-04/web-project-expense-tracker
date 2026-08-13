import CategoryPieChart from '../components/analytics/CategoryPieChart';
import CategoryBarChart from '../components/analytics/CategoryBarChart';
import MonthlyLineChart from '../components/analytics/MonthlyLineChart';
import OverspendBanner from '../components/common/OverspendBanner';

export default function DashboardPage() {
  // TODO: fetch analytics data and render dashboard layout
  return (
    <div>
      <h1>Dashboard — TODO</h1>
      <OverspendBanner />
      <CategoryPieChart />
      <CategoryBarChart />
      <MonthlyLineChart />
    </div>
  );
}
