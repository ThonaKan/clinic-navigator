import type { ReactNode } from 'react';
import AppLayoutClient from '@/components/layout/AppLayoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nurse Dashboard - Clinic Navigator',
};

export default function NurseLayout({ children }: { children: ReactNode }) {
  return <AppLayoutClient userRole="Nurse">{children}</AppLayoutClient>;
}
