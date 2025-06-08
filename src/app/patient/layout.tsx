import type { ReactNode } from 'react';
import AppLayoutClient from '@/components/layout/AppLayoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patient Portal - Clinic Navigator',
};

export default function PatientLayout({ children }: { children: ReactNode }) {
  return <AppLayoutClient userRole="Patient">{children}</AppLayoutClient>;
}
