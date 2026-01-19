'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Community } from '@/types/community';
import { subscribeToOwnedCommunities, getMemberCommunities } from '@/lib/community-utils';
import { Users, Plus } from 'lucide-react';
import Image from 'next/image';

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Subscribe to owned communities (real-time)
    const unsubscribeOwned = subscribeToOwnedCommunities(user.uid, async (ownedCommunities) => {
      try {
        console.log('✅ [Communities Page] - Owned communities count:', ownedCommunities.length);

        // Fetch member communities (excluding owned ones)
        const ownedIds = ownedCommunities.map(c => c.communityId);
        const memberCommunities = await getMemberCommunities(user.uid, ownedIds);
        console.log('✅ [Communities Page] - Member communities count:', memberCommunities.length);

        // Combine and deduplicate
        const allCommunities = [...ownedCommunities, ...memberCommunities];
        const uniqueCommunities = Array.from(
          new Map(allCommunities.map(item => [item.communityId, item])).values()
        );

        setCommunities(uniqueCommunities);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching communities:', error);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribeOwned();
  }, [user]);

  const handleCommunityClick = (handle: string) => {
    router.push(`/${handle}/feed`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F5F1E8] overflow-y-auto">
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#3A3630] mb-2">Your Communities</h1>
                <p className="text-[#6B6358]">
                  Manage and access all your communities in one place
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-[#4A5568] px-6 py-3 font-semibold text-white hover:bg-[#3A4558] transition-all shadow-sm hover:shadow-md">
                <Plus className="h-5 w-5" />
                Create Community
              </button>
            </div>
          </div>

          {/* Communities Grid */}
          {communities.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D8CFC0] bg-white p-16 text-center shadow-sm">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E8DFD0]">
                <Users className="h-10 w-10 text-[#8B7355]" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[#3A3630]">No communities yet</h3>
              <p className="mb-8 text-[#6B6358] max-w-md">
                Create your first community to start managing members and events
              </p>
              <button className="flex items-center gap-2 rounded-xl bg-[#4A5568] px-8 py-3 font-semibold text-white hover:bg-[#3A4558] transition-all shadow-sm hover:shadow-md">
                <Plus className="h-5 w-5" />
                Create Your First Community
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {communities.map((community) => (
                <button
                  key={community.communityId}
                  onClick={() => handleCommunityClick(community.handle)}
                  className="group relative overflow-hidden rounded-2xl border-2 border-[#E8DFD0] bg-white p-6 text-left transition-all hover:border-[#D4A574] hover:shadow-xl"
                >
                  {/* Owner Badge */}
                  {community.ownerId === user?.uid && (
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-[#D4A574]/20 px-3 py-1 text-xs font-semibold text-[#8B7355]">
                        Owner
                      </span>
                    </div>
                  )}

                  {/* Community Header */}
                  <div className="mb-4 flex items-center gap-4">
                    {community.communityProfileImage ? (
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                          src={community.communityProfileImage}
                          alt={community.name}
                          width={64}
                          height={64}
                          className="rounded-xl object-cover ring-2 ring-[#E8DFD0]"
                        />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-[#E8DFD0] ring-2 ring-[#D8CFC0]">
                        <Users className="h-8 w-8 text-[#8B7355]" />
                      </div>
                    )}
                    <div className="flex-1 overflow-hidden">
                      <h3 className="font-bold text-[#3A3630] group-hover:text-[#D4A574] transition-colors truncate">
                        {community.name}
                      </h3>
                      <p className="text-sm text-[#8B7355] truncate">@{community.handle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  {community.description && (
                    <p className="mb-4 line-clamp-2 text-sm text-[#6B6358] leading-relaxed">
                      {community.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-2 rounded-lg bg-[#F5F1E8] px-3 py-2">
                    <Users className="h-4 w-4 text-[#8B7355]" />
                    <span className="text-sm font-medium text-[#6B6358]">
                      {community.memberCount || 0} {community.memberCount === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
