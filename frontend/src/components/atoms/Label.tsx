'use client';
import React from 'react';

type LabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
};

export default function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-gray-300">
      {children}
    </label>
  );
}
