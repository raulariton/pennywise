import { MotionConfig, motion } from 'framer-motion';
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
      className="rounded-3xl border border-border bg-muted p-8"
    >
      <div className="mb-8">
        {/* TODO: use charts from shadcn/ui */}
        {/*<h2 className="mb-2 text-xl font-light">Cash Flow Analysis</h2>*/}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
            <span className="text-muted-foreground text-lg">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <span className="text-muted-foreground text-lg">Expenses</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        {/* Chart */}
        <div className="absolute inset-0 flex items-end justify-between px-4">
          {months.map((month, index) => {
            const incomeHeight = (incomeData[index] / maxValue) * 100;
            const expenseHeight = (expenseData[index] / maxValue) * 100;

            return (
              <div key={month} className="flex flex-1 flex-col items-center gap-1">
                <div className="mb-2 flex h-48 items-end gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${incomeHeight}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    className="w-4 rounded-t-sm bg-emerald-400"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${expenseHeight}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
                    className="w-4 rounded-t-sm bg-red-400"
                  />
                </div>
                <span className="text-sm text-muted-foreground">{month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
