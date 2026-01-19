import { Timestamp } from 'firebase/firestore';

export interface Community {
  communityId: string;
  name: string;
  handle: string;
  ownerId: string;
  memberCount: number;
  communityProfileImage?: string;
  coverImage?: string;
  description?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type MemberRole = 'owner' | 'admin' | 'member' | 'guest';
export type MemberStatus = 'active' | 'pending' | 'banned';

export interface CommunityMember {
  id: string;
  userId: string;
  communityId: string;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: Timestamp;
  tags: string[];
  userDetails: {
    displayName: string;
    email: string;
    avatarUrl?: string;
    phone?: string;
    coverUrl?: string;
  };
}

export interface CommunityTag {
  id: string;
  communityId: string;
  name: string;
  createdAt: Timestamp;
}

export interface SearchFilter {
  type: 'name' | 'email' | 'tag';
  value: string;
}
