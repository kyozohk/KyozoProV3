import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Grid3x3, List, Search, Plus, X, ArrowLeft, UserPlus, Link2, Upload, Copy, Check, Mail, Send, ChevronDown, ChevronUp } from 'lucide-react';
import type { Member, CustomTag } from '../App';

interface EventAttendance {
  id: string;
  eventName: string;
  eventDate: string;
  ticketType: string;
  price: string;
  platform: 'eventbrite' | 'residentadvisor';
  purchaseDate: string;
}

interface MembersScreenProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  contacts: Member[];
  setContacts: React.Dispatch<React.SetStateAction<Member[]>>;
  customTags: CustomTag[];
  setCustomTags: React.Dispatch<React.SetStateAction<CustomTag[]>>;
  onNavigateToDisplaySettings?: () => void;
}

export function MembersScreen({ members, setMembers, contacts, setContacts, customTags, setCustomTags, onNavigateToDisplaySettings }: MembersScreenProps) {
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [tagName, setTagName] = useState('');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [filterByTag, setFilterByTag] = useState<string | null>(null);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberDetailOpen, setMemberDetailOpen] = useState(false);
  const [bulkSelectedMemberIds, setBulkSelectedMemberIds] = useState<string[]>([]);
  const [openedFromMemberModal, setOpenedFromMemberModal] = useState(false);
  const [memberTier, setMemberTier] = useState<'observe' | 'resonate' | 'communicate' | null>(null);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [inviteMemberModalOpen, setInviteMemberModalOpen] = useState(false);
  const [importMemberModalOpen, setImportMemberModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [sendReminderModalOpen, setSendReminderModalOpen] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');
  const [remindersSent, setRemindersSent] = useState(false);
  const [audienceOverviewExpanded, setAudienceOverviewExpanded] = useState(false);

  const handleOpenTagModal = (tagId?: string) => {
    if (tagId) {
      const tag = customTags.find(t => t.id === tagId);
      if (tag) {
        setSelectedTagId(tagId);
        setTagName(tag.name);
        setSelectedMemberIds(tag.memberIds);
      }
    } else {
      setSelectedTagId(null);
      setTagName('');
      setSelectedMemberIds([]);
    }
    setTagModalOpen(true);
  };

  const handleCloseTagModal = () => {
    setTagModalOpen(false);
    setSelectedTagId(null);
    setTagName('');
    setSelectedMemberIds([]);
    setMemberSearchQuery('');
  };

  const handleSaveTag = () => {
    if (!tagName.trim()) return;

    if (selectedTagId) {
      setCustomTags(tags =>
        tags.map(tag =>
          tag.id === selectedTagId
            ? { ...tag, name: tagName }
            : tag
        )
      );
    } else {
      const newTag: CustomTag = {
        id: Date.now().toString(),
        name: tagName.trim(),
        memberIds: [],
      };
      setCustomTags([...customTags, newTag]);
      setSelectedTagId(newTag.id);
    }
  };

  const handleApplyTag = () => {
    if (!selectedTagId) return;

    setCustomTags(tags =>
      tags.map(tag =>
        tag.id === selectedTagId
          ? { ...tag, memberIds: selectedMemberIds }
          : tag
      )
    );

    setMembers(mems =>
      mems.map(member => {
        const hasTag = selectedMemberIds.includes(member.id);
        const tagName = customTags.find(t => t.id === selectedTagId)?.name || tagName;
        
        if (hasTag && !member.tags.includes(tagName)) {
          return { ...member, tags: [...member.tags, tagName] };
        } else if (!hasTag && member.tags.includes(tagName)) {
          return { ...member, tags: member.tags.filter(t => t !== tagName) };
        }
        return member;
      })
    );

    handleCloseTagModal();
  };

  const handleToggleMember = (memberId: string) => {
    setSelectedMemberIds(ids =>
      ids.includes(memberId)
        ? ids.filter(id => id !== memberId)
        : [...ids, memberId]
    );
  };

  const handleDeleteTag = (tagId: string) => {
    const tag = customTags.find(t => t.id === tagId);
    if (!tag) return;

    setMembers(mems =>
      mems.map(member => ({
        ...member,
        tags: member.tags.filter(t => t !== tag.name),
      }))
    );

    setCustomTags(tags => tags.filter(t => t.id !== tagId));
    
    if (filterByTag === tagId) {
      setFilterByTag(null);
    }
  };

  const filteredMembers = filterByTag
    ? members.filter(m => {
        const tag = customTags.find(t => t.id === filterByTag);
        return tag && m.tags.includes(tag.name);
      })
    : members;

  const modalFilteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(memberSearchQuery.toLowerCase())
  );

  const isSavedTag = selectedTagId !== null && customTags.some(t => t.id === selectedTagId);
  const canApply = isSavedTag && selectedMemberIds.length > 0;

  const handleOpenMemberDetail = (member: Member) => {
    setSelectedMember(member);
    setMemberDetailOpen(true);
  };

  const handleToggleBulkSelection = (memberId: string) => {
    setBulkSelectedMemberIds(ids =>
      ids.includes(memberId)
        ? ids.filter(id => id !== memberId)
        : [...ids, memberId]
    );
  };

  const handleOpenReminderModal = () => {
    // Set default reminder message
    setReminderMessage(`Hi there! 👋\n\nWe'd love to have you join our community. Click the link below to accept your invite and become a member:\n\nhttps://kyozo.com/join/your-community-name\n\nLooking forward to seeing you there!`);
    setSendReminderModalOpen(true);
  };

  const handleSendReminders = () => {
    // In a real app, this would send emails/messages to all contacts
    console.log(`Sending reminders to ${contacts.length} contacts`);
    console.log('Message:', reminderMessage);
    
    // Show success state
    setRemindersSent(true);
    
    // Reset after a delay
    setTimeout(() => {
      setSendReminderModalOpen(false);
      setRemindersSent(false);
    }, 2000);
  };

  const handleOpenTagModalFromMember = () => {
    setOpenedFromMemberModal(true);
    setMemberDetailOpen(false);
    handleOpenTagModal();
  };

  const handleBackToMemberModal = () => {
    setTagModalOpen(false);
    setOpenedFromMemberModal(false);
    setMemberDetailOpen(true);
  };

  // Generate random event attendance history for a member
  const generateEventHistory = (memberId: string): EventAttendance[] => {
    const events = [
      { name: 'Summer Music Festival 2025', date: 'Aug 15, 2025', type: 'General Admission', price: '$89.00' },
      { name: 'Tech Conference Silicon Valley', date: 'Jul 22, 2025', type: 'VIP Pass', price: '$299.00' },
      { name: 'Underground House Night', date: 'Jun 10, 2025', type: 'Early Bird', price: '$45.00' },
      { name: 'Art Gallery Opening', date: 'May 5, 2025', type: 'Standard', price: '$25.00' },
      { name: 'Rooftop Jazz Sessions', date: 'Apr 18, 2025', type: 'Premium', price: '$65.00' },
      { name: 'Winter Wonderland Rave', date: 'Dec 20, 2024', type: 'VIP', price: '$150.00' },
      { name: 'Indie Rock Showcase', date: 'Nov 3, 2024', type: 'General Admission', price: '$35.00' },
      { name: 'Electronic Music Summit', date: 'Oct 12, 2024', type: 'All Access', price: '$199.00' },
    ];

    const platforms: ('eventbrite' | 'residentadvisor')[] = ['eventbrite', 'residentadvisor'];
    const numEvents = Math.floor(Math.random() * 5) + 3; // 3-7 events per member

    return events.slice(0, numEvents).map((event, idx) => ({
      id: `${memberId}-event-${idx}`,
      eventName: event.name,
      eventDate: event.date,
      ticketType: event.type,
      price: event.price,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      purchaseDate: event.date,
    }));
  };

  const memberEventHistory = selectedMember ? generateEventHistory(selectedMember.id) : [];

  const platformLogos = {
    eventbrite: 'https://images.unsplash.com/photo-1761625424632-c6adc86211d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudGJyaXRlJTIwbG9nb3xlbnwxfHx8fDE3Njc3ODA2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    residentadvisor: 'https://images.unsplash.com/photo-1674450371215-550d33a2d81e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudCUyMGFkdmlzb3IlMjBsb2dvfGVufDF8fHx8MTc2Nzc4MDY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  return (
    <div className="flex-1 h-screen overflow-auto bg-gray-50">
      <div className="p-8">
        <Card className="bg-white p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-3xl font-semibold">Audience</h1>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setAddMemberModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Member
                </Button>
                <Button
                  onClick={() => setInviteMemberModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Link2 className="w-4 h-4" />
                  Invite Member
                </Button>
                <Button
                  onClick={() => setImportMemberModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Import Member
                </Button>
              </div>
            </div>
            <p className="text-gray-600">Browse and manage your community audience.</p>
          </div>

          {/* Audience Overview - Retro Chart */}
          <div className="mb-8">
            <Card className="bg-gradient-to-br from-[#E8DFD0] to-[#D8CFC0] border-2 border-[#8B7355] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-[#8B7355]/5 transition-colors"
                onClick={() => setAudienceOverviewExpanded(!audienceOverviewExpanded)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm text-[#5A4A3A] font-bold uppercase tracking-wider mb-1">Total Audience Overview</h3>
                    <p className="text-xs text-[#8B7355]">Breakdown of your community reach</p>
                  </div>
                  <div className="flex items-center gap-6">
                    {/* Summary Stats when collapsed */}
                    {!audienceOverviewExpanded && (
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#7BD3C4] font-mono">{members.length}</p>
                          <p className="text-xs text-[#5A4A3A]">Members</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#D4A574] font-mono">{contacts.length}</p>
                          <p className="text-xs text-[#5A4A3A]">Contacts</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#E87461] font-mono">{members.length + contacts.length}</p>
                          <p className="text-xs text-[#5A4A3A]">Total</p>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#5A4A3A] hover:bg-[#8B7355]/20"
                    >
                      {audienceOverviewExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              {audienceOverviewExpanded && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t-2 border-[#8B7355]/30"></div>
              
              <div className="grid grid-cols-3 gap-6">
                {/* Members Dial */}
                <div className="flex flex-col items-center">
                  <svg width="200" height="140" viewBox="0 0 200 140" className="drop-shadow-lg">
                    {/* Outer Ring */}
                    <circle cx="100" cy="100" r="75" fill="#3A3630" stroke="#8B7355" strokeWidth="3"/>
                    
                    {/* Dial Face */}
                    <circle cx="100" cy="100" r="70" fill="#F5F1E8" stroke="#5A4A3A" strokeWidth="2"/>
                    
                    {/* Scale Marks */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                      const angle = -140 + (i * 28); // 280 degrees total spread
                      const rad = (angle * Math.PI) / 180;
                      const x1 = 100 + 60 * Math.cos(rad);
                      const y1 = 100 + 60 * Math.sin(rad);
                      const x2 = 100 + (i % 2 === 0 ? 53 : 56) * Math.cos(rad);
                      const y2 = 100 + (i % 2 === 0 ? 53 : 56) * Math.sin(rad);
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#3A3630"
                          strokeWidth={i % 2 === 0 ? "2" : "1"}
                        />
                      );
                    })}
                    
                    {/* Scale Numbers */}
                    {[0, 2, 4, 6, 8, 10].map((num, idx) => {
                      const angle = -140 + (idx * 56);
                      const rad = (angle * Math.PI) / 180;
                      const x = 100 + 45 * Math.cos(rad);
                      const y = 100 + 45 * Math.sin(rad);
                      return (
                        <text
                          key={num}
                          x={x}
                          y={y}
                          fill="#3A3630"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {num}
                        </text>
                      );
                    })}
                    
                    {/* Label */}
                    <text x="100" y="80" fill="#5A4A3A" fontSize="9" fontWeight="bold" textAnchor="middle">
                      MEMBERS
                    </text>
                    
                    {/* Needle */}
                    <g transform={`rotate(${-140 + (members.length * 28)}, 100, 100)`}>
                      <line x1="100" y1="100" x2="100" y2="45" stroke="#7BD3C4" strokeWidth="3" strokeLinecap="round"/>
                      <circle cx="100" cy="100" r="6" fill="#7BD3C4" stroke="#3A3630" strokeWidth="2"/>
                    </g>
                    
                    {/* Center Cap */}
                    <circle cx="100" cy="100" r="3" fill="#3A3630"/>
                  </svg>
                  
                  {/* Digital Readout */}
                  <div className="mt-3 text-center">
                    <div className="inline-block bg-[#3A3630] px-5 py-2 rounded border-2 border-[#5A4A3A]">
                      <p className="text-3xl font-bold text-[#7BD3C4] font-mono tracking-wider" style={{ textShadow: '0 0 8px rgba(123, 211, 196, 0.5)' }}>
                        {members.length}
                      </p>
                    </div>
                    <p className="text-xs text-[#5A4A3A] mt-2 font-semibold">Registered Members</p>
                  </div>
                </div>

                {/* Contacts Dial */}
                <div className="flex flex-col items-center">
                  <svg width="200" height="140" viewBox="0 0 200 140" className="drop-shadow-lg">
                    {/* Outer Ring */}
                    <circle cx="100" cy="100" r="75" fill="#3A3630" stroke="#8B7355" strokeWidth="3"/>
                    
                    {/* Dial Face */}
                    <circle cx="100" cy="100" r="70" fill="#F5F1E8" stroke="#5A4A3A" strokeWidth="2"/>
                    
                    {/* Scale Marks */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                      const angle = -140 + (i * 28);
                      const rad = (angle * Math.PI) / 180;
                      const x1 = 100 + 60 * Math.cos(rad);
                      const y1 = 100 + 60 * Math.sin(rad);
                      const x2 = 100 + (i % 2 === 0 ? 53 : 56) * Math.cos(rad);
                      const y2 = 100 + (i % 2 === 0 ? 53 : 56) * Math.sin(rad);
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#3A3630"
                          strokeWidth={i % 2 === 0 ? "2" : "1"}
                        />
                      );
                    })}
                    
                    {/* Scale Numbers */}
                    {[0, 2, 4, 6, 8, 10].map((num, idx) => {
                      const angle = -140 + (idx * 56);
                      const rad = (angle * Math.PI) / 180;
                      const x = 100 + 45 * Math.cos(rad);
                      const y = 100 + 45 * Math.sin(rad);
                      return (
                        <text
                          key={num}
                          x={x}
                          y={y}
                          fill="#3A3630"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {num}
                        </text>
                      );
                    })}
                    
                    {/* Label */}
                    <text x="100" y="80" fill="#5A4A3A" fontSize="9" fontWeight="bold" textAnchor="middle">
                      CONTACTS
                    </text>
                    
                    {/* Needle */}
                    <g transform={`rotate(${-140 + (contacts.length * 28)}, 100, 100)`}>
                      <line x1="100" y1="100" x2="100" y2="45" stroke="#D4A574" strokeWidth="3" strokeLinecap="round"/>
                      <circle cx="100" cy="100" r="6" fill="#D4A574" stroke="#3A3630" strokeWidth="2"/>
                    </g>
                    
                    {/* Center Cap */}
                    <circle cx="100" cy="100" r="3" fill="#3A3630"/>
                  </svg>
                  
                  {/* Digital Readout */}
                  <div className="mt-3 text-center">
                    <div className="inline-block bg-[#3A3630] px-5 py-2 rounded border-2 border-[#5A4A3A]">
                      <p className="text-3xl font-bold text-[#D4A574] font-mono tracking-wider" style={{ textShadow: '0 0 8px rgba(212, 165, 116, 0.5)' }}>
                        {contacts.length}
                      </p>
                    </div>
                    <p className="text-xs text-[#5A4A3A] mt-2 font-semibold">Invited Contacts</p>
                  </div>
                </div>

                {/* Total Audience Dial */}
                <div className="flex flex-col items-center">
                  <svg width="200" height="140" viewBox="0 0 200 140" className="drop-shadow-lg">
                    {/* Outer Ring - Larger for emphasis */}
                    <circle cx="100" cy="100" r="75" fill="#3A3630" stroke="#8B7355" strokeWidth="4"/>
                    
                    {/* Dial Face */}
                    <circle cx="100" cy="100" r="70" fill="#F5F1E8" stroke="#5A4A3A" strokeWidth="2"/>
                    
                    {/* Colored Arc Segments */}
                    <defs>
                      <linearGradient id="totalArcGradient">
                        <stop offset="0%" stopColor="#E87461" />
                        <stop offset="50%" stopColor="#D4A574" />
                        <stop offset="100%" stopColor="#7BD3C4" />
                      </linearGradient>
                    </defs>
                    
                    {/* Background Arc */}
                    <path
                      d="M 30 100 A 70 70 0 0 1 170 100"
                      fill="none"
                      stroke="#D8CFC0"
                      strokeWidth="10"
                    />
                    
                    {/* Calculate percentage based on total */}
                    {(() => {
                      const total = members.length + contacts.length;
                      const maxTotal = 20; // Max scale
                      const percentage = (total / maxTotal) * 100;
                      const endAngle = -180 + (percentage * 1.8);
                      const rad = (endAngle * Math.PI) / 180;
                      const endX = 100 + 70 * Math.cos(rad);
                      const endY = 100 + 70 * Math.sin(rad);
                      const largeArcFlag = percentage > 50 ? 1 : 0;
                      
                      return (
                        <path
                          d={`M 30 100 A 70 70 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                          fill="none"
                          stroke="url(#totalArcGradient)"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                      );
                    })()}
                    
                    {/* Scale Marks for 0, 5, 10, 15, 20 */}
                    {[0, 5, 10, 15, 20].map((num, idx) => {
                      const angle = -180 + (idx * 45);
                      const rad = (angle * Math.PI) / 180;
                      const x1 = 100 + 60 * Math.cos(rad);
                      const y1 = 100 + 60 * Math.sin(rad);
                      const x2 = 100 + 53 * Math.cos(rad);
                      const y2 = 100 + 53 * Math.sin(rad);
                      const tx = 100 + 45 * Math.cos(rad);
                      const ty = 100 + 45 * Math.sin(rad);
                      return (
                        <g key={num}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#3A3630"
                            strokeWidth="2"
                          />
                          <text
                            x={tx}
                            y={ty}
                            fill="#3A3630"
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {num}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Label */}
                    <text x="100" y="115" fill="#5A4A3A" fontSize="8" fontWeight="bold" textAnchor="middle">
                      TOTAL AUDIENCE
                    </text>
                    
                    {/* Needle pointing to total */}
                    {(() => {
                      const total = members.length + contacts.length;
                      const angle = -180 + ((total / 20) * 180);
                      return (
                        <g transform={`rotate(${angle}, 100, 100)`}>
                          <line x1="100" y1="100" x2="100" y2="45" stroke="#E87461" strokeWidth="3" strokeLinecap="round"/>
                          <circle cx="100" cy="100" r="6" fill="#E87461" stroke="#3A3630" strokeWidth="2"/>
                        </g>
                      );
                    })()}
                    
                    {/* Center Cap */}
                    <circle cx="100" cy="100" r="3" fill="#3A3630"/>
                  </svg>
                  
                  {/* Digital Readout */}
                  <div className="mt-3 text-center">
                    <div className="inline-block bg-[#3A3630] px-5 py-2 rounded border-2 border-[#5A4A3A]">
                      <p className="text-3xl font-bold text-[#E87461] font-mono tracking-wider" style={{ textShadow: '0 0 8px rgba(232, 116, 97, 0.5)' }}>
                        {members.length + contacts.length}
                      </p>
                    </div>
                    <p className="text-xs text-[#5A4A3A] mt-2 font-semibold">Total Reach</p>
                  </div>
                </div>
              </div>
              
              {/* Legend/Breakdown */}
              <div className="mt-6 flex items-center justify-center gap-8 pt-4 border-t-2 border-[#8B7355]/30">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#7BD3C4] border-2 border-[#3A3630]"></div>
                  <span className="text-sm text-[#5A4A3A] font-semibold">{members.length} Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#D4A574] border-2 border-[#3A3630]"></div>
                  <span className="text-sm text-[#5A4A3A] font-semibold">{contacts.length} Contacts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#E87461] border-2 border-[#3A3630]"></div>
                  <span className="text-sm text-[#5A4A3A] font-semibold">{members.length + contacts.length} Total</span>
                </div>
              </div>
                </div>
              )}
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({members.length + contacts.length})</TabsTrigger>
              <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
              <TabsTrigger value="contacts">Contacts ({contacts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name..."
                    className="border-0 focus-visible:ring-0 p-0 h-auto"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={viewMode === 'list' ? "w-8 h-8 bg-purple-100" : "w-8 h-8"}
                    onClick={() => setViewMode('list')}
                  >
                    <List className={viewMode === 'list' ? "w-4 h-4 text-purple-600" : "w-4 h-4"} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={viewMode === 'grid' ? "w-8 h-8 bg-purple-100" : "w-8 h-8"}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className={viewMode === 'grid' ? "w-4 h-4 text-purple-600" : "w-4 h-4"} />
                  </Button>
                </div>
              </div>

              {/* Create Tag Button */}
              <div>
                <Button
                  onClick={() => handleOpenTagModal()}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create / Edit Tag
                </Button>
              </div>

              {/* Custom Tags Filter */}
              {customTags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Filter by tag:</span>
                  <Button
                    variant={filterByTag === null ? "default" : "outline"}
                    size="sm"
                    className={filterByTag === null ? "rounded-full bg-purple-600 hover:bg-purple-700" : "rounded-full"}
                    onClick={() => setFilterByTag(null)}
                  >
                    All
                  </Button>
                  {customTags.map((tag) => (
                    <div key={tag.id} className="relative group">
                      <Button
                        variant={filterByTag === tag.id ? "default" : "outline"}
                        size="sm"
                        className={filterByTag === tag.id ? "rounded-full bg-purple-600 hover:bg-purple-700 pr-8" : "rounded-full pr-8"}
                        onClick={() => setFilterByTag(tag.id)}
                      >
                        {tag.name}
                      </Button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTag(tag.id);
                        }}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* All Cards Grid */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-3 gap-6">
                  {[...filteredMembers, ...contacts].map((person) => (
                    <Card
                      key={person.id}
                      className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOpenMemberDetail(person)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className={`w-12 h-12 ring-2 ${person.hasKyozoAccount === false ? 'ring-blue-500' : 'ring-purple-500'}`}>
                          <AvatarImage src={person.avatar} />
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {person.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1">{person.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{person.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={person.status === 'Active' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-700 hover:bg-gray-100"}>
                          {person.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {person.hasKyozoAccount === false ? 'Added' : 'Joined'} {person.joinedDate}
                        </span>
                      </div>
                      {person.hasKyozoAccount === false ? (
                        <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-700 border-blue-200 text-xs">
                          Imported Contact
                        </Badge>
                      ) : (
                        person.tags.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            {person.tags.map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="rounded-full bg-purple-50 text-purple-700 border-purple-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )
                      )}
                    </Card>
                  ))}
                </div>
              )}

              {/* All List View */}
              {viewMode === 'list' && (
                <div className="space-y-2">
                  {[...filteredMembers, ...contacts].map((person) => (
                    <Card key={person.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 p-4">
                        <Checkbox
                          checked={bulkSelectedMemberIds.includes(person.id)}
                          onCheckedChange={() => handleToggleBulkSelection(person.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="data-[state=checked]:bg-purple-600"
                        />
                        <button
                          onClick={() => handleOpenMemberDetail(person)}
                          className="flex items-center gap-4 flex-1 min-w-0 text-left"
                        >
                          <Avatar className={`w-10 h-10 ring-2 ${person.hasKyozoAccount === false ? 'ring-blue-500' : 'ring-purple-500'}`}>
                            <AvatarImage src={person.avatar} />
                            <AvatarFallback className="bg-gray-200 text-gray-700">
                              {person.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0 grid grid-cols-4 gap-4 items-center">
                            <div>
                              <h3 className="font-medium">{person.name}</h3>
                              <p className="text-sm text-gray-600 truncate">{person.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={person.status === 'Active' ? "bg-green-100 text-green-700 hover:bg-green-100 text-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs"}>
                                {person.status}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                {person.hasKyozoAccount === false ? 'Added' : 'Joined'} {person.joinedDate}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              {person.hasKyozoAccount === false ? (
                                <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                  Imported Contact
                                </Badge>
                              ) : (
                                person.tags.length > 0 ? (
                                  person.tags.map((tag, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="rounded-full bg-purple-50 text-purple-700 border-purple-200 text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-sm text-gray-400">No tags</span>
                                )
                              )}
                            </div>
                          </div>
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name..."
                    className="border-0 focus-visible:ring-0 p-0 h-auto"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={viewMode === 'list' ? "w-8 h-8 bg-purple-100" : "w-8 h-8"}
                    onClick={() => setViewMode('list')}
                  >
                    <List className={viewMode === 'list' ? "w-4 h-4 text-purple-600" : "w-4 h-4"} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={viewMode === 'grid' ? "w-8 h-8 bg-purple-100" : "w-8 h-8"}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className={viewMode === 'grid' ? "w-4 h-4 text-purple-600" : "w-4 h-4"} />
                  </Button>
                </div>
              </div>

              {/* Create Tag Button */}
              <div>
                <Button
                  onClick={() => handleOpenTagModal()}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create / Edit Tag
                </Button>
              </div>

              {/* Custom Tags Filter */}
              {customTags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Filter by tag:</span>
                  <Button
                    variant={filterByTag === null ? "default" : "outline"}
                    size="sm"
                    className={filterByTag === null ? "rounded-full bg-purple-600 hover:bg-purple-700" : "rounded-full"}
                    onClick={() => setFilterByTag(null)}
                  >
                    All
                  </Button>
                  {customTags.map((tag) => (
                    <div key={tag.id} className="relative group">
                      <Button
                        variant={filterByTag === tag.id ? "default" : "outline"}
                        size="sm"
                        className={filterByTag === tag.id ? "rounded-full bg-purple-600 hover:bg-purple-700 pr-8" : "rounded-full pr-8"}
                        onClick={() => setFilterByTag(tag.id)}
                      >
                        {tag.name}
                      </Button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTag(tag.id);
                        }}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Member Cards Grid */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-3 gap-6">
                  {filteredMembers.map((member) => (
                    <Card
                      key={member.id}
                      className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOpenMemberDetail(member)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="w-12 h-12 ring-2 ring-purple-500">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1">{member.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {member.status}
                        </Badge>
                        <span className="text-sm text-gray-500">Joined {member.joinedDate}</span>
                      </div>
                      {member.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {member.tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="rounded-full bg-purple-50 text-purple-700 border-purple-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}

              {/* Member List View */}
              {viewMode === 'list' && (
                <div className="space-y-2">
                  {filteredMembers.map((member) => (
                    <Card key={member.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 p-4">
                        <Checkbox
                          checked={bulkSelectedMemberIds.includes(member.id)}
                          onCheckedChange={() => handleToggleBulkSelection(member.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="data-[state=checked]:bg-purple-600"
                        />
                        <button
                          onClick={() => handleOpenMemberDetail(member)}
                          className="flex items-center gap-4 flex-1 min-w-0 text-left"
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-gray-200 text-gray-700">
                              {member.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0 grid grid-cols-4 gap-4 items-center">
                            <div>
                              <h3 className="font-medium">{member.name}</h3>
                              <p className="text-sm text-gray-600 truncate">{member.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                                {member.status}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Joined {member.joinedDate}</p>
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              {member.tags.length > 0 ? (
                                member.tags.map((tag, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="rounded-full bg-purple-50 text-purple-700 border-purple-200 text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-sm text-gray-400">No tags</span>
                              )}
                            </div>
                          </div>
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="contacts" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name..."
                    className="border-0 focus-visible:ring-0 p-0 h-auto"
                  />
                </div>
                <Button
                  onClick={handleOpenReminderModal}
                  className="bg-[#6B8A4E] hover:bg-[#5A7841] text-white gap-2"
                  disabled={contacts.length === 0}
                >
                  <Send className="w-4 h-4" />
                  Send Invite Reminder ({contacts.length})
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={viewMode === 'list' ? "w-8 h-8 bg-purple-100" : "w-8 h-8"}
                    onClick={() => setViewMode('list')}
                  >
                    <List className={viewMode === 'list' ? "w-4 h-4 text-purple-600" : "w-4 h-4"} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={viewMode === 'grid' ? "w-8 h-8 bg-purple-100" : "w-8 h-8"}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className={viewMode === 'grid' ? "w-4 h-4 text-purple-600" : "w-4 h-4"} />
                  </Button>
                </div>
              </div>

              {/* Contact Cards Grid */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-3 gap-6">
                  {contacts.map((contact) => (
                    <Card
                      key={contact.id}
                      className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleOpenMemberDetail(contact)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="w-12 h-12 ring-2 ring-blue-500">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-gray-200 text-gray-700">
                            {contact.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1">{contact.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={contact.status === 'Active' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-700 hover:bg-gray-100"}>
                          {contact.status}
                        </Badge>
                        <span className="text-sm text-gray-500">Added {contact.joinedDate}</span>
                      </div>
                      <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-700 border-blue-200 text-xs">
                        Imported Contact
                      </Badge>
                    </Card>
                  ))}
                </div>
              )}

              {/* Contact List View */}
              {viewMode === 'list' && (
                <div className="space-y-2">
                  {contacts.map((contact) => (
                    <Card key={contact.id} className="hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 p-4">
                        <Checkbox
                          checked={bulkSelectedMemberIds.includes(contact.id)}
                          onCheckedChange={() => handleToggleBulkSelection(contact.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="data-[state=checked]:bg-purple-600"
                        />
                        <button
                          onClick={() => handleOpenMemberDetail(contact)}
                          className="flex items-center gap-4 flex-1 min-w-0 text-left"
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback className="bg-gray-200 text-gray-700">
                              {contact.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0 grid grid-cols-4 gap-4 items-center">
                            <div>
                              <h3 className="font-medium">{contact.name}</h3>
                              <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={contact.status === 'Active' ? "bg-green-100 text-green-700 hover:bg-green-100 text-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs"}>
                                {contact.status}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Added {contact.joinedDate}</p>
                            </div>
                            <div>
                              <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                Imported Contact
                              </Badge>
                            </div>
                          </div>
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Custom Tag Modal */}
      <Dialog open={tagModalOpen} onOpenChange={openedFromMemberModal ? handleBackToMemberModal : handleCloseTagModal}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {openedFromMemberModal && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={handleBackToMemberModal}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div className="flex-1">
                <DialogTitle className="text-2xl">
                  {selectedTagId && customTags.find(t => t.id === selectedTagId) ? 'Edit Custom Tag' : 'Create Custom Tag'}
                </DialogTitle>
                <DialogDescription>
                  {selectedTagId && customTags.find(t => t.id === selectedTagId)
                    ? 'Modify the tag name or change which members have this tag'
                    : 'Create a new tag and assign it to members'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 flex-1 overflow-hidden">
            {/* Left Column - Tag Name */}
            <div className="flex flex-col">
              <div className="mb-6">
                <Label htmlFor="tag-name" className="text-sm font-medium mb-2 block">
                  Name your custom tag
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="tag-name"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="e.g., VVIP"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSaveTag}
                    disabled={!tagName.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save Tag
                  </Button>
                </div>
                {isSavedTag && (
                  <p className="text-xs text-green-600 mt-2">✓ Tag saved! Now select members to apply it to.</p>
                )}
              </div>

              {/* Existing Tags */}
              {customTags.length > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Existing Tags
                  </Label>
                  <div className="space-y-2">
                    {customTags.map((tag) => (
                      <Button
                        key={tag.id}
                        variant={selectedTagId === tag.id ? "default" : "outline"}
                        size="sm"
                        className={selectedTagId === tag.id ? "w-full justify-start rounded-full bg-purple-600 hover:bg-purple-700" : "w-full justify-start rounded-full"}
                        onClick={() => {
                          setSelectedTagId(tag.id);
                          setTagName(tag.name);
                          setSelectedMemberIds(tag.memberIds);
                        }}
                      >
                        {tag.name} ({tag.memberIds.length})
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Member List */}
            <div className="flex flex-col overflow-hidden">
              <Label className="text-sm font-medium mb-3 block">
                Select Members ({selectedMemberIds.length} selected)
              </Label>
              {/* Search Box */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search members..."
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex-1 overflow-auto border rounded-lg p-3 space-y-2">
                {modalFilteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <Checkbox
                      checked={selectedMemberIds.includes(member.id)}
                      onCheckedChange={() => handleToggleMember(member.id)}
                      disabled={!isSavedTag}
                      className="data-[state=checked]:bg-purple-600"
                    />
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500 truncate">{member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <Button variant="outline" onClick={handleCloseTagModal}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleApplyTag}
              disabled={!canApply}
            >
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Member Detail Modal */}
      <Dialog open={memberDetailOpen} onOpenChange={setMemberDetailOpen}>
        <DialogContent className="max-w-[95vw] w-[95vw] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="text-2xl">
                {selectedMember?.hasKyozoAccount === false ? 'Contact Details' : 'Member Details'}
              </DialogTitle>
              {selectedMember && selectedMember.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedMember.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="rounded-full bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <DialogDescription>
              {selectedMember?.hasKyozoAccount === false 
                ? 'View and manage contact information and history' 
                : 'View and manage member information, tier, and event history'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="grid grid-cols-[1.5fr,1fr] gap-8 flex-1 overflow-hidden">
              {/* Left Column - Member Info */}
              <div className="space-y-6 overflow-auto pr-4">
                {/* Member Header */}
                <div className="flex items-start gap-4 pb-6 border-b">
                  <Avatar className={`w-20 h-20 ring-2 ${selectedMember.hasKyozoAccount === false ? 'ring-blue-500' : 'ring-purple-500'}`}>
                    <AvatarImage src={selectedMember.avatar} />
                    <AvatarFallback className={selectedMember.hasKyozoAccount === false ? "bg-blue-200 text-blue-700 text-2xl" : "bg-purple-200 text-purple-700 text-2xl"}>
                      {selectedMember.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-1">{selectedMember.name}</h2>
                    <p className="text-gray-600 mb-3">{selectedMember.email}</p>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {selectedMember.status}
                    </Badge>
                  </div>
                </div>

                {/* Member Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">Joined Date</Label>
                    <p className="font-medium">{selectedMember.joinedDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">Member ID</Label>
                    <p className="font-medium font-mono text-sm">{selectedMember.id}</p>
                  </div>
                </div>

                {/* Member Tier Selection */}
                <div>
                  <Label className="text-sm text-gray-600 mb-3 block">Member Tier</Label>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="tier-observe"
                        checked={memberTier === 'observe'}
                        onCheckedChange={(checked) =>
                          setMemberTier(checked ? 'observe' : null)
                        }
                        className="data-[state=checked]:bg-purple-600 mt-0.5"
                      />
                      <div>
                        <label htmlFor="tier-observe" className="font-medium cursor-pointer">
                          Observe (View Only)
                        </label>
                        <p className="text-sm text-gray-500">Member can view content but not interact</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="tier-resonate"
                        checked={memberTier === 'resonate'}
                        onCheckedChange={(checked) =>
                          setMemberTier(checked ? 'resonate' : null)
                        }
                        className="data-[state=checked]:bg-purple-600 mt-0.5"
                      />
                      <div>
                        <label htmlFor="tier-resonate" className="font-medium cursor-pointer">
                          Resonate (Can React to Posts)
                        </label>
                        <p className="text-sm text-gray-500">Member can react with emojis and likes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="tier-communicate"
                        checked={memberTier === 'communicate'}
                        onCheckedChange={(checked) =>
                          setMemberTier(checked ? 'communicate' : null)
                        }
                        className="data-[state=checked]:bg-purple-600 mt-0.5"
                      />
                      <div>
                        <label htmlFor="tier-communicate" className="font-medium cursor-pointer">
                          Communicate (Can Respond)
                        </label>
                        <p className="text-sm text-gray-500">Member can comment and create posts</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleOpenTagModalFromMember}
                  >
                    <Plus className="w-4 h-4" />
                    Add Custom Tag
                  </Button>
                  <div className="flex-1" />
                  <Button variant="outline">
                    Edit Member
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Send Message
                  </Button>
                </div>
              </div>

              {/* Right Column - Purchase & Attendance History */}
              <div className="border-l pl-8 flex flex-col overflow-hidden">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">Purchase & Attendance History</h3>
                  <p className="text-sm text-gray-500">Events attended through ticket partners</p>
                </div>
                <div className="flex-1 overflow-auto space-y-3 pr-2">
                  {memberEventHistory.length > 0 ? (
                    memberEventHistory.map((event) => (
                      <Card key={event.id} className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <img
                            src={platformLogos[event.platform]}
                            alt={event.platform}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1 line-clamp-2">{event.eventName}</h4>
                            <p className="text-xs text-gray-500 capitalize">{event.platform}</p>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium">{event.eventDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Ticket Type:</span>
                            <span className="font-medium">{event.ticketType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-semibold text-purple-600">{event.price}</span>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-8">No purchase history available</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Member Modal */}
      <Dialog open={addMemberModalOpen} onOpenChange={setAddMemberModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Member</DialogTitle>
            <DialogDescription>
              Manually add a member to your community
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="member-name" className="text-sm font-medium mb-2 block">
                Full Name
              </Label>
              <Input
                id="member-name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Enter member name"
              />
            </div>

            <div>
              <Label htmlFor="member-email" className="text-sm font-medium mb-2 block">
                Email Address
              </Label>
              <Input
                id="member-email"
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setAddMemberModalOpen(false);
                setNewMemberName('');
                setNewMemberEmail('');
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              disabled={!newMemberName.trim() || !newMemberEmail.trim()}
              onClick={() => {
                // Handle adding member logic here
                alert(`Member ${newMemberName} (${newMemberEmail}) would be added here`);
                setAddMemberModalOpen(false);
                setNewMemberName('');
                setNewMemberEmail('');
              }}
            >
              Add Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invite Member Modal */}
      <Dialog open={inviteMemberModalOpen} onOpenChange={setInviteMemberModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Invite Member</DialogTitle>
            <DialogDescription>
              Share your community invite link with potential members
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Community Invite Link
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value="https://kyozo.com/join/your-community-name"
                  className="bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText('https://kyozo.com/join/your-community-name');
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                >
                  {linkCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              {linkCopied && (
                <p className="text-xs text-green-600 mt-2">✓ Link copied to clipboard!</p>
              )}
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-sm mb-2 text-purple-900">How it works</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Share this link with people you want to invite</li>
                <li>• They'll be taken to your community invite form</li>
                <li>• Once they accept the invite, they'll appear in your Members list</li>
              </ul>
            </div>

            {/* Customize Invite Button */}
            <div className="p-4 bg-[#F5F1E8] border border-[#D4C89F] rounded-lg">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1 text-[#6B8A4E]">Customize Your Invite Page</h4>
                  <p className="text-xs text-gray-600">
                    Personalize your community invite with custom colors and branding
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 border-[#7BD3C4] text-[#7BD3C4] hover:bg-[#7BD3C4] hover:text-white"
                  onClick={() => {
                    setInviteMemberModalOpen(false);
                    setLinkCopied(false);
                    if (onNavigateToDisplaySettings) {
                      onNavigateToDisplaySettings();
                    }
                  }}
                >
                  Customize
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setInviteMemberModalOpen(false);
                setLinkCopied(false);
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Member Modal */}
      <Dialog open={importMemberModalOpen} onOpenChange={setImportMemberModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Import Members</DialogTitle>
            <DialogDescription>
              Upload a CSV file or import from connected platforms
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* CSV Upload */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Upload CSV File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="font-medium mb-1">Drop your CSV file here, or click to browse</p>
                <p className="text-sm text-gray-500">CSV should include columns: Name, Email</p>
                <Button variant="outline" className="mt-4">
                  Select File
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR IMPORT FROM</span>
              </div>
            </div>

            {/* Third Party Integrations */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Connected Platforms</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => alert('Eventbrite import would happen here')}
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold">EB</span>
                  </div>
                  <span className="font-medium">Eventbrite</span>
                  <span className="text-xs text-gray-500">Import attendees</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => alert('Resident Advisor import would happen here')}
                >
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">RA</span>
                  </div>
                  <span className="font-medium">Resident Advisor</span>
                  <span className="text-xs text-gray-500">Import attendees</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => alert('Gmail import would happen here')}
                >
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold">G</span>
                  </div>
                  <span className="font-medium">Gmail</span>
                  <span className="text-xs text-gray-500">Import contacts</span>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => alert('SevenRooms import would happen here')}
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">7R</span>
                  </div>
                  <span className="font-medium">SevenRooms</span>
                  <span className="text-xs text-gray-500">Import guests</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setImportMemberModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Invite Reminder Modal */}
      <Dialog open={sendReminderModalOpen} onOpenChange={setSendReminderModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Send Invite Reminder</DialogTitle>
            <DialogDescription>
              Send a reminder message to all contacts ({contacts.length}) who haven't accepted their invite yet, including your custom community invite link.
            </DialogDescription>
          </DialogHeader>

          {!remindersSent ? (
            <>
              <div className="space-y-6 mt-4">
                {/* Info Card */}
                <Card className="p-4 bg-[#F5F1E8] border border-[#D4C89F]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#6B8A4E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1 text-[#6B8A4E]">Who will receive this?</h4>
                      <p className="text-xs text-gray-600">
                        This reminder will be sent to all {contacts.length} contact{contacts.length !== 1 ? 's' : ''} who haven't joined your community yet. They'll receive the message with your custom invite link.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Message Editor */}
                <div>
                  <Label htmlFor="reminder-message" className="mb-2 block">
                    Reminder Message
                  </Label>
                  <Textarea
                    id="reminder-message"
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    rows={10}
                    className="font-mono text-sm"
                    placeholder="Write your reminder message..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    The invite link is already included in your message. Feel free to customize it!
                  </p>
                </div>

                {/* Preview Card */}
                <Card className="p-4 bg-gray-50">
                  <Label className="mb-3 block text-sm font-semibold">Preview</Label>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                      <div className="w-8 h-8 rounded-full bg-[#E87461] flex items-center justify-center text-white text-sm font-semibold">
                        K
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Your Community</p>
                        <p className="text-xs text-gray-500">community@kyozo.com</p>
                      </div>
                    </div>
                    <p className="text-sm whitespace-pre-wrap text-gray-700">
                      {reminderMessage || 'Your message will appear here...'}
                    </p>
                  </div>
                </Card>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setSendReminderModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendReminders}
                  className="bg-[#6B8A4E] hover:bg-[#5A7841] text-white gap-2"
                  disabled={!reminderMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                  Send to {contacts.length} Contact{contacts.length !== 1 ? 's' : ''}
                </Button>
              </div>
            </>
          ) : (
            <div className="py-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reminders Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Your invite reminder has been sent to {contacts.length} contact{contacts.length !== 1 ? 's' : ''}.
                </p>
                <div className="p-4 bg-[#F5F1E8] border border-[#D4C89F] rounded-lg">
                  <p className="text-sm text-gray-700">
                    💡 <strong>Tip:</strong> You can track invite conversions by checking when new members join your community.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}