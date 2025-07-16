'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LogoLoader from '@/components/organisms/LogoLoader';
import { useToast } from '@/hooks/useToast';

const publicPaths = ['/', '/authentication']; // Add any public paths here

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  useEffect(() => {
    // this runs everytime the user navigates to a new page
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
          toast.warning('You need to be logged in to access this page.');
        }
      }
    }
  }, [isInitialized, pathname, router]);
  // NOTE: potential issues because `isAuthenticated` is not included in the dependency array
  //  however if i include it, on logout, the user is redirected to the authentication page,
  //  when they should be redirected to the home (landing) page instead

  // Show loading state or children based on authentication status
  if (!isInitialized || (isAuthenticated && publicPaths.includes(pathname))) {
    return <LogoLoader />;
  }

  return <>{children}</>;
};

export default AuthInitializer;
