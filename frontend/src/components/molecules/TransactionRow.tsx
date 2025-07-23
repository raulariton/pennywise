import { motion } from 'framer-motion';
import { Entry } from '@/hooks/crud/useEntries';
import { StatusDot } from '../atoms/StatusDot';
import { CategoryBadge } from '../atoms/CategoryBadge';
import { FormattedDate } from '../atoms/FormattedDate';
import { AmountText } from '../atoms/AmountText';

export const TransactionRow = ({ entry, index }: { entry: Entry; index: number }) => (
  <motion.tr
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="bg-card hover:bg-card/25 transition-colors"
  >
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="mr-3">
          <StatusDot type={entry.type} />
        </div>
        <div className="font-medium">{entry.description || 'No description'}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <CategoryBadge name={entry.category.name} color={entry.category.color} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <FormattedDate date={entry.timestamp} />
    </td>
    <td className="px-6 py-4 text-right font-medium whitespace-nowrap">
      <AmountText amount={entry.amount} currency={entry.currency} type={entry.type} />
    </td>
  </motion.tr>
);
