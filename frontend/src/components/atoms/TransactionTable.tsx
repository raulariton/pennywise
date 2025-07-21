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
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white">
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
          <button className="text-sm text-gray-500 transition-colors hover:text-gray-700">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {entries.map((entry, index) => (
              <motion.tr
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className={`mr-3 h-3 w-3 rounded-full ${
                        entry.type === EntryType.INCOME ? 'bg-emerald-400' : 'bg-red-400'
                      }`}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {entry.description || 'No description'}
                      </div>
                      <div className="text-xs text-gray-500">{entry.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      entry.category.color || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {entry.category.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                  {formatDate(entry.timestamp)}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
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

      <div className="border-t border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Showing 8 of 156 transactions</span>
          <button className="font-medium text-blue-600 hover:text-blue-700">Load More</button>
        </div>
      </div>
    </div>
  );
};
