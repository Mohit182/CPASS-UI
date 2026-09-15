import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import { LoginPage } from '@/features/auth/LoginPage';
import { NotFoundPage } from '@/features/NotFoundPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { SendPickerPage } from '@/features/send/SendPickerPage';
import { ComposePage } from '@/features/send/ComposePage';
import { CampaignsPage } from '@/features/campaigns/CampaignsPage';
import { CompaniesPage, CompanyFormPage, UserFormPage, UsersPage } from '@/features/user-control/UserControlPages';
import { CreditsPage } from '@/features/credits/CreditsPage';
import { CampaignSummaryPage, HeaderSummaryPage, OverviewSummaryPage, SummaryPickerPage, TemplateSummaryPage } from '@/features/reports/SummaryPages';
import { ClickerDataPage, ClickerDetailsPage, ClickerSummaryPage, DetailPickerPage, MisReportPage, SearchReportPage } from '@/features/reports/DetailPages';
import { CompanySummaryPage, UserSummaryPage } from '@/features/operator-analytics/OperatorPages';
import { BulkUploadPage, DltPickerPage, EntityIdsPage, SenderIdsPage, TemplatesPage, UrlsPage } from '@/features/dlt/DltPages';
import { ApiManagementPage } from '@/features/api-management/ApiManagementPage';
import { ContactsPage, GroupsPage } from '@/features/contacts/ContactPages';
import { NotificationsPage } from '@/features/notifications/NotificationsPage';
import { SchedulePage } from '@/features/schedule/SchedulePage';
import { DownloadArchivePage, ViewArchivePage } from '@/features/archive/ArchivePages';
import { DownloadDataPage, DynamicReportPage } from '@/features/download/DownloadPages';

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

      { path: '/credits', element: <CreditsPage /> },

      { path: '/reports/summary', element: <SummaryPickerPage /> },
      { path: '/reports/summary/overview', element: <OverviewSummaryPage /> },
      { path: '/reports/summary/header', element: <HeaderSummaryPage /> },
      { path: '/reports/summary/template', element: <TemplateSummaryPage /> },
      { path: '/reports/summary/campaign', element: <CampaignSummaryPage /> },
      { path: '/reports/detail', element: <DetailPickerPage /> },
      { path: '/reports/detail/search', element: <SearchReportPage /> },
      { path: '/reports/detail/mis', element: <MisReportPage /> },
      { path: '/reports/detail/clicker', element: <ClickerSummaryPage /> },
      { path: '/reports/detail/clicker/details', element: <ClickerDetailsPage /> },
      { path: '/reports/detail/clicker/data', element: <ClickerDataPage /> },

      { path: '/operator-analytics/company', element: <CompanySummaryPage /> },
      { path: '/operator-analytics/user', element: <UserSummaryPage /> },

      { path: '/dlt', element: <DltPickerPage /> },
      { path: '/dlt/entity-ids', element: <EntityIdsPage /> },
      { path: '/dlt/sender-ids', element: <SenderIdsPage /> },
      { path: '/dlt/templates', element: <TemplatesPage /> },
      { path: '/dlt/bulk-upload', element: <BulkUploadPage /> },
      { path: '/dlt/urls', element: <UrlsPage /> },

      { path: '/api-management', element: <ApiManagementPage /> },

      { path: '/contacts/groups', element: <GroupsPage /> },
      { path: '/contacts/contacts', element: <ContactsPage /> },

      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/schedule', element: <SchedulePage /> },

      { path: '/archive/view', element: <ViewArchivePage /> },
      { path: '/archive/download', element: <DownloadArchivePage /> },

      { path: '/download/data', element: <DownloadDataPage /> },
      { path: '/download/dynamic', element: <DynamicReportPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
