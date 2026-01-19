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
    <div className="flex h-screen w-full overflow-hidden bg-[#F5F1E8]">
      {/* Main Sidebar */}
      <aside className={`flex flex-col border-r border-[#E8DFD0] bg-[#FDFCFA] shadow-sm transition-all duration-300 ${
        isCommunityPage ? 'w-20' : (sidebarOpen ? 'w-[200px]' : 'w-20')
      }`}>
        {/* Header */}
        <div className="flex h-20 items-center justify-center border-b border-[#E8DFD0] p-4">
          {!isCommunityPage && sidebarOpen ? (
            <Link href="/communities" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4A574]">
                <span className="text-lg font-bold text-white">K</span>
              </div>
              <span className="text-xl font-semibold text-[#3A3630]">Kyozo Pro</span>
            </Link>
          ) : (
            <Link href="/communities" className="flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4A574]">
                <span className="text-lg font-bold text-white">K</span>
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              // Communities item should be active when on /communities OR on any community page
              const isActive = item.href === '/communities' 
                ? (pathname.startsWith(item.href) || isCommunityPage)
                : pathname.startsWith(item.href);
              const showLabel = !isCommunityPage && sidebarOpen;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center ${showLabel ? 'gap-3' : 'justify-center'} rounded-xl px-3 py-2.5 text-base transition-all ${
                      isActive
                        ? 'bg-[#E8DFD0] text-[#3A3630] font-bold shadow-sm'
                        : 'text-[#6B6358] hover:bg-[#F5F1E8] font-medium'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {showLabel && <span className="flex-1 text-left">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer with User Info */}
        <div className="border-t border-[#E8DFD0] p-4">
          <div className={`flex items-center gap-3 ${(!isCommunityPage && sidebarOpen) ? '' : 'justify-center'}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A574] text-white shadow-md">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt="User" width={40} height={40} className="rounded-full" />
              ) : (
                <span className="text-sm font-semibold">{userFallback}</span>
              )}
            </div>
            {!isCommunityPage && sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-[#3A3630]">
                  {user?.displayName || user?.email}
                </p>
                <p className="truncate text-xs text-[#8B7355]">{user?.email}</p>
              </div>
            )}
          </div>
          {!isCommunityPage && sidebarOpen && (
            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#6B6358] transition-all hover:bg-[#F5F1E8]"
            >
              <LogOut className="h-4 w-4" />
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
