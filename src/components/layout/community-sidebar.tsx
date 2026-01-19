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
  Send,
  Info,
} from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/app/components/ui/tooltip';

const communityNavItems = [
  { 
    href: (handle: string) => `/${handle}/feed`, 
    label: 'Feed', 
    icon: Radio,
    color: '#9B6B9E',
    tooltip: 'Share content and updates with your community. Post text, audio, images, and video that your members can engage with.'
  },
  { 
    href: (handle: string) => `/${handle}/members`, 
    label: 'Members', 
    icon: Users,
    color: '#8BA888',
    tooltip: 'Manage your community members, view their profiles, and organize contacts.'
  },
  { 
    href: (handle: string) => `/${handle}/broadcast`, 
    label: 'Broadcast', 
    icon: Send,
    color: '#E87461',
    tooltip: 'Send announcements and content to your community members via email, WhatsApp, or in-app messaging.'
  },
  { 
    href: (handle: string) => `/${handle}/inbox`, 
    label: 'Inbox', 
    icon: Inbox,
    color: '#6B9BB5',
    tooltip: 'Communicate directly with your community members and manage conversations.'
  },
  { 
    href: (handle: string) => `/${handle}/settings`, 
    label: 'Settings', 
    icon: Settings,
    color: '#8B7355',
    tooltip: 'Configure your community settings and preferences.'
  },
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
      <aside className="w-[200px] border-r border-[#E8DFD0] bg-[#FDFCFA] shadow-sm">
        <div className="flex h-full items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#D4A574] border-t-transparent" />
        </div>
      </aside>
    );
  }

  if (!selectedCommunity) {
    return null;
  }

  return (
    <aside className="relative w-[200px] border-r border-[#E8DFD0] bg-[#FDFCFA] shadow-sm">
      {/* Community List View */}
      {showCommunityList ? (
        <div className="flex h-full flex-col">
          {/* Header with Create Button */}
          <div className="flex h-20 items-center justify-between border-b border-[#E8DFD0] px-4">
            <h2 className="text-lg font-semibold text-[#3A3630]">Communities</h2>
            <button className="rounded-lg p-2 hover:bg-[#F5F1E8] transition-colors">
              <PlusCircle className="h-5 w-5 text-[#D4A574]" />
            </button>
          </div>

          {/* Communities List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {communities.map((community) => (
                <button
                  key={community.communityId}
                  onClick={() => handleCommunitySelect(community.handle)}
                  className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-all ${
                    community.handle === selectedCommunityHandle
                      ? 'bg-[#E8DFD0] shadow-sm'
                      : 'hover:bg-[#F5F1E8]'
                  }`}
                >
                  {community.communityProfileImage ? (
                    <Image
                      src={community.communityProfileImage}
                      alt={community.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover ring-2 ring-[#E8DFD0]"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8DFD0]">
                      <Users className="h-5 w-5 text-[#8B7355]" />
                    </div>
                  )}
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-semibold text-sm text-[#3A3630]">{community.name}</p>
                    <p className="truncate text-xs text-[#8B7355]">
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
            className="flex h-20 items-center gap-3 border-b border-[#E8DFD0] px-4 hover:bg-[#F5F1E8] transition-colors"
          >
            {selectedCommunity.communityProfileImage ? (
              <Image
                src={selectedCommunity.communityProfileImage}
                alt={selectedCommunity.name}
                width={48}
                height={48}
                className="rounded-lg object-cover ring-2 ring-[#D4A574]/30"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E8DFD0]">
                <Users className="h-6 w-6 text-[#8B7355]" />
              </div>
            )}
            <div className="flex-1 overflow-hidden text-left">
              <p className="truncate font-semibold text-[#3A3630]">{selectedCommunity.name}</p>
              <p className="truncate text-sm text-[#8B7355]">
                {selectedCommunity.memberCount || 0} members
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-[#8B7355]" />
          </button>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {communityNavItems.map((item) => {
                const Icon = item.icon;
                const itemPath = item.href(selectedCommunity.handle);
                const isActive = pathname === itemPath;
                return (
                  <li key={item.label}>
                    <Link
                      href={itemPath}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-base transition-all ${
                        isActive
                          ? 'bg-[#E8DFD0] text-[#3A3630] font-bold shadow-sm'
                          : 'text-[#6B6358] hover:bg-[#F5F1E8] font-medium'
                      }`}
                    >
                      <Icon 
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: isActive ? item.color : undefined }}
                      />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.tooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className="flex-shrink-0"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Info className="w-3.5 h-3.5 text-[#8B7355] hover:text-[#D4A574] transition-colors" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="right" 
                            sideOffset={8}
                            className="max-w-[280px] bg-[#3A3630] text-[#F5F1E8] border-2 border-[#8B7355] shadow-xl"
                          >
                            <p className="text-xs leading-relaxed">{item.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
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
