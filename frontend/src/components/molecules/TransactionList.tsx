// components/molecules/TransactionList.tsx
import { ColorDot } from '../atoms/ColorDot';

interface TransactionItem {
  label: string;
  amount: number;
  color: string;
}

interface TransactionListProps {
  transactions: TransactionItem[];
  onHover: (index: number | null) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onHover }) => (
  <div className="w-1/2 overflow-y-auto pl-4" role="list">
    <h4 className="text-md mb-2 font-semibold text-gray-700">Transactions</h4>
    <ul>
      {transactions.map((t, idx) => (
        <li
          key={idx}
          role="listitem"
          className="flex items-center justify-between rounded-lg p-2 transition hover:bg-white/30"
          onMouseEnter={() => onHover(idx)}
          onMouseLeave={() => onHover(null)}
        >
          <div className="flex items-center">
            <ColorDot color={t.color} />
            <span className="ml-2 text-sm text-gray-800">{t.label}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
