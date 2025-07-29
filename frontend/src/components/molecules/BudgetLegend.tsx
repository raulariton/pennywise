// components/molecules/BudgetLegend.tsx
import { ChartLegendItem } from '../atoms/ChartLegendItem';

export const BudgetLegend: React.FC = () => (
  <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-600">
    <ChartLegendItem color="#EF4444" label="Spent" />
    <ChartLegendItem color="#10B981" label="Remaining" />
  </div>
);
