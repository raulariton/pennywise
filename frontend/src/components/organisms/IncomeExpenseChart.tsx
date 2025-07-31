import { motion } from 'framer-motion';
import { ChartLegend } from '../molecules/ChartLegend';
import { MonthlyBar } from '../molecules/MonthlyBar';
import MonthlyCashFlowChart from '@/components/molecules/Dashboard/MonthlyCashFlowChart';

export const IncomeExpenseChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="border-border bg-muted rounded-3xl border p-8"
    >
      <MonthlyCashFlowChart />
    </motion.div>
  );
};
