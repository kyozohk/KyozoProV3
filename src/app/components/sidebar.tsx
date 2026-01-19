import { BarChart3, Grid3x3, Inbox, MessageSquare, Radio, Send, Settings, Ticket, Zap, LayoutDashboard, Users, ClipboardList, Calendar, Plus, ChevronDown, Check, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
// import logoImage from 'figma:asset/da66afec8308d820a80087d80cf52148e60777e5.png';
import { useState, useRef, useEffect } from 'react';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onOpenSettings: () => void;
}

interface Community {
  id: string;
  name: string;
  avatar?: string;
  fallback: string;
  color: string;
}

export function Sidebar({ currentScreen, onNavigate, onOpenSettings }: SidebarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community>({
    id: 'willer',
    name: 'Willer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    fallback: 'W',
    color: '#D4A574'
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const communities: Community[] = [
    {
      id: 'willer',
      name: 'Willer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      fallback: 'W',
      color: '#D4A574'
    },
    {
      id: 'spinsun',
      name: 'Spinsun',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      fallback: 'S',
      color: '#7BD3C4'
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleCommunitySwitch = (community: Community) => {
    setSelectedCommunity(community);
    setDropdownOpen(false);
  };

  const menuItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: LayoutDashboard, 
      color: '#4A5568',
      tooltip: 'Your community dashboard at a glance. View key metrics, engagement statistics, member milestones, and insights about how your community is growing and thriving.'
    },
    { 
      id: 'members', 
      label: 'Audience', 
      icon: Users, 
      color: '#8BA888',
      tooltip: 'Kyozo makes audience building and management seamless. This section helps you invite people to join your community and organize all of their contact details in a structure that you own and then you can then utilize.'
    },
    { 
      id: 'broadcast', 
      label: 'Broadcast', 
      icon: Send, 
      color: '#E87461',
      tooltip: 'Send announcements and content to your community members via multiple channels. Choose from email, WhatsApp, or in-app messaging to reach your audience effectively.'
    },
    { 
      id: 'rsvp', 
      label: 'RSVP & Guestlists', 
      icon: ClipboardList, 
      color: '#C97B63',
      tooltip: 'Manage event attendance and guest lists with ease. Track RSVPs, set attendance preferences, create custom guest lists, and manage who can attend your community events.'
    },
    { 
      id: 'schedule', 
      label: 'Schedule', 
      icon: Calendar, 
      color: '#D4A574',
      tooltip: 'Plan and organize your community events with a comprehensive calendar system. Create events, manage schedules, and track attendance metrics all in one place.'
    },
    { 
      id: 'inbox', 
      label: 'Inbox', 
      icon: Inbox, 
      color: '#6B9BB5',
      tooltip: 'Communicate directly with your community members. View and respond to messages, manage conversations, and stay connected with individual members of your community.'
    },
    { 
      id: 'feed', 
      label: 'Feed', 
      icon: Radio, 
      color: '#9B6B9E',
      tooltip: 'Share content and updates with your community. Post text, audio, images, and video that your members can engage with, creating a vibrant content hub for your community.'
    },
    { 
      id: 'integrations', 
      label: 'Integrations', 
      icon: Zap, 
      color: '#6B9BB5',
      tooltip: 'Connect your community with external platforms and tools. Integrate with services like Eventbrite, Zoom, and other third-party applications to enhance your community experience.'
    },
    { 
      id: 'more-features', 
      label: 'More Features...', 
      icon: Plus, 
      color: '#8B7355', 
      isGreyedOut: true,
      tooltip: 'Explore premium add-on features like advanced analytics and ticketing solutions. These optional features enhance your community management capabilities beyond the core product.'
    },
  ];

  return (
    <div className="w-[200px] bg-[#FDFCFA] h-screen flex flex-col border-r border-[#E8DFD0] shadow-sm">
      {/* Logo */}
      <div className="p-2 border-b border-[#E8DFD0]">
        {/* <img src={logoImage} alt="Kyozo" className="w-full h-auto" /> */}
        <div className="w-full h-auto">
          <h1 className="text-2xl font-bold">Kyozo</h1>
        </div>
      </div>

      {/* Header - Community Switcher */}
      <div className="p-4 relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center gap-3 hover:bg-[#F5F1E8] rounded-xl p-2 -m-2 transition-colors"
        >
          <Avatar className="w-12 h-12 ring-2 ring-[#D4A574]/30">
            <AvatarImage src={selectedCommunity.avatar} />
            <AvatarFallback className="text-white" style={{ backgroundColor: selectedCommunity.color }}>
              {selectedCommunity.fallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="font-semibold text-[#3A3630]">{selectedCommunity.name}</p>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-[#8B7355] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-xl border-2 border-[#E8DFD0] z-50 overflow-hidden">
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-bold text-[#8B7355] uppercase tracking-wider">
                Your Communities
              </div>
              {communities.map((community) => (
                <button
                  key={community.id}
                  onClick={() => handleCommunitySwitch(community)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#F5F1E8] transition-colors"
                >
                  <Avatar className="w-10 h-10 ring-2 ring-[#E8DFD0]">
                    <AvatarImage src={community.avatar} />
                    <AvatarFallback className="text-white" style={{ backgroundColor: community.color }}>
                      {community.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm text-[#3A3630]">{community.name}</p>
                  </div>
                  {selectedCommunity.id === community.id && (
                    <Check className="w-4 h-4 text-[#7BD3C4]" />
                  )}
                </button>
              ))}
            </div>
            <div className="border-t border-[#E8DFD0] px-3 py-2.5">
              <button className="w-full flex items-center gap-2 text-sm text-[#6B9BB5] hover:text-[#5A8AA5] font-medium">
                <Plus className="w-4 h-4" />
                <span>Add Community</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const isGreyedOut = item.isGreyedOut;
          
          const buttonContent = (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                isActive
                  ? 'bg-[#E8DFD0] text-[#3A3630] font-semibold shadow-sm'
                  : isGreyedOut
                  ? 'text-[#A39A8E] hover:bg-[#F5F1E8] opacity-75'
                  : 'text-[#6B6358] hover:bg-[#F5F1E8]'
              }`}
            >
              <Icon
                className="w-4 h-4 flex-shrink-0"
                style={{ color: isActive ? item.color : isGreyedOut ? '#A39A8E' : undefined }}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.tooltip && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
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
            </button>
          );
          
          return buttonContent;
        })}
      </nav>

      {/* Settings Button */}
      <div className="p-4 border-t border-[#E8DFD0]">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#6B6358] hover:bg-[#F5F1E8] transition-all"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* User Initial Badge at Bottom */}
      <div className="p-4 flex justify-center">
        <div className="w-10 h-10 rounded-full bg-[#D4A574] flex items-center justify-center text-sm font-semibold text-white shadow-md">
          D
        </div>
      </div>
    </div>
  );
}