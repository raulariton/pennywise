// components/molecules/GoalProgress.tsx

import { ProgressBar } from '../atoms/ProgessBar';

interface GoalProgressProps {
  progress: number;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({ progress }) => (
  <div className="mb-3">
    <div className="mb-2 flex items-center justify-between">
      <span className="text-sm">Progress</span>
      <span className="text-base font-bold">{progress.toFixed(1)}%</span>
    </div>
    <ProgressBar
      percentage={Math.min(progress, 100)}
      colorClass="bg-gradient-to-r from-blue-500 to-purple-500"
    />
  </div>
);
