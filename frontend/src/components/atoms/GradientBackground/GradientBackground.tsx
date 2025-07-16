'use client';
import React from 'react';

type BlobProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function GradientBackgroundBlob({ className = '', style }: BlobProps) {
  return (
    <div
      className={`pointer-events-none absolute animate-pulse rounded-full blur-2xl ${className}`}
      style={style}
    />
  );
}
