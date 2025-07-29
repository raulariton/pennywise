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
    className={`flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 ${className}`}
  >
    {children}
  </button>
);
