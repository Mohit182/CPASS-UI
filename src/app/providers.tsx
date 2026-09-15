import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface LayoutState {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  toggle: () => void;
}

const LayoutContext = createContext<LayoutState | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 1280);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 1280) setCollapsed(true);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggle = useCallback(() => setCollapsed((c) => !c), []);
  const value = useMemo(() => ({ collapsed, setCollapsed, toggle }), [collapsed, toggle]);
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider');
  return ctx;
}

/** Pages with wide tables call this to default the sidebar to collapsed. */
export function useCollapsedSidebar() {
  const { setCollapsed } = useLayout();
  useEffect(() => {
    setCollapsed(true);
  }, [setCollapsed]);
}

// ---- Auth (mock) ----
interface AuthState {
  user: { name: string; role: string; email: string } | null;
  signIn: (email: string) => void;
  signOut: () => void;
}
const AuthContext = createContext<AuthState | null>(null);
const AUTH_KEY = 'growtele.auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState['user']>(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const signIn = useCallback((email: string) => {
    const u = { name: 'Rohan Sharma', role: 'Founder & Head- Operations', email };
    setUser(u);
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(u)); } catch { /* ignore */ }
  }, []);
  const signOut = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem(AUTH_KEY); } catch { /* ignore */ }
  }, []);
  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </AuthProvider>
  );
}
