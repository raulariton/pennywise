import { MotionConfig, motion } from 'framer-motion';
import { useFetchEntries, Entry } from '../../hooks/useEntries';

enum EntryType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const TransactionTable = () => {
  // Sample data matching your Entry model
  const { entries, loading, error, refetch } = useFetchEntries();

  if (loading) return <p>Loading entries...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const formatAmount = (amount: number, currency: string, type: EntryType) => {
    const symbol = currency === 'USD' ? '$' : currency;
    const prefix = type === EntryType.INCOME ? '+' : '-';
    return `${prefix}${symbol}${amount.toLocaleString()}`;
  };

  const formatDate = (date: string | Date): string => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) return 'Invalid date';

    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-muted">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-card border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-card-foreground uppercase">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-card-foreground uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-card-foreground uppercase">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium tracking-wider text-card-foreground uppercase">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((entry, index) => (
              <motion.tr
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="transition-colors bg-card hover:bg-card/25"
              >
                <td className="px-6 py-4 whitespace-nowrap b">
                  <div className="flex items-center">
                    <div
                      className={`mr-3 h-3 w-3 rounded-full ${
                        entry.type === EntryType.INCOME ? 'bg-emerald-400' : 'bg-red-400'
                      }`}
                    />
                    <div>
                      <div className="font-medium">
                        {entry.description || 'No description'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      entry.category.color || 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {entry.category.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                  {formatDate(entry.timestamp)}
                </td>
                <td className="px-6 py-4 text-right font-medium whitespace-nowrap">
                  <span
                    className={`${
                      entry.type === EntryType.INCOME ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {formatAmount(entry.amount, entry.currency, entry.type)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Showing 8 of 156 transactions</span>
          <button className="font-medium text-cyan-700 hover:text-cyan-800">View all</button>
        </div>
      </div>
    </div>
  );
};
