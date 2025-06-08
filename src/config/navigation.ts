import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Settings,
  Building,
  CreditCard,
  Stethoscope,
  FileText,
  Activity,
  ClipboardList,
  UserPlus,
  CalendarDays,
  Receipt,
  DollarSign,
  UserCircle,
  BookOpen
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: NavItem[];
}

export interface RoleNavigation {
  [role: string]: NavItem[];
}

export const roleNavigations: RoleNavigation = {
  Admin: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/clinics', label: 'Clinics', icon: Building },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { href: '/admin/settings', label: 'System Settings', icon: Settings },
  ],
  Doctor: [
    { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/doctor/patients', label: 'Patient Records', icon: Users },
    // Consultation form will be accessed via patient record or dashboard, not a direct nav item
    // { href: '/doctor/visits', label: 'Consultations', icon: Stethoscope }, 
    { href: '/doctor/prescriptions', label: 'Prescriptions', icon: FileText },
    { href: '/doctor/reports', label: 'Reports', icon: BookOpen },
  ],
  Nurse: [
    { href: '/nurse/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/nurse/patients', label: 'Patients', icon: Users },
    { href: '/nurse/labs', label: 'Lab Results', icon: Activity },
  ],
  Receptionist: [
    { href: '/receptionist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/receptionist/patients', label: 'Patient Registration', icon: UserPlus },
    { href: '/receptionist/appointments', label: 'Appointments', icon: CalendarDays },
  ],
  Cashier: [
    { href: '/cashier/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/cashier/invoices', label: 'Invoices', icon: Receipt },
    { href: '/cashier/payments', label: 'Payments', icon: DollarSign },
  ],
  Patient: [
    { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/patient/appointments', label: 'My Appointments', icon: CalendarDays },
    { href: '/patient/records', label: 'My Records', icon: ClipboardList },
    { href: '/patient/settings', label: 'Profile Settings', icon: UserCircle },
  ],
};

export const publicNavItems: NavItem[] = [
  { href: '/login', label: 'Login', icon: LayoutDashboard }, // Icon might not be needed for public
  { href: '/register', label: 'Register', icon: UserPlus },
  { href: '/terms', label: 'Terms &amp; Privacy', icon: FileText},
];

// Helper to get navigation items for a specific role
export const getNavItemsForRole = (role: string): NavItem[] => {
  return roleNavigations[role] || [];
};
