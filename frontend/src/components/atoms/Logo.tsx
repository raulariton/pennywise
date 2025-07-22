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
      {/* Light mode logo */}
    <Image
      src="full-logo-black.svg"
      alt="Logo"
      width={100}
      height={25}
      className={cn(
        heightBasedOnSize[size],
        'w-auto',
        'block dark:hidden',
        className,
        glow ? 'animate-pulse drop-shadow-[0_0_10px_#06b6d4] filter' : '',
      )}
    />
    
    {/* Dark mode logo */}
    <Image
      src="full-logo-white.svg"
      alt="Logo"
      width={100}
      height={25}
      className={cn(
        heightBasedOnSize[size],
        'w-auto',
        'hidden dark:block',
        className,
        glow ? 'animate-pulse drop-shadow-[0_0_10px_#06b6d4] filter' : '',
      )}
    />
    </div>
  );
};

export default Logo;
