import { MotionConfig, motion } from 'framer-motion';

enum EntryType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

interface Entry {
  id: string;
  type: EntryType;
  amount: number;
  currency: string;
  description?: string;
  timestamp: Date;
  category: {
    name: string;
    color?: string;
  };
}

export const TransactionTable = () => {
  // Sample data matching your Entry model
  const entries: Entry[] = [
    {
      id: '1',
      type: EntryType.INCOME,
      amount: 6800,
      currency: 'USD',
      description: 'Monthly Salary',
      timestamp: new Date('2024-12-01'),
      category: { name: 'Salary', color: 'bg-emerald-100 text-emerald-800' },
    },
    {
      id: '2',
      type: EntryType.EXPENSE,
      amount: 1200,
      currency: 'USD',
      description: 'Apartment Rent',
      timestamp: new Date('2024-12-01'),
      category: { name: 'Housing', color: 'bg-blue-100 text-blue-800' },
    },
    {
      id: '3',
      type: EntryType.EXPENSE,
      amount: 320,
      currency: 'USD',
      description: 'Grocery Shopping',
      timestamp: new Date('2024-12-02'),
      category: { name: 'Food', color: 'bg-orange-100 text-orange-800' },
    },
    {
      id: '4',
      type: EntryType.INCOME,
      amount: 450,
      currency: 'USD',
      description: 'Freelance Project',
      timestamp: new Date('2024-12-03'),
      category: { name: 'Freelance', color: 'bg-purple-100 text-purple-800' },
    },
    {
      id: '5',
      type: EntryType.EXPENSE,
      amount: 89,
      currency: 'USD',
      description: 'Utilities Bill',
      timestamp: new Date('2024-12-03'),
      category: { name: 'Utilities', color: 'bg-yellow-100 text-yellow-800' },
    },
    {
      id: '6',
      type: EntryType.EXPENSE,
      amount: 65,
      currency: 'USD',
      description: 'Gas Station',
      timestamp: new Date('2024-12-04'),
      category: { name: 'Transportation', color: 'bg-red-100 text-red-800' },
    },
    {
      id: '7',
      type: EntryType.INCOME,
      amount: 200,
      currency: 'USD',
      description: 'Investment Dividend',
      timestamp: new Date('2024-12-05'),
      category: { name: 'Investment', color: 'bg-green-100 text-green-800' },
    },
    {
      id: '8',
      type: EntryType.EXPENSE,
      amount: 45,
      currency: 'USD',
      description: 'Coffee & Lunch',
      timestamp: new Date('2024-12-05'),
      category: { name: 'Food', color: 'bg-orange-100 text-orange-800' },
    },
  ];

  const formatAmount = (amount: number, currency: string, type: EntryType) => {
    const symbol = currency === 'USD' ? '$' : currency;
    const prefix = type === EntryType.INCOME ? '+' : '-';
    return `${prefix}${symbol}${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
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
