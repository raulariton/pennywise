import { useFetchEntries } from '../../hooks/useEntries';
import { TransactionRow } from '../molecules/TransactionRow';
import { ViewAllButton } from '../atoms/ViewAllButton';

export const TransactionTable = () => {
  const { entries, loading, error } = useFetchEntries();

  if (loading) return <p>Loading entries...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (!entries || entries.length === 0) {
    return <p className="text-muted-foreground py-8 text-center">No transactions found.</p>;
  }

  return (
    <div className="border-border bg-muted overflow-hidden rounded-3xl border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-card border-border border-b">
            <tr>
              <th className="text-card-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                Description
              </th>
              <th className="text-card-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                Category
              </th>
              <th className="text-card-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                Date
              </th>
              <th className="text-card-foreground px-6 py-4 text-right text-xs font-medium tracking-wider uppercase">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {entries.map((entry, index) => (
              <TransactionRow key={entry.id} entry={entry} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-border border-t p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Showing {entries.length} of 156 transactions</span>
          <ViewAllButton />
        </div>
      </div>
    </div>
  );
};
