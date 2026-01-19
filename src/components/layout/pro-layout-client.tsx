'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { CommunitySidebar } from './community-sidebar';
import { 
  Users, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut,
  Menu
} from 'lucide-react';

interface ProLayoutClientProps {
  children: React.ReactNode;
}

const mainNavItems = [
  { href: '/communities', label: 'Communities', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function ProLayoutClient({ children }: ProLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  // Determine if we're on a community-specific page
  const isCommunityPage = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.length >= 1 &&
      segments[0] !== 'communities' &&
      segments[0] !== 'analytics' &&
      segments[0] !== 'subscription' &&
      segments[0] !== 'settings' &&
      segments[0] !== 'account';
  }, [pathname]);

  const handleLogout = async () => {
    await signOut();
  };

  const userFallback = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.email?.[0].toUpperCase() || 'U';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Main Sidebar */}
      <aside className={`flex flex-col border-r border-border bg-card transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Header */}
        <div className="flex h-20 items-center justify-center border-b border-border p-4">
          {sidebarOpen ? (
            <Link href="/communities" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">K</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Kyozo Pro</span>
            </Link>
          ) : (
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-muted">
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer with User Info */}
        <div className="border-t border-border p-4">
          <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt="User" width={40} height={40} className="rounded-full" />
              ) : (
                <span className="text-sm font-semibold">{userFallback}</span>
              )}
            </div>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">
                  {user?.displayName || user?.email}
                </p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Log Out</span>
            </button>
          )}
        </div>
      </aside>

      {/* Community Sidebar (only on community pages) */}
      {isCommunityPage && <CommunitySidebar />}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
