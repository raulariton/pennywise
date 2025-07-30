import React from 'react';
import { motion, MotionConfig } from 'motion/react';
import { CardFooter } from '../molecules/CardFooter';
import { CardHeader } from '../molecules/CardHeader';
import { DashboardGraph } from './DashboardCardGraph';

export const DashboardCard = ({
  title,
  amount,
  change,
  period = 'vs last month',
  data = [65, 78, 52, 89, 73, 95, 68, 84, 76, 92, 58, 81],
  className,
}: {
  title: string;
  amount: string;
  change: number;
  period?: string;
  data?: number[];
  className?: string;
}) => {
  return (
    <MotionConfig
      transition={{
        type: 'spring',
        bounce: 0.15,
        duration: 0.6,
      }}
    >
      <motion.div
        whileHover="hovered"
        className={`group border-border hover:border-card relative w-full max-w-sm overflow-hidden rounded-3xl border transition-colors duration-500 ${className}`}
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          variants={{ hovered: { opacity: 0, scale: 0.95 } }}
          transition={{ duration: 0.4 }}
          className="flex h-52 flex-col justify-between p-8"
        >
          <CardHeader title={title} />
          <div className="flex flex-1 items-center">
            <span className="text-4xl font-semibold tracking-tight">{amount}</span>
          </div>
          <CardFooter change={change} period={period} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          variants={{ hovered: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <DashboardGraph data={data} />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};
