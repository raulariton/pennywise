export const StatusDot = ({ type }: { type: 'income' | 'expense' }) => (
  <div className={`h-3 w-3 rounded-full ${type === 'income' ? 'bg-emerald-400' : 'bg-red-400'}`} />
);
