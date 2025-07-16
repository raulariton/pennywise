'use client';
import GradientBackgroundBlob from '@/components/atoms/GradientBackground/GradientBackground';
import AuthCard from '@/components/organisms/AuthCard/AuthCard';
import React from 'react';

export default function Authentication() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
      {/* Animated Background Blobs */}
      <GradientBackgroundBlob className="top-20 left-20 h-32 w-32 bg-cyan-500/20" />
      <GradientBackgroundBlob className="right-20 bottom-32 h-48 w-48 animate-pulse bg-green-500/10 blur-2xl delay-700" />
      <GradientBackgroundBlob className="top-1/2 left-1/4 h-24 w-24 animate-pulse bg-pink-500/15 blur-xl delay-1000" />

      {/* Auth Card */}
      <div className="relative z-10">
        <AuthCard />
      </div>
    </div>
  );
}
