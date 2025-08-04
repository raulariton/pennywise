// components/atoms/SecondaryButton.tsx
import React from 'react';

interface SecondaryButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onClick,
  children,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 rounded-lg px-3 py-1.5 text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 text-primary-foreground transition-colors  ${className}`}
  >
    {children}
  </button>
);
