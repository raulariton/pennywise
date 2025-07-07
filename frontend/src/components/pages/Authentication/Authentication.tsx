"use client";
import GradientBackgroundBlob from "@/components/atoms/GradientBackground/GradientBackground";
import AuthCard from "@/components/organisms/AuthCard/AuthCard";
import React from "react";
export default function Authentication() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <GradientBackgroundBlob className="top-20 left-20 w-32 h-32 bg-cyan-500/20" />
      <GradientBackgroundBlob className="bottom-32 right-20 w-48 h-48 bg-green-500/10 blur-2xl animate-pulse delay-700" />
      <GradientBackgroundBlob className="top-1/2 left-1/4 w-24 h-24 bg-pink-500/15 blur-xl animate-pulse delay-1000" />

      {/* Auth Card */}
      <div className="relative z-10">
        <AuthCard />
      </div>
    </div>
  );
}
