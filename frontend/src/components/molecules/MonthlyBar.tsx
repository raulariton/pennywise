import { MonthLabel } from '../atoms/MonthLabel';
import { BarGroup } from './BarGroup';

export const MonthlyBar = ({
  month,
  incomeHeight,
  expenseHeight,
  delay,
}: {
  month: string;
  incomeHeight: number;
  expenseHeight: number;
  delay: number;
}) => (
  <div className="flex flex-1 flex-col items-center gap-1">
    <BarGroup incomeHeight={incomeHeight} expenseHeight={expenseHeight} delay={delay} />
    <MonthLabel label={month} />
  </div>
);
