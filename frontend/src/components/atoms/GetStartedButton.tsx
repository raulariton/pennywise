'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const GetStartedButton = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/authentication');
  }, [router]);

  return (
    <section className="grid place-content-center py-4">
      <button
        onClick={() => router.push('/authentication')}
        className="group relative flex h-10 items-center rounded-full bg-black pr-4 pl-3 shadow-md shadow-cyan-300/50 transition-all duration-300 ease-in-out hover:bg-black hover:pl-10 hover:text-white hover:shadow-lg hover:shadow-cyan-500/50"
      >
        <span className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black p-1 text-sm opacity-0 transition-all duration-300 group-hover:bg-white group-hover:opacity-100">
          <FiArrowRight className="text-[0px] transition-all duration-300 group-hover:text-lg group-hover:text-black group-active:-rotate-45" />
        </span>
        <span>Get started</span>
      </button>
    </section>
  );
};

export default GetStartedButton;
