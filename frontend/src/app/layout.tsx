import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import AuthInitializer from '@/components/utils/AuthInitializer/AuthInitializer';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Personal Expense Manager',
  description: 'A simple personal expense manager to track your expenses and income.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthInitializer>
            {children}
            <Toaster
              position="top-center"
              style={{
                fontFamily: 'var(--font-geist-sans)',
              }}
            />
          </AuthInitializer>
        </AuthProvider>
      </body>
    </html>
  );
}
