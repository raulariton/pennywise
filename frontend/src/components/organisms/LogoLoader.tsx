import React from 'react';
import Image from 'next/image';
import { BarLoader } from 'react-spinners';

export default function LogoLoader() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="">
        <Image
          src="full-logo-white.svg"
          alt="Logo"
          width={200}
          height={50}
          className="h-20 w-auto animate-pulse drop-shadow-[0_0_10px_#06b6d4] filter"
        />
      </div>
      <div className="w-full max-w-md">
        <BarLoader color="#00bcd4" width="100%" height={4} className="mx-auto" />
      </div>
    </div>
  );
}
