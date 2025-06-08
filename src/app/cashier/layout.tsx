import type { ReactNode } from 'react';
import AppLayoutClient from '@/components/layout/AppLayoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cashier Dashboard - Clinic Navigator',
};

export default function CashierLayout({ children }: { children: ReactNode }) {
  return <AppLayoutClient userRole="Cashier">{children}</AppLayoutClient>;
}
