export const AmountText = ({
  amount,
  currency,
  type,
}: {
  amount: number;
  currency: string;
  type: 'income' | 'expense';
}) => {
  const symbol = currency === 'USD' ? '$' : currency;
  const prefix = type === 'income' ? '+' : '-';

  return (
    <span className={type === 'income' ? 'text-emerald-600' : 'text-red-600'}>
      {`${prefix}${symbol}${amount.toLocaleString()}`}
    </span>
  );
};
