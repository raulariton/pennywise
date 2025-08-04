// components/molecules/TransactionList.tsx
import { ColorDot } from '../atoms/ColorDot';
import { cn } from '@/lib/utils';

interface TransactionItem {
  label: string;
  amount: number;
  color: string;
  name: string;
}

interface TransactionListProps {
  transactions: TransactionItem[];
  onHover: (index: number | null) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onHover }) => {

  const scrollbarStyle = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-md
  [&::-webkit-scrollbar-track]:bg-muted-foreground/20
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-muted-foreground/50`;

  return (
    <div className="w-1/2 pl-4">
      <h4 className="text-md mb-2 font-semibold">Transactions</h4>
      <ul className={cn("overflow-y-auto max-h-[75%]", scrollbarStyle)}>
        {transactions.map((t, idx) => (
          <li
            key={idx}
            role="listitem"
            className="flex items-center justify-between rounded-lg p-2 transition hover:bg-foreground/10"
            onMouseEnter={() => onHover(idx)}
            onMouseLeave={() => onHover(null)}
          >
            <div className="flex items-center">
              <ColorDot color={t.color} />
              <span className="ml-2 text-sm">{t.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
