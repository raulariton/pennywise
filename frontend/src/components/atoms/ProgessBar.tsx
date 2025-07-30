// components/atoms/ProgressBar.tsx
interface ProgressBarProps {
  percentage: number;
  colorClass: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, colorClass }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
    <div
      className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass}`}
      style={{ width: `${percentage}%` }}
    />
  </div>
);
