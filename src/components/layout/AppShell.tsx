import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/providers';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-surface-page">
      <Topbar />
      <div className="flex items-stretch gap-6 px-4 pb-6 pt-4">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
