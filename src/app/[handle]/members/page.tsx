'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useDebounce } from '@/hooks/use-debounce';
import { Community, CommunityMember, CommunityTag, MemberRole } from '@/types/community';
import {
  getCommunityByHandle,
  getUserRoleInCommunity,
  getCommunityMembers,
  getCommunityTags,
} from '@/lib/community-utils';
import { Search, UserPlus, Filter } from 'lucide-react';
import Image from 'next/image';

export default function MembersPage() {
  const params = useParams();
  const handle = params.handle as string;
  const { user } = useAuth();

  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [community, setCommunity] = useState<Community | null>(null);
  const [userRole, setUserRole] = useState<MemberRole | null>(null);
  const [availableTags, setAvailableTags] = useState<CommunityTag[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch community data and user role
  useEffect(() => {
    async function fetchCommunityAndRole() {
      if (!handle) return;

      try {
        const communityData = await getCommunityByHandle(handle);

        if (communityData) {
          setCommunity(communityData);

          if (user) {
            const role = await getUserRoleInCommunity(user.uid, communityData.communityId);
            setUserRole(role);
          }

          // Fetch available tags for this community
          const tags = await getCommunityTags(communityData.communityId);
          setAvailableTags(tags);
        }
      } catch (error) {
        console.error('Error fetching community data:', error);
      }
    }

    fetchCommunityAndRole();
  }, [handle, user]);

  // Fetch members with search
  useEffect(() => {
    if (!community?.communityId) {
      setLoading(false);
      return;
    }

    async function fetchMembers() {
      setLoading(true);
      try {
        const membersData = await getCommunityMembers(
          community!.communityId,
          { type: 'name', value: debouncedSearchTerm }
        );
        console.log('✅ [Members Page] - Fetched members data:', membersData);
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [community?.communityId, debouncedSearchTerm]);

  const getRoleBadgeColor = (role: MemberRole) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-700';
      case 'admin':
        return 'bg-blue-100 text-blue-700';
      case 'member':
        return 'bg-green-100 text-green-700';
      case 'guest':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!community) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D4A574] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F5F1E8] overflow-y-auto">
      <div className="p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#3A3630]">Members</h1>
              <p className="mt-2 text-[#6B6358]">
                Manage {community.name} community members
              </p>
            </div>
            {(userRole === 'owner' || userRole === 'admin') && (
              <button className="flex items-center gap-2 rounded-xl bg-[#4A5568] px-6 py-3 font-semibold text-white hover:bg-[#3A4558] transition-all shadow-sm hover:shadow-md">
                <UserPlus className="h-5 w-5" />
                Add Member
              </button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7355]" />
              <input
                type="text"
                placeholder="Search members by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-[#E8DFD0] bg-white py-3 pl-10 pr-4 text-[#3A3630] outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 rounded-xl border-2 border-[#E8DFD0] bg-white px-6 py-3 font-semibold text-[#3A3630] hover:bg-[#F5F1E8] transition-all">
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Members List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D4A574] border-t-transparent" />
            </div>
          ) : members.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D8CFC0] bg-white p-12 text-center shadow-sm">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E8DFD0]">
                <UserPlus className="h-10 w-10 text-[#8B7355]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#3A3630]">No members found</h3>
              <p className="text-[#6B6358]">
                {searchTerm ? 'Try adjusting your search' : 'Start by adding members to your community'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border-2 border-[#E8DFD0] bg-white p-6 transition-all hover:border-[#D4A574] hover:shadow-xl"
                >
                  <div className="mb-4 flex items-start gap-3">
                    {member.userDetails.avatarUrl ? (
                      <Image
                        src={member.userDetails.avatarUrl}
                        alt={member.userDetails.displayName}
                        width={48}
                        height={48}
                        className="rounded-full object-cover ring-2 ring-[#E8DFD0]"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8DFD0] ring-2 ring-[#D8CFC0]">
                        <span className="text-lg font-semibold text-[#8B7355]">
                          {member.userDetails.displayName?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 overflow-hidden">
                      <h3 className="font-bold text-[#3A3630] truncate">
                        {member.userDetails.displayName}
                      </h3>
                      <p className="text-sm text-[#8B7355] truncate">{member.userDetails.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeColor(
                        member.role
                      )}`}
                    >
                      {member.role}
                    </span>
                    {member.tags.length > 0 && (
                      <span className="rounded-full bg-[#F5F1E8] px-3 py-1 text-xs font-semibold text-[#8B7355]">
                        +{member.tags.length} tags
                      </span>
                    )}
                  </div>

                  <div className="mt-4 text-xs text-[#8B7355]">
                    Joined {new Date(member.joinedAt.toDate()).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
