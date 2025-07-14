"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useRefreshToken from '@/hooks/useRefreshToken';
import { useAuth } from '@/context/AuthContext';

const publicPaths = ['/', '/authentication']; // Add any public paths here

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("REDIRECTOR TRIGGERED");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("isInitialized:", isInitialized);
    if (isInitialized) {
      if (isAuthenticated) {
        // if user is authenticated and trying to access a public page
        if (publicPaths.includes(pathname)) {
          // redirect to dashboard page
          router.push('/dashboard');
        }
      } else {
        // if user is trying to access a protected (non-public) page
        if (!publicPaths.includes(pathname)) {
          // redirect to authentication page
          router.push('/authentication');
          // TODO: add a modal or notification to inform the user they need to log in
        }
      }
    }
  }, [isAuthenticated, isInitialized, pathname, router]);

  // Show loading state or children based on authentication status
  if (!isInitialized || (isAuthenticated && publicPaths.includes(pathname))) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return <>{children}</>;
};

export default AuthInitializer;
