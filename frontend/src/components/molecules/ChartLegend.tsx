import { LegendItem } from '../atoms/LegendItem';

export const ChartLegend = () => (
  <div className="flex items-center gap-6 text-sm">
    <LegendItem color="bg-emerald-400" label="Income" />
    <LegendItem color="bg-red-400" label="Expenses" />
  </div>
);
