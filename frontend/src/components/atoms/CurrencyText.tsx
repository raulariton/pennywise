// components/atoms/CurrencyText.tsx
interface CurrencyTextProps {
  amount: number;
  className?: string;
}

export const CurrencyText: React.FC<CurrencyTextProps> = ({ amount, className = '' }) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return <span className={`text-sm font-semibold ${className}`}>{formatted}</span>;
};
