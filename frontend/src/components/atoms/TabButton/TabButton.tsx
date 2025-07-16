'use client';
import React from 'react';

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function TabButton({
  isActive,
  onClick,
  children,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-full px-4 py-3 font-medium transition-all duration-300 ${
        isActive ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}
