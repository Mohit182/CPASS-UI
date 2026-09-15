import {
  LayoutGrid, Mail, Send, Users, CircleDollarSign, BarChart3, FileText, Code2,
  BookUser, Bell, CalendarClock, Archive, Download, Type, type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Prefix used for active matching (defaults to `to`). */
  match?: string;
  children?: { label: string; to: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutGrid },
  { label: 'Send Now', to: '/send', icon: Mail },
  { label: 'Campaigns', to: '/campaigns', icon: Send },
  { label: 'User Control', to: '/user-control/companies', match: '/user-control', icon: Users },
  { label: 'Credits', to: '/credits', icon: CircleDollarSign },
  {
    label: 'Reports & Analytics',
    to: '/reports/summary',
    match: '/reports',
    icon: BarChart3,
    children: [
      { label: 'Detail Report', to: '/reports/detail' },
      { label: 'Summary Report', to: '/reports/summary' },
    ],
  },
  { label: 'Operator Analytics', to: '/operator-analytics/company', match: '/operator-analytics', icon: Type },
  { label: 'DLT Management', to: '/dlt', icon: FileText },
  { label: 'API Management', to: '/api-management', icon: Code2 },
  { label: 'Contact Management', to: '/contacts/groups', match: '/contacts', icon: BookUser },
  { label: 'Notifications', to: '/notifications', icon: Bell },
  { label: 'Schedule Manager', to: '/schedule', icon: CalendarClock },
  { label: 'Archive', to: '/archive/view', match: '/archive', icon: Archive },
  { label: 'Download', to: '/download/data', match: '/download', icon: Download },
];
