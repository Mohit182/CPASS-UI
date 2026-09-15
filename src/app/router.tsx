import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import { LoginPage } from '@/features/auth/LoginPage';
import { Placeholder } from '@/features/Placeholder';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { SendPickerPage } from '@/features/send/SendPickerPage';
import { ComposePage } from '@/features/send/ComposePage';
import { CampaignsPage } from '@/features/campaigns/CampaignsPage';
import { CompaniesPage, CompanyFormPage, UserFormPage, UsersPage } from '@/features/user-control/UserControlPages';
import { BulkUploadPage, DltPickerPage, EntityIdsPage, SenderIdsPage, TemplatesPage, UrlsPage } from '@/features/dlt/DltPages';
import { ApiManagementPage } from '@/features/api-management/ApiManagementPage';
import { ContactsPage, GroupsPage } from '@/features/contacts/ContactPages';
import { SchedulePage } from '@/features/schedule/SchedulePage';
import { DownloadArchivePage, ViewArchivePage } from '@/features/archive/ArchivePages';
import { DownloadDataPage, DynamicReportPage } from '@/features/download/DownloadPages';

/** Routes still pending a real screen: path → [title, subtitle]. */
const pending: Record<string, [string, string?]> = {
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
  '/notifications': ['Notifications'],
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
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/send', element: <SendPickerPage /> },
      { path: '/send/campaign', element: <ComposePage mode="campaign" /> },
      { path: '/send/unicode', element: <ComposePage mode="unicode" /> },
      { path: '/send/dynamic', element: <ComposePage mode="dynamic" /> },
      { path: '/send/multi-dynamic', element: <ComposePage mode="multi-dynamic" /> },
      { path: '/campaigns', element: <CampaignsPage /> },
      { path: '/user-control/companies', element: <CompaniesPage /> },
      { path: '/user-control/companies/new', element: <CompanyFormPage /> },
      { path: '/user-control/users', element: <UsersPage /> },
      { path: '/user-control/users/new', element: <UserFormPage /> },
      { path: '/dlt', element: <DltPickerPage /> },
      { path: '/dlt/entity-ids', element: <EntityIdsPage /> },
      { path: '/dlt/sender-ids', element: <SenderIdsPage /> },
      { path: '/dlt/templates', element: <TemplatesPage /> },
      { path: '/dlt/bulk-upload', element: <BulkUploadPage /> },
      { path: '/dlt/urls', element: <UrlsPage /> },
      { path: '/api-management', element: <ApiManagementPage /> },
      { path: '/contacts/groups', element: <GroupsPage /> },
      { path: '/contacts/contacts', element: <ContactsPage /> },
      { path: '/schedule', element: <SchedulePage /> },
      { path: '/archive/view', element: <ViewArchivePage /> },
      { path: '/archive/download', element: <DownloadArchivePage /> },
      { path: '/download/data', element: <DownloadDataPage /> },
      { path: '/download/dynamic', element: <DynamicReportPage /> },
      ...pendingRoutes,
      { path: '*', element: <Placeholder title="Not found" subtitle="This page does not exist." /> },
    ],
  },
]);
