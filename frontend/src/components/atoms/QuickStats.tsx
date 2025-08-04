import { motion } from 'framer-motion';
import { DollarSign, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export const QuickStats: React.FC<{
  totalSpent: number;
  totalBudget: number;
  totalRemaining: number;
}> = ({ totalSpent, totalBudget, totalRemaining }) => {
  const spentPercentage = (totalSpent / totalBudget) * 100;

  const classNameOnSpentPercentage = (percentage: number) => {
    if (percentage > 90) {
      return {
        cardContainer: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700',
        totalSpentText: 'text-red-600 dark:text-red-400',
        totalSpentValue: 'text-red-900 dark:text-red-100',
        iconContainer: 'bg-red-500',
      };
    } else if (percentage > 75) {
      return {
        cardContainer: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-700',
        totalSpentText: 'text-amber-600 dark:text-amber-400',
        totalSpentValue: 'text-amber-900 dark:text-amber-100',
        iconContainer: 'bg-amber-500',
      };
    } else {
      return {
        cardContainer: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700',
        totalSpentText: 'text-emerald-600 dark:text-emerald-400',
        totalSpentValue: 'text-emerald-900 dark:text-emerald-100',
        iconContainer: 'bg-emerald-500',
      };
    }
  }

  const { cardContainer, totalSpentText, totalSpentValue, iconContainer } = classNameOnSpentPercentage(spentPercentage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Budget</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              ${totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-500 rounded-lg">
            <DollarSign className="size-6 text-white" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={cn(
          'bg-gradient-to-br rounded-xl p-4 border',
          cardContainer)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className={cn('text-sm font-medium',
              totalSpentText)}
            >
              Total Spent {spentPercentage ? `(${spentPercentage.toFixed(2)}%)` : ''}
            </p>
            <p
              className={cn('text-2xl font-bold',
              totalSpentValue)}
            >
              ${totalSpent.toLocaleString()}
            </p>
          </div>
          <div
            className={cn('p-3 rounded-lg', iconContainer)}
          >
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Remaining</p>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              ${totalRemaining.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-purple-500 rounded-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
