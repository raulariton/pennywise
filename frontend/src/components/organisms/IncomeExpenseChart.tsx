import { motion } from 'framer-motion';
import { ChartLegend } from '../molecules/ChartLegend';
import { MonthlyBar } from '../molecules/MonthlyBar';

export const IncomeExpenseChart = () => {
  const incomeData = [6200, 6400, 6100, 6600, 6300, 6700, 6500, 6900, 6600, 7000, 6750, 6800];
  const expenseData = [3800, 3600, 3900, 3500, 3700, 3400, 3600, 3300, 3500, 3200, 3350, 3240];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const maxValue = Math.max(...incomeData, ...expenseData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="border-border bg-muted rounded-3xl border p-8"
    >
      <div className="mb-8">
        <ChartLegend />
      </div>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between px-4">
          {months.map((month, index) => {
            const incomeHeight = (incomeData[index] / maxValue) * 100;
            const expenseHeight = (expenseData[index] / maxValue) * 100;

            return (
              <MonthlyBar
                key={month}
                month={month}
                incomeHeight={incomeHeight}
                expenseHeight={expenseHeight}
                delay={index * 0.1}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
