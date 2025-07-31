import { cn } from '@/lib/utils';
import { motion, MotionConfig } from 'framer-motion';
import React from 'react';
import { CardHeader } from '@/components/molecules/CardHeader';
import { CardFooter } from '@/components/molecules/CardFooter';

const DashboardCardTemplate = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
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
        className={cn(
          `group border-border hover:border-card relative w-full max-w-sm overflow-hidden rounded-3xl border transition-colors duration-500`,
          className,
        )}
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          variants={{ hovered: { opacity: 0, scale: 0.95 } }}
          transition={{ duration: 0.4 }}
          className="flex h-52 flex-col justify-between p-8"
        >
          <CardHeader title="" />
          <div className="flex flex-1 items-center">
            <span className="text-4xl font-semibold tracking-tight">{amount}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          variants={{ hovered: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          on hover
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

export default DashboardCardTemplate;
