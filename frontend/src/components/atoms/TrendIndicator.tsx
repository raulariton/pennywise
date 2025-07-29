// components/atoms/TrendIndicator.tsx
interface TrendIndicatorProps {
  value: string;
}
export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ value }) => {
  const color = value.startsWith('-') ? 'text-red-500' : 'text-emerald-600';
  return <p className={`text-sm ${color}`}>{value}</p>;
};
