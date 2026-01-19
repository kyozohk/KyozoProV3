import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ChevronDown, ExternalLink, Eye, FileText, Headphones, Image as ImageIcon, Play, ThumbsUp, MessageSquare, Share2, Link as LinkIcon, Music } from 'lucide-react';
import { useState } from 'react';

interface FeedPost {
  id: string;
  type: 'text' | 'audio' | 'image' | 'video';
  title?: string;
  content?: string;
  externalUrl?: string;
  externalType?: 'substack' | 'spotify' | 'soundcloud' | 'twitter';
  timestamp: string;
  readTime?: string;
  duration?: string;
}

export function FeedScreen() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createPostType, setCreatePostType] = useState<'text' | 'audio' | 'image' | 'video'>('text');
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([
    {
      id: '1',
      type: 'audio',
      title: 'Tuning Your Body and Mind',
      duration: '6:30',
      timestamp: 'LISTEN • 6:30',
    },
    {
      id: '2',
      type: 'text',
      title: 'How Sound Restores Body and Mind',
      content: 'Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, and blood pressure, allowing the body to shift into a more relaxed, self-repairing state. Gentle sounds such as music, singing bowls, and nature soundscapes are often used to ease anxiety, lift mood, reduce the perception of pain, and improve sleep quality. Research on sound-based practices like sound baths, music therapy, and vibroacoustic therapy suggests they may be helpful for...',
      readTime: '1 MIN READ',
      timestamp: '1 MIN READ • JAN 2026',
    },
    {
      id: '3',
      type: 'audio',
      title: 'Chill Vibes Playlist',
      content: 'Perfect background music for your next event or meditation session.',
      externalUrl: 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp',
      externalType: 'spotify',
      timestamp: 'LISTEN • DEC 2025',
    },
    {
      id: '4',
      type: 'text',
      title: 'The Power of Community Leadership',
      content: 'In this article, we explore how authentic community leadership can transform both the leader and the members. Building genuine connections is at the heart of every thriving community...',
      externalUrl: 'https://kyozo.substack.com/p/community-leadership',
      externalType: 'substack',
      timestamp: '3 MIN READ • DEC 2025',
    },
  ]);

  const handleOpenCreateModal = (type: 'text' | 'audio' | 'image' | 'video') => {
    setCreatePostType(type);
    setCreateModalOpen(true);
    setPostContent('');
    setPostTitle('');
    setExternalLink('');
  };

  const detectExternalType = (url: string): 'substack' | 'spotify' | 'soundcloud' | 'twitter' | undefined => {
    if (url.includes('substack.com')) return 'substack';
    if (url.includes('spotify.com')) return 'spotify';
    if (url.includes('soundcloud.com')) return 'soundcloud';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    return undefined;
  };

  const handleCreatePost = () => {
    const newPost: FeedPost = {
      id: Date.now().toString(),
      type: createPostType,
      title: postTitle || undefined,
      content: postContent || undefined,
      externalUrl: externalLink || undefined,
      externalType: externalLink ? detectExternalType(externalLink) : undefined,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: createPostType === 'text' ? '1 MIN READ' : undefined,
      duration: createPostType === 'audio' ? '3:45' : undefined,
    };

    setFeedPosts([newPost, ...feedPosts]);
    setCreateModalOpen(false);
  };

  const renderExternalWidget = (post: FeedPost) => {
    if (!post.externalUrl || !post.externalType) return null;

    switch (post.externalType) {
      case 'substack':
        return (
          <div className="border border-gray-200 rounded-lg p-6 bg-white mb-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Substack Article</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">{post.title || 'Substack Post'}</h4>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.content || 'Read this article on Substack...'}
            </p>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                Read on Substack
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        );
      
      case 'spotify':
        return (
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <iframe
              style={{ borderRadius: '8px' }}
              src={post.externalUrl.replace('open.spotify.com/', 'open.spotify.com/embed/')}
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        );
      
      case 'soundcloud':
        return (
          <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-orange-50 to-orange-100 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Music className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">SoundCloud</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">{post.title || 'SoundCloud Track'}</h4>
            <Button variant="outline" size="sm" className="gap-2 bg-white" asChild>
              <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                Listen on SoundCloud
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        );
      
      case 'twitter':
        return (
          <div className="border border-gray-200 rounded-lg p-6 bg-white mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">X (Twitter) Post</span>
            </div>
            <p className="text-gray-700 mb-4">{post.content || 'View this post on X...'}</p>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                View on X
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">WILLER</h1>
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="w-4 h-4" />
            Public View
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3">
          <Button size="sm" className="bg-gray-800 hover:bg-gray-700">
            All
          </Button>
          <Button variant="outline" size="sm">
            Read
          </Button>
          <Button variant="outline" size="sm">
            Listen
          </Button>
          <Button variant="outline" size="sm">
            Watch
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="p-5 bg-white">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-600">Total Posts</p>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-3xl font-semibold">7</p>
            <p className="text-xs text-gray-500 mt-1">0 posted today</p>
          </Card>
          <Card className="p-5 bg-white">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-red-600">Total Likes</p>
              <ThumbsUp className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-semibold">0</p>
            <p className="text-xs text-gray-500 mt-1">Across all posts</p>
          </Card>
          <Card className="p-5 bg-white">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-blue-600">Total Comments</p>
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-semibold">0</p>
            <p className="text-xs text-gray-500 mt-1">Fostering engagement</p>
          </Card>
          <Card className="p-5 bg-white">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-orange-600">Total Shares</p>
              <Share2 className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-3xl font-semibold">0</p>
            <p className="text-xs text-gray-500 mt-1">Extending your reach</p>
          </Card>
        </div>

        {/* Post Type Buttons */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Button 
            className="bg-[#8B6B8B] hover:bg-[#7B5B7B] text-white gap-2 py-6"
            onClick={() => handleOpenCreateModal('text')}
          >
            <FileText className="w-5 h-5" />
            Text
          </Button>
          <Button 
            className="bg-[#A67BA6] hover:bg-[#966B96] text-white gap-2 py-6"
            onClick={() => handleOpenCreateModal('image')}
          >
            <ImageIcon className="w-5 h-5" />
            Image
          </Button>
          <Button 
            className="bg-[#5B8BA6] hover:bg-[#4B7B96] text-white gap-2 py-6"
            onClick={() => handleOpenCreateModal('audio')}
          >
            <Headphones className="w-5 h-5" />
            Audio
          </Button>
          <Button 
            className="bg-[#D4A65A] hover:bg-[#C4964A] text-white gap-2 py-6"
            onClick={() => handleOpenCreateModal('video')}
          >
            <Play className="w-5 h-5" />
            Video
          </Button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {/* Dynamic Posts */}
          {feedPosts.map((post) => (
            <Card key={post.id} className="p-6 bg-white">
              <div className="mb-4">
                <Badge 
                  className={
                    post.type === 'audio' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100 mb-2' :
                    post.type === 'text' ? 'bg-purple-100 text-purple-700 hover:bg-purple-100 mb-2' :
                    post.type === 'video' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100 mb-2' :
                    'bg-pink-100 text-pink-700 hover:bg-pink-100 mb-2'
                  }
                >
                  {post.type.toUpperCase()}
                </Badge>
                {post.timestamp && (
                  <span className="text-xs text-gray-500 ml-2">{post.timestamp}</span>
                )}
              </div>

              {/* External Widget */}
              {renderExternalWidget(post)}

              {/* Post Title */}
              {post.title && !post.externalUrl && (
                <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
              )}

              {/* Post Content */}
              {post.content && !post.externalUrl && (
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                  {post.type === 'text' && (
                    <Button variant="ghost" className="text-purple-700 hover:text-purple-800 p-0">
                      READ FULL ARTICLE →
                    </Button>
                  )}
                </div>
              )}

              {/* Audio Player for non-external audio */}
              {post.type === 'audio' && !post.externalUrl && (
                <div className="flex items-center gap-4">
                  <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 w-12 h-12">
                    <Play className="w-5 h-5 fill-white" />
                  </Button>
                  <div className="flex-1">
                    {post.title && <h3 className="text-xl font-semibold mb-2">{post.title}</h3>}
                    <div className="h-12 flex items-center">
                      <div className="w-full h-full bg-gray-100 rounded relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center gap-0.5 px-4">
                          {Array.from({ length: 100 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gray-300 rounded-full"
                              style={{ height: `${Math.random() * 60 + 20}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Create {createPostType.charAt(0).toUpperCase() + createPostType.slice(1)} Post
            </DialogTitle>
            <DialogDescription>
              {createPostType === 'text' && 'Share a text post or embed a Substack article with your community.'}
              {createPostType === 'audio' && 'Share audio content or embed from Spotify or SoundCloud.'}
              {createPostType === 'image' && 'Share an image with your community.'}
              {createPostType === 'video' && 'Share video content with your community.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* External Link Input */}
            {(createPostType === 'text' || createPostType === 'audio') && (
              <div>
                <Label htmlFor="external-link" className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  {createPostType === 'text' ? 'Substack Link (Optional)' : 'Spotify or SoundCloud Link (Optional)'}
                </Label>
                <Input
                  id="external-link"
                  placeholder={
                    createPostType === 'text' 
                      ? 'https://yourname.substack.com/p/article-title' 
                      : 'https://open.spotify.com/track/... or https://soundcloud.com/...'
                  }
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  className="mt-1.5"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  {createPostType === 'text' 
                    ? 'Paste a Substack article URL to embed it in your feed' 
                    : 'Paste a Spotify or SoundCloud link to embed the audio player'}
                </p>
              </div>
            )}

            {/* Title Input */}
            <div>
              <Label htmlFor="post-title">
                Title {externalLink ? '(Optional)' : ''}
              </Label>
              <Input
                id="post-title"
                placeholder={`Enter ${createPostType} post title`}
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="mt-1.5"
              />
            </div>

            {/* Content/Description */}
            <div>
              <Label htmlFor="post-content">
                {createPostType === 'text' ? 'Content' : 'Description'} {externalLink ? '(Optional)' : ''}
              </Label>
              <Textarea
                id="post-content"
                placeholder={
                  createPostType === 'text' 
                    ? 'Write your post content...' 
                    : 'Add a description or context for this post...'
                }
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={6}
                className="mt-1.5"
              />
            </div>

            {/* Preview of detected platform */}
            {externalLink && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">Detected Platform:</p>
                <div className="flex items-center gap-2">
                  {detectExternalType(externalLink) === 'substack' && (
                    <>
                      <FileText className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-orange-600 font-medium">Substack</span>
                    </>
                  )}
                  {detectExternalType(externalLink) === 'spotify' && (
                    <>
                      <Music className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Spotify</span>
                    </>
                  )}
                  {detectExternalType(externalLink) === 'soundcloud' && (
                    <>
                      <Music className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-orange-600 font-medium">SoundCloud</span>
                    </>
                  )}
                  {detectExternalType(externalLink) === 'twitter' && (
                    <>
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600 font-medium">X (Twitter)</span>
                    </>
                  )}
                  {!detectExternalType(externalLink) && (
                    <span className="text-sm text-gray-600">Unknown - Please check the URL</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleCreatePost}
              disabled={!externalLink && !postTitle && !postContent}
            >
              Publish Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}