'use client';

import { useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { OverviewScreen } from '../components/overview-screen';
import { MembersScreen } from '../components/members-screen';
import { InboxScreen } from '../components/inbox-screen';
import { FeedScreen } from '../components/feed-screen';
import { IntegrationsScreen } from '../components/integrations-screen';
import { BroadcastScreen } from '../components/broadcast-screen';
import { RSVPScreen } from '../components/rsvp-screen';
import { ScheduleScreen } from '../components/schedule-screen';
import { MoreFeaturesScreen } from '../components/more-features-screen';
import { SettingsModal } from '../components/settings-modal';
import { FeatureModal } from '../components/feature-modal';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';

// Shared data types
export interface Member {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
  avatar?: string;
  tags: string[];
  hasKyozoAccount?: boolean;
}

export interface GuestListItem extends Member {
  status: 'pending' | 'confirmed' | 'declined' | 'not-sent';
}

export interface GuestList {
  id: string;
  name: string;
  created: string;
  guests: GuestListItem[];
  sentCount: number;
  confirmedCount: number;
  declinedCount: number;
  pendingCount: number;
}

export interface CustomTag {
  id: string;
  name: string;
  memberIds: string[];
}

const initialMembers: Member[] = [
  { id: '1', name: 'Ashok Jaiswal', email: 'ashok.jaiswal@gmail.com', status: 'Active', joinedDate: 'Dec 14, 2025', tags: [], hasKyozoAccount: true },
  { id: '2', name: 'Nikki Davies', email: 'nikkijdavies.com', status: 'Active', joinedDate: 'Dec 28, 2025', tags: [], hasKyozoAccount: true },
  { id: '3', name: 'Will Poole', email: 'will@kyozo.com', status: 'Active', joinedDate: 'Dec 10, 2025', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', tags: [], hasKyozoAccount: true },
  { id: '4', name: 'Ashok Jaiswal', email: 'ashok.jaiswal@gmail.com', status: 'Active', joinedDate: 'Dec 30, 2025', tags: [], hasKyozoAccount: true },
  { id: '5', name: 'Unknown', email: '', status: 'Active', joinedDate: 'Dec 13, 2025', tags: [], hasKyozoAccount: true },
  { id: '6', name: 'Ashok Jaiswal', email: 'ashok@kyozo.com', status: 'Active', joinedDate: 'Dec 10, 2025', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', tags: [], hasKyozoAccount: true },
];

const initialContacts: Member[] = [
  { id: 'c1', name: 'Sarah Mitchell', email: 'sarah.mitchell@email.com', status: 'Active', joinedDate: 'Jan 5, 2026', tags: [], hasKyozoAccount: false },
  { id: 'c2', name: 'James Rodriguez', email: 'james.r@email.com', status: 'Active', joinedDate: 'Jan 3, 2026', avatar: 'https://i.pravatar.cc/150?img=12', tags: [], hasKyozoAccount: false },
  { id: 'c3', name: 'Emily Chen', email: 'emily.chen@email.com', status: 'Active', joinedDate: 'Dec 28, 2025', avatar: 'https://i.pravatar.cc/150?img=45', tags: [], hasKyozoAccount: false },
  { id: 'c4', name: 'Marcus Johnson', email: 'marcus@email.com', status: 'Inactive', joinedDate: 'Dec 20, 2025', tags: [], hasKyozoAccount: false },
  { id: 'c5', name: 'Lisa Anderson', email: 'l.anderson@email.com', status: 'Active', joinedDate: 'Jan 2, 2026', avatar: 'https://i.pravatar.cc/150?img=32', tags: [], hasKyozoAccount: false },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('overview');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [displaySettingsOpen, setDisplaySettingsOpen] = useState(false);
  const [openInviteCustomizer, setOpenInviteCustomizer] = useState(false);
  
  // Shared state for members and contacts
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [contacts, setContacts] = useState<Member[]>(initialContacts);
  const [guestLists, setGuestLists] = useState<GuestList[]>([]);
  const [customTags, setCustomTags] = useState<CustomTag[]>([]);

  // Debug: Log guest lists whenever they change
  console.log('App component - Guest Lists:', guestLists.length, guestLists);

  const handleNavigateToDisplaySettings = () => {
    setCurrentScreen('overview');
    // Use setTimeout to ensure the screen changes first
    setTimeout(() => {
      setDisplaySettingsOpen(true);
      setOpenInviteCustomizer(true);
    }, 100);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'overview':
        return (
          <OverviewScreen 
            initialDisplaySettingsOpen={displaySettingsOpen}
            initialInviteCustomizerOpen={openInviteCustomizer}
          />
        );
      case 'members':
        return (
          <MembersScreen 
            members={members}
            setMembers={setMembers}
            contacts={contacts}
            setContacts={setContacts}
            customTags={customTags}
            setCustomTags={setCustomTags}
            onNavigateToDisplaySettings={handleNavigateToDisplaySettings}
          />
        );
      case 'inbox':
        return <InboxScreen />;
      case 'feed':
        return <FeedScreen />;
      case 'integrations':
        return <IntegrationsScreen />;
      case 'broadcast':
        return <BroadcastScreen />;
      case 'rsvp':
        return (
          <RSVPScreen 
            members={members}
            contacts={contacts}
            setMembers={setMembers}
            guestLists={guestLists}
            setGuestLists={setGuestLists}
            customTags={customTags}
          />
        );
      case 'schedule':
        return <ScheduleScreen customTags={customTags} />;
      case 'more-features':
        return <MoreFeaturesScreen />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
              </h2>
              <p className="text-gray-600">This screen is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F1E8]">
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      
      <div className="flex-1 relative">
        {renderScreen()}
        
        {/* Floating Action Button */}
        <Button
          size="icon"
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#E87461] hover:bg-[#D76451] shadow-xl transition-all hover:scale-105"
          onClick={() => setFeatureModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Modals */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <FeatureModal
        open={featureModalOpen}
        onClose={() => setFeatureModalOpen(false)}
      />
    </div>
  );
}