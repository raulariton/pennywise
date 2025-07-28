import {
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  Calendar,
  Plus,
  Settings,
  Bell,
  User,
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: 'savings' | 'investment' | 'debt' | 'purchase';
}

export const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
  const progress = (goal.current / goal.target) * 100;
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const getCategoryIcon = () => {
    switch (goal.category) {
      case 'savings':
        return <DollarSign className="h-5 w-5" />;
      case 'investment':
        return <TrendingUp className="h-5 w-5" />;
      case 'debt':
        return <TrendingDown className="h-5 w-5" />;
      case 'purchase':
        return <Target className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getCategoryColor = () => {
    switch (goal.category) {
      case 'savings':
        return 'text-green-600 bg-green-100';
      case 'investment':
        return 'text-blue-600 bg-blue-100';
      case 'debt':
        return 'text-red-600 bg-red-100';
      case 'purchase':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`rounded-lg p-2 ${getCategoryColor()}`}>{getCategoryIcon()}</div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{goal.title}</h3>
            <p className="mt-1 text-xs text-gray-500">{goal.deadline}</p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-medium text-gray-700">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">{formatCurrency(goal.current)}</span>
        <span className="font-semibold text-gray-800">{formatCurrency(goal.target)}</span>
      </div>
    </div>
  );
};
