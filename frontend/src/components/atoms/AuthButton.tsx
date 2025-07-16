'use client';
import React from 'react';

type AuthButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function AuthButton({ children, onClick }: AuthButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full transform rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:from-cyan-600 hover:to-blue-600 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
