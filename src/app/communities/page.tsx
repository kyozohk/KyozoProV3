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
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Communities</h1>
            <p className="mt-2 text-muted-foreground">
              Manage and access all your communities in one place
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-5 w-5" />
            Create Community
          </button>
        </div>

        {communities.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-12 text-center">
            <Users className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">No communities yet</h3>
            <p className="mb-6 text-muted-foreground">
              Create your first community to start managing members and events
            </p>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
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
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {community.communityProfileImage ? (
                      <Image
                        src={community.communityProfileImage}
                        alt={community.name}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {community.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">@{community.handle}</p>
                    </div>
                  </div>
                </div>

                {community.description && (
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {community.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{community.memberCount || 0} members</span>
                  </div>
                </div>

                {community.ownerId === user?.uid && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Owner
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
