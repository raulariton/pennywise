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
    className="bg-card hover:bg-card/25 transition-colors flex justify-around"
  >
    <td className="px-6 py-4 whitespace-nowrap flex-1">
      <div className="flex items-center justify-center">
        <div className="font-medium">{entry.name}</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap flex-1">
      <div className="flex items-center justify-center">
        <CategoryBadge name={entry.category.name} />
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap flex-1">
      <div className="flex items-center justify-center">
        <FormattedDate date={entry.timestamp} />
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap flex-1">
      <div className="flex items-center justify-center">
        <AmountText amount={entry.amount} currencyCode={entry.currency} type={entry.type} />
      </div>
    </td>
  </motion.tr>
);
