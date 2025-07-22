export const ChangeIndicator = ({ change }: { change: number }) => {
  const isPositive = change >= 0;
  return (
    <div className="flex items-center gap-3">
      <div className={`h-2 w-2 rounded-full ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`} />
      <span className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}
        {change}%
      </span>
    </div>
  );
};
