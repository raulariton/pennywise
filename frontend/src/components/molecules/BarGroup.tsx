import { ChartBar } from '../atoms/ChartBar';

export const BarGroup = ({
  incomeHeight,
  expenseHeight,
  delay,
}: {
  incomeHeight: number;
  expenseHeight: number;
  delay: number;
}) => (
  <div className="mb-2 flex h-48 items-end gap-1">
    <ChartBar height={incomeHeight} color="bg-emerald-400" delay={delay} />
    <ChartBar height={expenseHeight} color="bg-red-400" delay={delay + 0.2} />
  </div>
);
