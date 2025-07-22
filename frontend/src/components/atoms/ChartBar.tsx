import { motion } from 'framer-motion';

export const ChartBar = ({
  height,
  color,
  delay,
}: {
  height: number;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ height: 0 }}
    animate={{ height: `${height}%` }}
    transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    className={`w-4 rounded-t-sm ${color}`}
  />
);
