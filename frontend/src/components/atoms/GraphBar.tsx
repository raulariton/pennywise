import { motion } from 'framer-motion';

export const GraphBar = ({
  value,
  maxValue,
  minValue,
  index,
  isLast,
  isPositive,
}: {
  value: number;
  maxValue: number;
  minValue: number;
  index: number;
  isLast: boolean;
  isPositive: boolean;
}) => {
  const height = ((value - minValue) / (maxValue - minValue)) * 100;
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      variants={{
        hovered: {
          height: `${Math.max(height, 8)}%`,
          opacity: 1,
        },
      }}
      transition={{
        duration: 0.4,
        delay: 0.2 + index * 0.03,
        ease: 'easeOut',
      }}
      className={`w-4 rounded-t-sm ${
        isLast ? (isPositive ? 'bg-emerald-400' : 'bg-red-400') : 'bg-gray-200'
      } ${isLast ? 'shadow-sm' : ''}`}
    />
  );
};
