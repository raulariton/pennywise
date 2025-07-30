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
    className={`flex items-center space-x-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200 ${className}`}
  >
    {children}
  </button>
);
