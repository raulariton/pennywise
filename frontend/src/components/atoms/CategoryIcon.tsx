// components/atoms/CategoryIcon.tsx
import { DollarSign, TrendingUp, TrendingDown, Target } from 'lucide-react';

interface CategoryIconProps {
  category: 'savings' | 'investment' | 'debt' | 'purchase';
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  const getCategoryColor = () => {
    switch (category) {
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

  const getIcon = () => {
    switch (category) {
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

  return <div className={`rounded-lg p-2 ${getCategoryColor()}`}>{getIcon()}</div>;
};
