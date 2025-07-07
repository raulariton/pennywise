"use client";
import React from "react";

type BlobProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function GradientBackgroundBlob({
  className = "",
  style,
}: BlobProps) {
  return (
    <div
      className={`absolute rounded-full blur-2xl animate-pulse pointer-events-none ${className}`}
      style={style}
    />
  );
}
