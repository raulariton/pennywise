// components/atoms/PrimaryButton.tsx
import React from 'react';

interface PrimaryButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-sm transition-colors font-semibold bg-cyan-600 hover:bg-cyan-700 text-primary-foreground ${className}`}
  >
    {children}
  </button>
);
