"use client";
import React from "react";

type SocialButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function SocialButton({
  children,
  icon,
  onClick,
}: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 px-6 bg-gray-800/50 border border-gray-700 text-white font-medium rounded-xl hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 flex items-center justify-center gap-3"
    >
      {icon}
      {children}
    </button>
  );
}
