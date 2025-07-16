'use client';
import React from 'react';
import Image from 'next/image';
import { BarLoader } from 'react-spinners';
import Logo from '@/components/atoms/Logo';

export default function LogoLoader() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <Logo size={'md'} glow={true} />
      <div className="w-full max-w-md">
        <BarLoader color="#00bcd4" width="100%" height={4} className="mx-auto" />
      </div>
    </div>
  );
}
