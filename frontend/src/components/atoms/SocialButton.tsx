'use client';
import React from 'react';

type SocialButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function SocialButton({ children, icon, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-700 bg-gray-800/50 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-gray-700/50 focus:ring-2 focus:ring-gray-500 focus:outline-none"
    >
      {icon}
      {children}
    </button>
  );
}
