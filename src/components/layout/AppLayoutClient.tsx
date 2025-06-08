"use client";

import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

interface AppLayoutClientProps {
  children: ReactNode;
  userRole: string;
}

export default function AppLayoutClient({ children, userRole }: AppLayoutClientProps) {
  // defaultOpen can be true for desktop, false for mobile initially if desired.
  // The sidebar component itself handles mobile behavior with Sheet.
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar userRole={userRole} />
      <SidebarInset className="flex flex-col">
        <AppHeader userRole={userRole} />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
