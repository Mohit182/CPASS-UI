import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import { LoginPage } from '@/features/auth/LoginPage';
import { Placeholder } from '@/features/Placeholder';

/** Routes still pending a real screen: path → [title, subtitle]. */
const pending: Record<string, [string, string?]> = {
  '/dashboard': ['Bulk SMS', 'Growtele CPaaS · DLT compliant messaging.'],
  '/send': ['Send Now', 'Choose a message mode, verify DLT mapping, then send or schedule.'],
  '/send/campaign': ['Campaign SMS'],
  '/send/unicode': ['Unicode SMS'],
  '/send/dynamic': ['Dynamic SMS'],
  '/send/multi-dynamic': ['Multi Dynamic SMS'],
  '/campaigns': ['Campaign', 'Choose a message mode, verify DLT mapping, then send or schedule.'],
  '/user-control/companies': ['User Control', 'Companies'],
  '/user-control/companies/new': ['Company Details'],
  '/user-control/users': ['User Control', 'Users'],
  '/user-control/users/new': ['User Details'],
  '/credits': ['Credits', 'Balance and ledger.'],
  '/reports/summary': ['Summary Report'],
  '/reports/summary/overview': ['Summary Report', 'Overview'],
  '/reports/summary/header': ['Summary Report', 'Header wise'],
  '/reports/summary/template': ['Summary Report', 'Template wise'],
  '/reports/summary/campaign': ['Summary Report', 'Campaign wise'],
  '/reports/detail': ['Detail Report'],
  '/reports/detail/search': ['Detail Report', 'Message search'],
  '/reports/detail/mis': ['Detail Report', 'MIS'],
  '/reports/detail/clicker': ['Clicker Report', 'Summary'],
  '/reports/detail/clicker/details': ['Clicker Report', 'Details'],
  '/reports/detail/clicker/data': ['Clicker Report', 'Data'],
  '/operator-analytics/company': ['Operator Analytics', 'Company summary'],
  '/operator-analytics/user': ['Operator Analytics', 'User summary'],
  '/dlt': ['DLT Management'],
  '/dlt/entity-ids': ['DLT Management', 'Entity IDs'],
  '/dlt/sender-ids': ['DLT Management', 'Sender IDs'],
  '/dlt/templates': ['DLT Management', 'Templates'],
  '/dlt/bulk-upload': ['DLT Management', 'Bulk upload'],
  '/dlt/urls': ['DLT Management', 'Short URLs'],
  '/api-management': ['API Management'],
  '/contacts/groups': ['Contact Management', 'Groups'],
  '/contacts/contacts': ['Contact Management', 'Contacts'],
  '/notifications': ['Notifications'],
  '/schedule': ['Schedule Manager'],
  '/archive/view': ['Archive', 'View archive'],
  '/archive/download': ['Archive', 'Download archive'],
  '/download/data': ['Download', 'Download data'],
  '/download/dynamic': ['Download', 'Dynamic report'],
};

const pendingRoutes: RouteObject[] = Object.entries(pending).map(([path, [title, subtitle]]) => ({
  path,
  element: <Placeholder title={title} subtitle={subtitle} />,
}));

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      ...pendingRoutes,
      { path: '*', element: <Placeholder title="Not found" subtitle="This page does not exist." /> },
    ],
  },
]);
