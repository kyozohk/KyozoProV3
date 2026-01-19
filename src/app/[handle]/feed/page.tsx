'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { getCommunityByHandle } from '@/lib/community-utils';
import { Community } from '@/types/community';
import { Play, FileText, Image as ImageIcon, Headphones, Search } from 'lucide-react';
import Image from 'next/image';

interface Post {
  id: string;
  type: 'text' | 'image' | 'audio' | 'video';
  title?: string;
  content?: {
    text?: string;
    mediaUrls?: string[];
    thumbnailUrl?: string;
    fileType?: string;
  };
  authorId: string;
  author?: {
    userId: string;
    displayName: string;
    avatarUrl?: string;
  };
  communityHandle: string;
  communityId: string;
  likes?: number;
  comments?: number;
  createdAt: any;
  visibility?: 'public' | 'private' | 'members-only';
}

export default function FeedPage() {
  const params = useParams();
  const handle = params.handle as string;
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [community, setCommunity] = useState<Community | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch community data
  useEffect(() => {
    async function fetchCommunity() {
      if (!handle) return;
      
      try {
        const communityData = await getCommunityByHandle(handle);
        if (communityData) {
          setCommunity(communityData);
        }
      } catch (error) {
        console.error('Error fetching community:', error);
      }
    }

    fetchCommunity();
  }, [handle]);

  // Fetch posts with real-time updates
  useEffect(() => {
    if (!community?.communityId) {
      setLoading(false);
      return;
    }

    const postsCollection = collection(db, 'blogs');
    const postsQuery = query(
      postsCollection,
      where('communityHandle', '==', handle),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(postsQuery, async (querySnapshot) => {
      const postsData = await Promise.all(querySnapshot.docs.map(async (postDoc) => {
        const data = postDoc.data() as Post;
        
        // Fetch author details
        let authorDetails = null;
        if (data.authorId) {
          try {
            const userRef = doc(db, 'users', data.authorId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              authorDetails = {
                userId: data.authorId,
                displayName: userData.displayName || 'Unknown User',
                avatarUrl: userData.avatarUrl
              };
            }
          } catch (e) {
            console.warn(`Could not fetch author for post ${postDoc.id}:`, e);
          }
        }
        
        return {
          ...data,
          id: postDoc.id,
          author: authorDetails || { userId: 'unknown', displayName: 'Unknown User' },
        } as Post;
      }));
      
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error('❌ Firestore query error in feed:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [community?.communityId, handle]);

  // Filter posts by search term
  const filteredPosts = posts.filter(post => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    
    // Filter by post type
    if (['text', 'audio', 'video', 'image'].includes(searchLower)) {
      return post.type?.toLowerCase() === searchLower;
    }
    
    // Filter by title or content
    return post.title?.toLowerCase().includes(searchLower) ||
           post.content?.text?.toLowerCase().includes(searchLower);
  });

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'audio': return <Headphones className="h-5 w-5" />;
      case 'video': return <Play className="h-5 w-5" />;
      case 'image': return <ImageIcon className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'audio': return 'bg-purple-100 text-purple-700';
      case 'video': return 'bg-red-100 text-red-700';
      case 'image': return 'bg-blue-100 text-blue-700';
      default: return 'bg-green-100 text-green-700';
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
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-[#3A3630]">Community Feed</h1>
            <p className="text-[#6B6358]">
              Welcome to @{handle} community feed. Share and discover content from your community.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B7355]" />
              <input
                type="text"
                placeholder="Search posts by title, content, or type (text, audio, video, image)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-[#E8DFD0] bg-white py-3 pl-10 pr-4 text-[#3A3630] outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-all"
              />
            </div>
          </div>
          
          {/* Posts */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D4A574] border-t-transparent" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-[#D8CFC0] bg-white p-12 text-center shadow-sm">
              <div className="mb-4 flex h-20 w-20 mx-auto items-center justify-center rounded-2xl bg-[#E8DFD0]">
                <FileText className="h-10 w-10 text-[#8B7355]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#3A3630]">No posts yet</h3>
              <p className="text-[#6B6358]">
                {searchTerm ? 'No posts match your search' : 'Be the first to share something with your community'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-2xl border-2 border-[#E8DFD0] bg-white p-6 shadow-sm hover:border-[#D4A574] hover:shadow-xl transition-all"
                >
                  {/* Author Info */}
                  <div className="mb-4 flex items-center gap-3">
                    {post.author?.avatarUrl ? (
                      <Image
                        src={post.author.avatarUrl}
                        alt={post.author.displayName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover ring-2 ring-[#E8DFD0]"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8DFD0] ring-2 ring-[#D8CFC0]">
                        <span className="text-sm font-semibold text-[#8B7355]">
                          {post.author?.displayName?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-[#3A3630]">{post.author?.displayName}</p>
                      <p className="text-xs text-[#8B7355]">
                        {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getPostTypeColor(post.type)}`}>
                      {getPostIcon(post.type)}
                      {post.type}
                    </span>
                  </div>

                  {/* Post Content */}
                  {post.title && (
                    <h2 className="mb-3 text-2xl font-bold text-[#3A3630]">{post.title}</h2>
                  )}
                  
                  {post.content?.text && (
                    <p className="mb-4 text-[#6B6358] whitespace-pre-wrap">{post.content.text}</p>
                  )}

                  {/* Media */}
                  {post.content?.mediaUrls && post.content.mediaUrls.length > 0 && (
                    <div className="mb-4 grid gap-2">
                      {post.content.mediaUrls.map((url, idx) => (
                        <div key={idx} className="relative overflow-hidden rounded-xl">
                          {post.type === 'image' && (
                            <Image
                              src={url}
                              alt={post.title || 'Post image'}
                              width={800}
                              height={400}
                              className="w-full object-cover"
                            />
                          )}
                          {post.type === 'video' && (
                            <video controls className="w-full rounded-xl">
                              <source src={url} type={post.content?.fileType || 'video/mp4'} />
                            </video>
                          )}
                          {post.type === 'audio' && (
                            <audio controls className="w-full">
                              <source src={url} type={post.content?.fileType || 'audio/mpeg'} />
                            </audio>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-4 text-sm text-[#8B7355]">
                    <span>{post.likes || 0} likes</span>
                    <span>{post.comments || 0} comments</span>
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
