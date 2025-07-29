'use client';
import React from 'react';
import Image from 'next/image';
import { BarLoader } from 'react-spinners';
import Logo from '@/components/atoms/Logo';

export default function LogoLoader() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <Logo size={'md'} mini={true} spin={true}/>
    </div>
  );
}
