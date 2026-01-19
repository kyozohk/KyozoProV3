import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  Unsubscribe,
  orderBy,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { Community, CommunityMember, CommunityTag, SearchFilter, MemberRole } from '@/types/community';

/**
 * Get a community by its handle
 */
export async function getCommunityByHandle(handle: string): Promise<Community | null> {
  try {
    const communitiesRef = collection(db, 'communities');
    const q = query(communitiesRef, where('handle', '==', handle), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      communityId: doc.id,
      ...doc.data(),
    } as Community;
  } catch (error) {
    console.error('Error fetching community by handle:', error);
    throw error;
  }
}

/**
 * Get user's role in a community
 */
export async function getUserRoleInCommunity(
  userId: string,
  communityId: string
): Promise<MemberRole | null> {
  try {
    const membersRef = collection(db, 'communityMembers');
    const q = query(
      membersRef,
      where('userId', '==', userId),
      where('communityId', '==', communityId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return querySnapshot.docs[0].data().role as MemberRole;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
}

/**
 * Get all members of a community with optional filtering
 */
export async function getCommunityMembers(
  communityId: string,
  filter?: SearchFilter
): Promise<CommunityMember[]> {
  try {
    const membersRef = collection(db, 'communityMembers');
    const q = query(
      membersRef,
      where('communityId', '==', communityId),
      where('status', '==', 'active'),
      orderBy('joinedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    let members = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as CommunityMember));
    
    // Client-side filtering for search
    if (filter?.value) {
      const searchValue = filter.value.toLowerCase();
      members = members.filter(member => {
        switch (filter.type) {
          case 'name':
            return member.userDetails?.displayName?.toLowerCase().includes(searchValue);
          case 'email':
            return member.userDetails?.email?.toLowerCase().includes(searchValue);
          case 'tag':
            return member.tags?.some(tag => tag.toLowerCase().includes(searchValue));
          default:
            return true;
        }
      });
    }
    
    return members;
  } catch (error) {
    console.error('Error fetching community members:', error);
    throw error;
  }
}

/**
 * Get all tags for a community
 */
export async function getCommunityTags(communityId: string): Promise<CommunityTag[]> {
  try {
    const tagsRef = collection(db, 'communityTags');
    const q = query(
      tagsRef,
      where('communityId', '==', communityId),
      orderBy('name', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as CommunityTag));
  } catch (error) {
    console.error('Error fetching community tags:', error);
    throw error;
  }
}

/**
 * Subscribe to communities where user is owner (real-time)
 */
export function subscribeToOwnedCommunities(
  userId: string,
  callback: (communities: Community[]) => void
): Unsubscribe {
  const communitiesRef = collection(db, 'communities');
  const q = query(communitiesRef, where('ownerId', '==', userId));
  
  return onSnapshot(
    q,
    (querySnapshot) => {
      const communities = querySnapshot.docs.map(doc => ({
        communityId: doc.id,
        ...doc.data(),
      } as Community));
      callback(communities);
    },
    (error) => {
      console.error('Error in owned communities subscription:', error);
    }
  );
}

/**
 * Get communities where user is a member (not owner)
 */
export async function getMemberCommunities(
  userId: string,
  excludeOwnedIds: string[] = []
): Promise<Community[]> {
  try {
    // Step 1: Get all community memberships for this user
    const membersRef = collection(db, 'communityMembers');
    const memberQuery = query(membersRef, where('userId', '==', userId));
    const memberSnapshot = await getDocs(memberQuery);
    
    const memberCommunityIds = memberSnapshot.docs
      .map(doc => doc.data().communityId)
      .filter(id => !excludeOwnedIds.includes(id));
    
    if (memberCommunityIds.length === 0) {
      return [];
    }
    
    // Step 2: Batch fetch community details (Firestore 'in' limit is 30)
    const batchSize = 30;
    const batches: Promise<any>[] = [];
    
    for (let i = 0; i < memberCommunityIds.length; i += batchSize) {
      const batch = memberCommunityIds.slice(i, i + batchSize);
      const communitiesQuery = query(
        collection(db, 'communities'),
        where('communityId', 'in', batch)
      );
      batches.push(getDocs(communitiesQuery));
    }
    
    const batchResults = await Promise.all(batches);
    const communities: Community[] = [];
    
    batchResults.forEach(snap => {
      snap.docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        communities.push({
          communityId: doc.id,
          ...doc.data(),
        } as Community);
      });
    });
    
    return communities;
  } catch (error) {
    console.error('Error fetching member communities:', error);
    throw error;
  }
}

/**
 * Get all communities for a user (owned + member)
 */
export async function getAllUserCommunities(userId: string): Promise<Community[]> {
  try {
    // Get owned communities
    const ownedQuery = query(
      collection(db, 'communities'),
      where('ownerId', '==', userId)
    );
    const ownedSnapshot = await getDocs(ownedQuery);
    const ownedCommunities = ownedSnapshot.docs.map(doc => ({
      communityId: doc.id,
      ...doc.data(),
    } as Community));
    
    const ownedIds = ownedCommunities.map(c => c.communityId);
    
    // Get member communities (excluding owned)
    const memberCommunities = await getMemberCommunities(userId, ownedIds);
    
    // Combine and deduplicate
    const allCommunities = [...ownedCommunities, ...memberCommunities];
    const uniqueCommunities = Array.from(
      new Map(allCommunities.map(item => [item.communityId, item])).values()
    );
    
    return uniqueCommunities;
  } catch (error) {
    console.error('Error fetching all user communities:', error);
    throw error;
  }
}
