"use client";
import React from "react";

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
      className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-white text-black shadow-lg"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
