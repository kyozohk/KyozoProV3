import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  FileText, 
  Headphones, 
  Image as ImageIcon, 
  Play, 
  Plus,
  Mail,
  MessageSquare,
  Send,
  Users,
  DollarSign,
  Search,
  X,
  Eye,
  TrendingUp,
  MessageCircle,
  BarChart3,
  CheckCircle2,
  Upload,
  Film,
  File
} from 'lucide-react';

interface FeedPost {
  id: string;
  type: 'text' | 'audio' | 'image' | 'video';
  title: string;
  content?: string;
  timestamp: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tags: string[];
  hasKyozoAccount: boolean;
}

type DeliveryMethod = 'email' | 'whatsapp' | 'dm' | null;

interface PastBroadcast {
  id: string;
  title: string;
  type: 'text' | 'audio' | 'image' | 'video';
  deliveryMethod: 'email' | 'whatsapp' | 'dm';
  sentDate: string;
  recipients: number;
  delivered: number;
  deliveryRate: number;
  opened: number;
  openRate: number;
  responses: number;
  responseRate: number;
}

const mockFeedPosts: FeedPost[] = [
  {
    id: '1',
    type: 'text',
    title: 'How Sound Restores Body and Mind',
    content: 'Sound can support healing by calming the nervous system...',
    timestamp: 'JAN 2026',
  },
  {
    id: '2',
    type: 'audio',
    title: 'Tuning Your Body and Mind',
    timestamp: 'DEC 2025',
  },
  {
    id: '3',
    type: 'text',
    title: 'The Power of Community Leadership',
    content: 'Building genuine connections is at the heart of every thriving community...',
    timestamp: 'DEC 2025',
  },
  {
    id: '4',
    type: 'audio',
    title: 'Chill Vibes Playlist',
    content: 'Perfect background music for your next event.',
    timestamp: 'NOV 2025',
  },
];

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    tags: ['VIP', 'Frequent Attendee'],
    hasKyozoAccount: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    tags: ['VIP', 'New Member'],
    hasKyozoAccount: true,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    tags: ['Frequent Attendee'],
    hasKyozoAccount: false,
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.w@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    tags: ['New Member'],
    hasKyozoAccount: true,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    tags: ['VIP'],
    hasKyozoAccount: false,
  },
];

const allTags = ['VIP', 'Frequent Attendee', 'New Member', 'Early Supporter'];

const mockPastBroadcasts: PastBroadcast[] = [
  {
    id: '1',
    title: 'How Sound Restores Body and Mind',
    type: 'text',
    deliveryMethod: 'email',
    sentDate: 'Jan 5, 2026',
    recipients: 245,
    delivered: 243,
    deliveryRate: 99.2,
    opened: 187,
    openRate: 77.0,
    responses: 23,
    responseRate: 12.3,
  },
  {
    id: '2',
    title: 'Tuning Your Body and Mind',
    type: 'audio',
    deliveryMethod: 'dm',
    sentDate: 'Dec 28, 2025',
    recipients: 189,
    delivered: 189,
    deliveryRate: 100,
    opened: 142,
    openRate: 75.1,
    responses: 31,
    responseRate: 21.8,
  },
  {
    id: '3',
    title: 'The Power of Community Leadership',
    type: 'text',
    deliveryMethod: 'whatsapp',
    sentDate: 'Dec 15, 2025',
    recipients: 156,
    delivered: 154,
    deliveryRate: 98.7,
    opened: 134,
    openRate: 87.0,
    responses: 18,
    responseRate: 13.4,
  },
  {
    id: '4',
    title: 'Chill Vibes Playlist',
    type: 'audio',
    deliveryMethod: 'email',
    sentDate: 'Nov 20, 2025',
    recipients: 312,
    delivered: 308,
    deliveryRate: 98.7,
    opened: 221,
    openRate: 71.8,
    responses: 15,
    responseRate: 6.8,
  },
];

export function BroadcastScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedContent, setSelectedContent] = useState<FeedPost | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);
  const [createNewModalOpen, setCreateNewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [pastBroadcasts, setPastBroadcasts] = useState<PastBroadcast[]>(mockPastBroadcasts);
  const [latestBroadcast, setLatestBroadcast] = useState<PastBroadcast | null>(null);
  
  // New content form
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentBody, setNewContentBody] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [uploadedDocument, setUploadedDocument] = useState<string | null>(null);

  const handleSelectContent = (post: FeedPost) => {
    setSelectedContent(post);
  };

  const handleCreateNewContent = () => {
    if (!newContentTitle || !newContentBody) return;
    
    const newPost: FeedPost = {
      id: Date.now().toString(),
      type: 'text',
      title: newContentTitle,
      content: newContentBody,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
    
    setSelectedContent(newPost);
    setCreateNewModalOpen(false);
    setNewContentTitle('');
    setNewContentBody('');
    setUploadedImage(null);
    setUploadedVideo(null);
    setUploadedDocument(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideo(file.name);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocument(file.name);
    }
  };

  const handleToggleMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSelectAll = () => {
    const filtered = getFilteredMembers();
    setSelectedMembers(filtered.map(m => m.id));
  };

  const handleDeselectAll = () => {
    setSelectedMembers([]);
  };

  const getFilteredMembers = () => {
    let filtered = mockMembers;

    if (selectedTags.length > 0) {
      filtered = filtered.filter(member =>
        member.tags.some(tag => selectedTags.includes(tag))
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const calculateCost = () => {
    const count = selectedMembers.length;
    if (deliveryMethod === 'email') return 0; // Email is free
    if (deliveryMethod === 'whatsapp') return count * 0.05; // $0.05 per message
    if (deliveryMethod === 'dm') return 0; // DM is free
    return 0;
  };

  const handleSendBroadcast = () => {
    // Create new broadcast entry
    if (selectedContent && deliveryMethod) {
      const newBroadcast: PastBroadcast = {
        id: Date.now().toString(),
        title: selectedContent.title,
        type: selectedContent.type,
        deliveryMethod: deliveryMethod as 'email' | 'whatsapp' | 'dm',
        sentDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        recipients: selectedMembers.length,
        delivered: selectedMembers.length,
        deliveryRate: 100,
        opened: 0,
        openRate: 0,
        responses: 0,
        responseRate: 0,
      };
      
      // Add to past broadcasts at the beginning
      setPastBroadcasts(prev => [newBroadcast, ...prev]);
      setLatestBroadcast(newBroadcast);
      setShowSuccessScreen(true);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessScreen(false);
    // Reset form
    setCurrentStep(1);
    setSelectedContent(null);
    setSelectedMembers([]);
    setDeliveryMethod(null);
    setLatestBroadcast(null);
  };

  const canProceedToStep2 = selectedContent !== null;
  const canProceedToStep3 = selectedMembers.length > 0;
  const canProceedToStep4 = deliveryMethod !== null;

  return (
    <div className="flex-1 h-screen overflow-auto bg-[#F5F1E8]">
      <div className="p-8">
        <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#E8DFD0] border-2 border-[#8B7355] shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-1 text-[#3A3630]">Broadcast</h1>
            <p className="text-[#5A4A3A]">Send content to your community via multiple channels.</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-[#8B7355]/30">
            {[
              { num: 1, label: 'Select Content' },
              { num: 2, label: 'Select Audience' },
              { num: 3, label: 'Select Delivery' },
              { num: 4, label: 'Review & Send' },
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep === step.num
                        ? 'bg-[#E87461] text-white shadow-md'
                        : currentStep > step.num
                        ? 'bg-[#7BD3C4] text-white'
                        : 'bg-[#D8CFC0] text-[#8B7355]'
                    }`}
                  >
                    {currentStep > step.num ? <Check className="w-5 h-5" /> : step.num}
                  </div>
                  <span
                    className={`font-medium ${
                      currentStep === step.num ? 'text-[#E87461]' : 'text-[#5A4A3A]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className="w-12 h-0.5 bg-[#8B7355]/30" />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Content */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#3A3630]">Choose Content to Broadcast</h2>
              <p className="text-[#5A4A3A] mb-6">
                Select an existing post from your feed or create new content.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {/* Create New Card */}
                <Card
                  className="p-6 border-2 border-dashed border-[#E87461] bg-white/50 hover:border-[#E87461] hover:bg-[#E87461]/10 cursor-pointer transition-all flex items-center justify-center min-h-[200px]"
                  onClick={() => setCreateNewModalOpen(true)}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#E87461]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Plus className="w-8 h-8 text-[#E87461]" />
                    </div>
                    <h3 className="font-semibold text-[#E87461]">Create New Content</h3>
                    <p className="text-sm text-[#5A4A3A] mt-1">Write a custom broadcast message</p>
                  </div>
                </Card>

                {/* Existing Posts */}
                {mockFeedPosts.map((post) => (
                  <Card
                    key={post.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      selectedContent?.id === post.id
                        ? 'border-2 border-[#E87461] bg-[#E87461]/10'
                        : 'border-2 border-[#8B7355]/30 bg-white/80 hover:border-[#E87461]/50'
                    }`}
                    onClick={() => handleSelectContent(post)}
                  >
                    {selectedContent?.id === post.id && (
                      <div className="flex justify-end mb-2">
                        <div className="w-6 h-6 bg-[#E87461] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                    <Badge
                      className={
                        post.type === 'audio'
                          ? 'bg-[#7BD3C4]/20 text-[#3A3630] border border-[#7BD3C4] mb-3'
                          : 'bg-[#D4A574]/20 text-[#3A3630] border border-[#D4A574] mb-3'
                      }
                    >
                      {post.type.toUpperCase()}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 text-[#3A3630]">{post.title}</h3>
                    {post.content && (
                      <p className="text-sm text-[#5A4A3A] line-clamp-3 mb-3">{post.content}</p>
                    )}
                    <p className="text-xs text-[#8B7355]">{post.timestamp}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Audience */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#3A3630]">Select Your Audience</h2>
              <p className="text-[#5A4A3A] mb-6">
                Choose recipients by selecting individuals or filtering by tags.
              </p>

              {/* Filter by Tags */}
              <div className="mb-6 p-4 bg-[#E8DFD0]/50 rounded-lg border border-[#8B7355]/30">
                <Label className="mb-3 block font-semibold text-[#3A3630]">Filter by Tags</Label>
                <div className="flex items-center gap-2 flex-wrap">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`cursor-pointer ${
                        selectedTags.includes(tag)
                          ? 'bg-[#E87461] text-white border-[#E87461]'
                          : 'bg-white border-[#8B7355]/30 hover:bg-[#E87461]/10'
                      }`}
                      onClick={() => handleToggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <Check className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTags([])}
                      className="text-[#5A4A3A] hover:text-[#E87461]"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </div>

              {/* Search */}
              <div className="mb-4 flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    Select All ({getFilteredMembers().length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                    Deselect All
                  </Button>
                </div>
              </div>

              {/* Members List */}
              <div className="border-2 border-[#8B7355]/30 rounded-lg divide-y divide-[#8B7355]/20 max-h-[500px] overflow-auto bg-white/80">
                {getFilteredMembers().map((member) => (
                  <div
                    key={member.id}
                    className="p-4 flex items-center gap-4 hover:bg-[#E8DFD0]/30 cursor-pointer transition-colors"
                    onClick={() => handleToggleMember(member.id)}
                  >
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => handleToggleMember(member.id)}
                    />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={`w-10 h-10 rounded-full ring-2 ${
                        member.hasKyozoAccount ? 'ring-[#E87461]' : 'ring-[#7BD3C4]'
                      }`}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#3A3630]">{member.name}</h4>
                      <p className="text-sm text-[#5A4A3A]">{member.email}</p>
                    </div>
                    {member.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        {member.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs bg-[#D4A574]/20 text-[#3A3630] border-[#D4A574]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-[#7BD3C4]/20 border-2 border-[#7BD3C4] rounded-lg">
                <p className="text-sm font-medium text-[#3A3630]">
                  {selectedMembers.length} recipient{selectedMembers.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Select Delivery Method */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#3A3630]">Choose Delivery Method</h2>
              <p className="text-[#5A4A3A] mb-6">Select how you want to send this broadcast.</p>

              <div className="grid grid-cols-3 gap-6">
                {/* Email */}
                <Card
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    deliveryMethod === 'email'
                      ? 'border-2 border-[#E87461] bg-[#E87461]/10'
                      : 'border-2 border-[#8B7355]/30 bg-white/80 hover:border-[#E87461]/50'
                  }`}
                  onClick={() => setDeliveryMethod('email')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#7BD3C4]/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#7BD3C4]" />
                    </div>
                    {deliveryMethod === 'email' && (
                      <div className="w-6 h-6 bg-[#E87461] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#3A3630]">Email</h3>
                  <p className="text-sm text-[#5A4A3A] mb-3">
                    Send via email to all recipients with email addresses.
                  </p>
                  <Badge className="bg-[#7BD3C4]/20 text-[#3A3630] border border-[#7BD3C4] hover:bg-[#7BD3C4]/30">
                    Free
                  </Badge>
                </Card>

                {/* WhatsApp */}
                <Card
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    deliveryMethod === 'whatsapp'
                      ? 'border-2 border-[#E87461] bg-[#E87461]/10'
                      : 'border-2 border-[#8B7355]/30 bg-white/80 hover:border-[#E87461]/50'
                  }`}
                  onClick={() => setDeliveryMethod('whatsapp')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#8BA888]/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-[#8BA888]" />
                    </div>
                    {deliveryMethod === 'whatsapp' && (
                      <div className="w-6 h-6 bg-[#E87461] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#3A3630]">WhatsApp</h3>
                  <p className="text-sm text-[#5A4A3A] mb-3">
                    Send via WhatsApp Business API to phone numbers.
                  </p>
                  <Badge className="bg-[#D4A574]/20 text-[#3A3630] border border-[#D4A574] hover:bg-[#D4A574]/30">
                    $0.05 per message
                  </Badge>
                </Card>

                {/* DM */}
                <Card
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    deliveryMethod === 'dm'
                      ? 'border-2 border-[#E87461] bg-[#E87461]/10'
                      : 'border-2 border-[#8B7355]/30 bg-white/80 hover:border-[#E87461]/50'
                  }`}
                  onClick={() => setDeliveryMethod('dm')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#E87461]/20 rounded-lg flex items-center justify-center">
                      <Send className="w-6 h-6 text-[#E87461]" />
                    </div>
                    {deliveryMethod === 'dm' && (
                      <div className="w-6 h-6 bg-[#E87461] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#3A3630]">Direct Message</h3>
                  <p className="text-sm text-[#5A4A3A] mb-3">
                    Send as in-app notifications to Kyozo members only.
                  </p>
                  <Badge className="bg-[#7BD3C4]/20 text-[#3A3630] border border-[#7BD3C4] hover:bg-[#7BD3C4]/30">
                    Free
                  </Badge>
                </Card>
              </div>
            </div>
          )}

          {/* Step 4: Review & Send */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#3A3630]">Review & Send</h2>
              <p className="text-[#5A4A3A] mb-6">Review your broadcast details before sending.</p>

              <div className="space-y-6">
                {/* Content Preview */}
                <Card className="p-6 bg-[#E8DFD0]/50 border-2 border-[#8B7355]/30">
                  <Label className="mb-3 block font-semibold text-[#3A3630]">Content Preview</Label>
                  
                  {/* Email Preview */}
                  {deliveryMethod === 'email' && (
                    <div className="bg-white border-2 border-[#8B7355]/30 rounded-lg overflow-hidden">
                      {/* Email Header */}
                      <div className="bg-gradient-to-r from-[#F5F1E8] to-[#E8DFD0] border-b-2 border-[#8B7355]/30 px-6 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#E87461] flex items-center justify-center text-white font-semibold">
                              K
                            </div>
                            <div>
                              <p className="font-semibold text-sm">Your Community Name</p>
                              <p className="text-xs text-gray-500">community@kyozo.com</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">Just now</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <p className="mb-1"><span className="font-semibold">To:</span> {selectedMembers.length} recipient{selectedMembers.length !== 1 ? 's' : ''}</p>
                          <p className="font-semibold text-base mt-2">{selectedContent?.title || 'Broadcast Message'}</p>
                        </div>
                      </div>
                      
                      {/* Email Body */}
                      <div className="px-6 py-6">
                        <Badge
                          className={
                            selectedContent?.type === 'audio'
                              ? 'bg-blue-100 text-blue-700 mb-4'
                              : selectedContent?.type === 'video'
                              ? 'bg-purple-100 text-purple-700 mb-4'
                              : selectedContent?.type === 'image'
                              ? 'bg-green-100 text-green-700 mb-4'
                              : 'bg-gray-100 text-gray-700 mb-4'
                          }
                        >
                          {selectedContent?.type.toUpperCase()}
                        </Badge>
                        
                        {selectedContent?.content && (
                          <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedContent.content}</p>
                          </div>
                        )}
                        
                        {/* Content Type Indicators */}
                        {selectedContent?.type === 'audio' && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
                            <Headphones className="w-6 h-6 text-blue-600" />
                            <div className="flex-1">
                              <p className="font-semibold text-blue-900">Audio Content</p>
                              <p className="text-sm text-blue-700">Recipients will receive a link to listen</p>
                            </div>
                            <Play className="w-8 h-8 text-blue-600" />
                          </div>
                        )}
                        
                        {selectedContent?.type === 'video' && (
                          <div className="mt-4 p-4 bg-purple-50 rounded-lg flex items-center gap-3">
                            <Play className="w-6 h-6 text-purple-600" />
                            <div className="flex-1">
                              <p className="font-semibold text-purple-900">Video Content</p>
                              <p className="text-sm text-purple-700">Recipients will receive a link to watch</p>
                            </div>
                          </div>
                        )}
                        
                        {selectedContent?.type === 'image' && (
                          <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center gap-3">
                            <ImageIcon className="w-6 h-6 text-green-600" />
                            <div className="flex-1">
                              <p className="font-semibold text-green-900">Image Content</p>
                              <p className="text-sm text-green-700">Image will be included in the email</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Email Footer */}
                      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 text-xs text-gray-500 text-center">
                        <p>Sent via Kyozo • <a href="#" className="text-[#E87461] hover:underline">Unsubscribe</a></p>
                      </div>
                    </div>
                  )}
                  
                  {/* WhatsApp Preview */}
                  {deliveryMethod === 'whatsapp' && (
                    <div className="bg-[#ECE5DD] p-4 rounded-lg">
                      <div className="bg-[#DCF8C6] rounded-lg p-4 max-w-md ml-auto shadow-sm">
                        <Badge className="bg-green-100 text-green-700 mb-2">
                          {selectedContent?.type.toUpperCase()}
                        </Badge>
                        <h3 className="font-semibold mb-2">{selectedContent?.title}</h3>
                        {selectedContent?.content && (
                          <p className="text-sm text-gray-800 mb-2">{selectedContent.content}</p>
                        )}
                        <p className="text-xs text-gray-600 text-right">Just now ✓✓</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Direct Message Preview */}
                  {deliveryMethod === 'dm' && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E87461] flex items-center justify-center text-white font-semibold flex-shrink-0">
                          K
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="font-semibold">Your Community</span>
                            <span className="text-xs text-gray-500">Just now</span>
                          </div>
                          <Badge
                            className={
                              selectedContent?.type === 'audio'
                                ? 'bg-blue-100 text-blue-700 mb-2'
                                : 'bg-purple-100 text-purple-700 mb-2'
                            }
                          >
                            {selectedContent?.type.toUpperCase()}
                          </Badge>
                          <h3 className="font-semibold mb-1">{selectedContent?.title}</h3>
                          {selectedContent?.content && (
                            <p className="text-sm text-gray-700">{selectedContent.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Audience Summary */}
                <Card className="p-6 bg-gray-50">
                  <Label className="mb-3 block font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Audience
                  </Label>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-2xl text-purple-700">
                      {selectedMembers.length}
                    </p>
                    <p className="text-sm text-gray-600">
                      recipient{selectedMembers.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                </Card>

                {/* Delivery Method */}
                <Card className="p-6 bg-gray-50">
                  <Label className="mb-3 block font-semibold">Delivery Method</Label>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      {deliveryMethod === 'email' && (
                        <>
                          <Mail className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">Email</span>
                        </>
                      )}
                      {deliveryMethod === 'whatsapp' && (
                        <>
                          <MessageSquare className="w-5 h-5 text-green-600" />
                          <span className="font-semibold">WhatsApp</span>
                        </>
                      )}
                      {deliveryMethod === 'dm' && (
                        <>
                          <Send className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold">Direct Message</span>
                        </>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Cost Estimate */}
                <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                  <Label className="mb-3 block font-semibold flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Cost Estimate
                  </Label>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-purple-900">
                      ${calculateCost().toFixed(2)}
                    </span>
                    {deliveryMethod === 'whatsapp' && (
                      <span className="text-sm text-purple-700">
                        ({selectedMembers.length} messages × $0.05)
                      </span>
                    )}
                  </div>
                  {calculateCost() === 0 && (
                    <p className="text-sm text-purple-700 mt-2">
                      This delivery method is free!
                    </p>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t-2 border-[#8B7355]/30">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="gap-2 border-[#8B7355] text-[#3A3630] hover:bg-[#E8DFD0]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                className="bg-[#E87461] hover:bg-[#D76451] text-white gap-2 shadow-md"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && !canProceedToStep2) ||
                  (currentStep === 2 && !canProceedToStep3) ||
                  (currentStep === 3 && !canProceedToStep4)
                }
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                className="bg-[#7BD3C4] hover:bg-[#6BC3B4] text-white gap-2 shadow-md"
                onClick={handleSendBroadcast}
              >
                <Send className="w-4 h-4" />
                Send Broadcast
              </Button>
            )}
          </div>
        </Card>

        {/* Past Broadcasts Section */}
        <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#E8DFD0] border-2 border-[#8B7355] shadow-lg p-8 mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-1 flex items-center gap-2 text-[#3A3630]">
              <BarChart3 className="w-6 h-6 text-[#E87461]" />
              Past Broadcasts
            </h2>
            <p className="text-[#5A4A3A]">View performance metrics for your previous broadcasts</p>
          </div>

          <div className="space-y-4">
            {pastBroadcasts.map((broadcast) => (
              <Card key={broadcast.id} className="p-6 bg-white/80 border-2 border-[#8B7355]/30 hover:shadow-lg hover:border-[#E87461]/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{broadcast.title}</h3>
                      <Badge
                        className={
                          broadcast.type === 'audio'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }
                      >
                        {broadcast.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        {broadcast.deliveryMethod === 'email' && (
                          <>
                            <Mail className="w-4 h-4" />
                            Email
                          </>
                        )}
                        {broadcast.deliveryMethod === 'whatsapp' && (
                          <>
                            <MessageSquare className="w-4 h-4" />
                            WhatsApp
                          </>
                        )}
                        {broadcast.deliveryMethod === 'dm' && (
                          <>
                            <Send className="w-4 h-4" />
                            Direct Message
                          </>
                        )}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>{broadcast.sentDate}</span>
                      <span className="text-gray-400">•</span>
                      <span>{broadcast.recipients} recipients</span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Delivery Rate */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Delivery Rate</span>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{broadcast.deliveryRate}%</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {broadcast.delivered} of {broadcast.recipients} delivered
                      </p>
                    </div>
                  </div>

                  {/* Open Rate */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Open Rate</span>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{broadcast.openRate}%</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {broadcast.opened} opened
                      </p>
                    </div>
                  </div>

                  {/* Response Rate */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">Response Rate</span>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{broadcast.responseRate}%</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {broadcast.responses} responses
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      {/* Create New Content Modal */}
      <Dialog open={createNewModalOpen} onOpenChange={setCreateNewModalOpen}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-[#F5F1E8] to-[#E8DFD0] border-2 border-[#8B7355]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#3A3630]">Create New Broadcast Content</DialogTitle>
            <DialogDescription className="text-[#5A4A3A]">
              Write a custom message to send to your community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter broadcast title"
                value={newContentTitle}
                onChange={(e) => setNewContentTitle(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="content">Message</Label>
              <Textarea
                id="content"
                placeholder="Write your broadcast message..."
                value={newContentBody}
                onChange={(e) => setNewContentBody(e.target.value)}
                rows={8}
                className="mt-1.5"
              />
            </div>

            {/* Upload Media Section */}
            <div className="border-t pt-6">
              <Label className="mb-4 block text-base">Upload Media (Optional)</Label>
              <div className="grid grid-cols-3 gap-4">
                {/* Image Upload */}
                <div>
                  <Label className="text-sm mb-2 block text-gray-600">Image</Label>
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#7BD3C4] hover:bg-gray-50 cursor-pointer transition-colors">
                      {uploadedImage ? (
                        <div className="relative">
                          <img src={uploadedImage} alt="Uploaded" className="w-full h-32 object-cover rounded" />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 w-6 h-6"
                            onClick={(e) => {
                              e.preventDefault();
                              setUploadedImage(null);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">Click to upload</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Video Upload */}
                <div>
                  <Label className="text-sm mb-2 block text-gray-600">Video</Label>
                  <label className="block">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#7BD3C4] hover:bg-gray-50 cursor-pointer transition-colors h-full">
                      {uploadedVideo ? (
                        <div className="relative h-32 bg-purple-50 rounded flex items-center justify-center">
                          <div className="text-center">
                            <Film className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                            <p className="text-xs text-purple-700 px-2 truncate">{uploadedVideo}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 w-6 h-6"
                            onClick={(e) => {
                              e.preventDefault();
                              setUploadedVideo(null);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Film className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">Click to upload</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Document Upload */}
                <div>
                  <Label className="text-sm mb-2 block text-gray-600">Document</Label>
                  <label className="block">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleDocumentUpload}
                      className="hidden"
                      id="document-upload"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#7BD3C4] hover:bg-gray-50 cursor-pointer transition-colors h-full">
                      {uploadedDocument ? (
                        <div className="relative h-32 bg-blue-50 rounded flex items-center justify-center">
                          <div className="text-center">
                            <File className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                            <p className="text-xs text-blue-700 px-2 truncate">{uploadedDocument}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 w-6 h-6"
                            onClick={(e) => {
                              e.preventDefault();
                              setUploadedDocument(null);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <File className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">Click to upload</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Supported formats: Images (JPG, PNG, GIF), Videos (MP4, MOV), Documents (PDF, DOC, TXT)
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setCreateNewModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleCreateNewContent}
              disabled={!newContentTitle || !newContentBody}
            >
              Use This Content
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Screen */}
      {showSuccessScreen && latestBroadcast && (
        <Dialog open={showSuccessScreen} onOpenChange={setShowSuccessScreen}>
          <DialogContent className="max-w-3xl bg-gradient-to-br from-[#F5F1E8] to-[#E8DFD0] border-2 border-[#8B7355]">
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-[#7BD3C4]/20 border-2 border-[#7BD3C4] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-[#7BD3C4]" />
              </div>
              <DialogTitle className="text-3xl mb-2 text-[#3A3630]">Broadcast Sent Successfully!</DialogTitle>
              <DialogDescription className="text-lg text-[#5A4A3A]">
                Your broadcast has been sent to {latestBroadcast.recipients} recipient{latestBroadcast.recipients !== 1 ? 's' : ''} via {deliveryMethod}.
              </DialogDescription>
            </div>

            <div className="space-y-6 mt-6">
              {/* Success Summary Card */}
              <Card className="p-6 bg-gradient-to-r from-[#E8DFD0] to-[#D8CFC0] border-2 border-[#8B7355]/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E87461] rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-[#3A3630]">
                      Added to Past Broadcasts
                    </h3>
                    <p className="text-sm text-[#5A4A3A] mb-4">
                      Your broadcast "<strong>{latestBroadcast.title}</strong>" has been successfully added to your Past Broadcasts list. 
                      You can track its performance metrics (delivery rate, open rate, and response rate) in the Past Broadcasts section below.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#E87461]">
                      <TrendingUp className="w-4 h-4" />
                      <span>Sent on {latestBroadcast.sentDate}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Broadcast Preview Card */}
              <Card className="p-6 bg-[#E8DFD0]/50 border-2 border-[#8B7355]/30">
                <Label className="mb-3 block font-semibold text-base text-[#3A3630]">Broadcast Details</Label>
                <div className="bg-white/80 p-4 rounded-lg border border-[#8B7355]/20 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className={
                          latestBroadcast.type === 'audio'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }
                      >
                        {latestBroadcast.type.toUpperCase()}
                      </Badge>
                      {deliveryMethod === 'email' && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          Email
                        </Badge>
                      )}
                      {deliveryMethod === 'whatsapp' && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          WhatsApp
                        </Badge>
                      )}
                      {deliveryMethod === 'dm' && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Send className="w-3 h-3" />
                          Direct Message
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{latestBroadcast.title}</h3>
                    {selectedContent?.content && (
                      <p className="text-sm text-gray-600">{selectedContent.content}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Recipients</p>
                      <p className="font-semibold text-lg text-purple-700 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {latestBroadcast.recipients}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Cost</p>
                      <p className="font-semibold text-lg text-green-700 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${calculateCost().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={handleCloseSuccess}
                className="flex-1"
              >
                View Past Broadcasts
              </Button>
              <Button
                onClick={() => {
                  setShowSuccessScreen(false);
                  setCurrentStep(1);
                  setSelectedContent(null);
                  setSelectedMembers([]);
                  setDeliveryMethod(null);
                  setLatestBroadcast(null);
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Another Broadcast
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}