import { ReactNode } from 'react';
import Navbar from '@/components/organisms/Navbar';
import Sidebar from '@/components/organisms/Sidebar';

export default function PageTemplate({ children, navTitle, navSubtitle }: { children: ReactNode, navTitle: string, navSubtitle?: string }) {
  return (
    <div className="bg-card flex min-h-screen flex-col">
      {/* Top navbar fixed at the top */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Navbar title={navTitle} subtitle={navSubtitle}/>
      </div>

      {/* Main content container with sidebar and content */}
      <div className="flex min-h-screen">
        {/* Sidebar - fixed position */}
        <aside className="flex-shrink-0">
          <Sidebar />
        </aside>

        {/* Main content area - takes remaining width with proper top spacing */}
        <main className="ml-64 flex-1 transition-all duration-200 pt-25">
          <div className="h-full p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
