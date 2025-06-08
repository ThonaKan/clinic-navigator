import type { ReactNode } from 'react';
import AppLayoutClient from '@/components/layout/AppLayoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Clinic Navigator',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AppLayoutClient userRole="Admin">{children}</AppLayoutClient>;
}
