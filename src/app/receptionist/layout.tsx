import type { ReactNode } from 'react';
import AppLayoutClient from '@/components/layout/AppLayoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Receptionist Dashboard - Clinic Navigator',
};

export default function ReceptionistLayout({ children }: { children: ReactNode }) {
  return <AppLayoutClient userRole="Receptionist">{children}</AppLayoutClient>;
}
