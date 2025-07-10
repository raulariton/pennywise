"use client";
import React from "react";

type AuthButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function AuthButton({ children, onClick }: AuthButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-full hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
