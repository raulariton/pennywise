"use client";
import React from "react";

type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
};

export default function Label({ htmlFor, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-300 mb-2"
    >
      {children}
    </label>
  );
}
