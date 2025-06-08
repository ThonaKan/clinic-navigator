import type { ReactNode } from 'react';
import AppLayoutClient from '@/components/layout/AppLayoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctor Dashboard - Clinic Navigator',
};

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return <AppLayoutClient userRole="Doctor">{children}</AppLayoutClient>;
}
