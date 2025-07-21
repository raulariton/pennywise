import React from 'react';
import { MotionConfig, motion } from 'framer-motion';

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
  const isPositive = change >= 0;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

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
        className={`group relative w-full max-w-sm overflow-hidden rounded-3xl border border-border transition-colors duration-500 hover:border-card ${className}`}
      >
        {/* Default Layer */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          variants={{
            hovered: { opacity: 0, scale: 0.95 },
          }}
          transition={{ duration: 0.3 }}
          className="flex h-52 flex-col justify-between p-8"
        >
          {/* Title */}
          <div className="space-y-1">
            <h3 className="text-lg font-medium tracking-wide">{title}</h3>
          </div>

          {/* Amount - The Hero */}
          <div className="flex flex-1 items-center">
            <span className="text-4xl font-semibold tracking-tight">{amount}</span>
          </div>

          {/* Change Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`}
              />
              <span
                className={`text-sm font-medium ${
                  isPositive ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {isPositive ? '+' : ''}
                {change}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{period}</span>
          </div>
        </motion.div>

        {/* Graph Layer */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          variants={{
            hovered: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute inset-0 flex h-52 flex-col justify-between bg-muted p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium tracking-wide">{title}</h3>
              <p className="mt-1 text-lg font-medium text-muted-foreground">12 Month Trend</p>
            </div>
            <div
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {isPositive ? '+' : ''}
              {change}%
            </div>
          </div>

          {/* Graph */}
          <div className="flex flex-1 items-end justify-between px-2 pb-4">
            {data.map((value, index) => {
              const height = ((value - minValue) / (maxValue - minValue)) * 100;
              const isLast = index === data.length - 1;

              return (
                <motion.div
                  key={index}
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
            })}
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};
