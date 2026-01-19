'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { Community } from '@/types/community';
import { subscribeToOwnedCommunities, getMemberCommunities } from '@/lib/community-utils';
import {
  Users,
  Radio,
  Inbox,
  Settings,
  ChevronDown,
  PlusCircle,
} from 'lucide-react';

const communityNavItems = [
  { href: (handle: string) => `/${handle}/feed`, label: 'Feed', icon: Radio },
  { href: (handle: string) => `/${handle}/members`, label: 'Members', icon: Users },
  { href: (handle: string) => `/${handle}/broadcast`, label: 'Broadcast', icon: Radio },
  { href: (handle: string) => `/${handle}/inbox`, label: 'Inbox', icon: Inbox },
  { href: (handle: string) => `/${handle}/settings`, label: 'Settings', icon: Settings },
];

export function CommunitySidebar() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunityHandle, setSelectedCommunityHandle] = useState<string | null>(null);
  const [showCommunityList, setShowCommunityList] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Extract handle from pathname: /[handle]/... -> handle is at index 1
    const pathParts = pathname.split('/');
    const handleFromPath = pathParts[1];

    setLoading(true);

    // Subscribe to owned communities (real-time)
    const unsubscribeOwned = subscribeToOwnedCommunities(user.uid, async (ownedCommunities) => {
      // Fetch member communities (excluding owned ones)
      const ownedIds = ownedCommunities.map(c => c.communityId);
      const memberCommunities = await getMemberCommunities(user.uid, ownedIds);

      // Combine owned and member communities
      const allCommunities = [...ownedCommunities, ...memberCommunities];
      setCommunities(allCommunities);

      const currentCommunity = allCommunities.find(c => c.handle === handleFromPath);
      if (currentCommunity) {
        setSelectedCommunityHandle(currentCommunity.handle);
      } else if (allCommunities.length > 0 && handleFromPath) {
        const communityExists = allCommunities.some(c => c.handle === handleFromPath);
        setSelectedCommunityHandle(communityExists ? handleFromPath : allCommunities[0]?.handle);
      } else {
        setSelectedCommunityHandle(null);
      }

      setLoading(false);
    });

    return () => unsubscribeOwned();
  }, [user, pathname]);

  const selectedCommunity = communities.find(c => c.handle === selectedCommunityHandle);

  const handleCommunitySelect = (handle: string) => {
    setSelectedCommunityHandle(handle);
    setShowCommunityList(false);
    const currentSubPath = pathname.split('/').slice(2).join('/');
    const targetItem = communityNavItems.find(item =>
      item.href(handle).endsWith(currentSubPath)
    ) || communityNavItems[0];
    router.push(targetItem.href(handle));
  };

  if (loading) {
    return (
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex h-full items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </aside>
    );
  }

  if (!selectedCommunity) {
    return null;
  }

  return (
    <aside className="relative w-64 border-r border-border bg-card">
      {/* Community List View */}
      {showCommunityList ? (
        <div className="flex h-full flex-col">
          {/* Header with Create Button */}
          <div className="flex h-20 items-center justify-between border-b border-border px-4">
            <h2 className="text-lg font-semibold text-foreground">Communities</h2>
            <button className="rounded-lg p-2 hover:bg-muted">
              <PlusCircle className="h-5 w-5 text-primary" />
            </button>
          </div>

          {/* Communities List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {communities.map((community) => (
                <button
                  key={community.communityId}
                  onClick={() => handleCommunitySelect(community.handle)}
                  className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                    community.handle === selectedCommunityHandle
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  {community.communityProfileImage ? (
                    <Image
                      src={community.communityProfileImage}
                      alt={community.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium text-foreground">{community.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {community.memberCount || 0} members
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Navigation View */
        <div className="flex h-full flex-col">
          {/* Selected Community Header */}
          <button
            onClick={() => setShowCommunityList(true)}
            className="flex h-20 items-center gap-3 border-b border-border px-4 hover:bg-muted transition-colors"
          >
            {selectedCommunity.communityProfileImage ? (
              <Image
                src={selectedCommunity.communityProfileImage}
                alt={selectedCommunity.name}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            )}
            <div className="flex-1 overflow-hidden text-left">
              <p className="truncate font-semibold text-foreground">{selectedCommunity.name}</p>
              <p className="truncate text-sm text-muted-foreground">
                {selectedCommunity.memberCount || 0} members
              </p>
            </div>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {communityNavItems.map((item) => {
                const Icon = item.icon;
                const itemPath = item.href(selectedCommunity.handle);
                const isActive = pathname === itemPath;
                return (
                  <li key={item.label}>
                    <Link
                      href={itemPath}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </aside>
  );
}
