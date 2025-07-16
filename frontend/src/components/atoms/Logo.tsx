import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size: 'sm' | 'md' | 'lg';
  className?: string;
  glow?: boolean;
}

const Logo = (props: LogoProps) => {
  const { size, className, glow } = props;

  const heightBasedOnSize = {
    'sm': 'h-[25px]',
    'md': 'h-[50px]',
    'lg': 'h-[75px]',
  }

  return (
    <div>
      <Image
        src="full-logo-white.svg"
        alt="Logo"
        width={100}
        height={25}
        // width and height properties don't matter since we use className for sizing
        className={cn(
          heightBasedOnSize[size],
          'w-auto',
          className,
          glow ? 'animate-pulse drop-shadow-[0_0_10px_#06b6d4] filter' : '',
        )}
      />
    </div>
  );
};

export default Logo;
