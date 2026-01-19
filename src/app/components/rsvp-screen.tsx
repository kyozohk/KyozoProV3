import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Mail, 
  Search,
  ArrowLeft,
  Send,
  Download,
  MessageCircle,
  Tag,
  Settings
} from 'lucide-react';
import type { Member, GuestList, GuestListItem, CustomTag } from '../App';

interface RSVPScreenProps {
  members: Member[];
  contacts: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  guestLists: GuestList[];
  setGuestLists: React.Dispatch<React.SetStateAction<GuestList[]>>;
  customTags: CustomTag[];
}

export function RSVPScreen({ members, contacts, setMembers, guestLists, setGuestLists, customTags }: RSVPScreenProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState<GuestList | null>(null);
  const [manageGuestsOpen, setManageGuestsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');
  const [customGuests, setCustomGuests] = useState<Member[]>([]);
  const [sendConfirmOpen, setSendConfirmOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportEmail, setExportEmail] = useState('');
  const [convertToTagOpen, setConvertToTagOpen] = useState(false);
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [inviteChannel, setInviteChannel] = useState<'email' | 'whatsapp' | 'kyozo'>('email');
  const [sendUserTicket, setSendUserTicket] = useState<boolean>(true);

  // Debug: Log received props
  console.log('RSVPScreen - Received guestLists:', guestLists.length, guestLists);
  console.log('RSVPScreen - Members:', members.length, 'Contacts:', contacts.length);

  const handleCreateList = () => {
    if (!newListName.trim()) return;

    const newList: GuestList = {
      id: Date.now().toString(),
      name: newListName,
      created: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      guests: [],
      sentCount: 0,
      confirmedCount: 0,
      declinedCount: 0,
      pendingCount: 0,
    };

    setGuestLists(prev => [...prev, newList]);
    setNewListName('');
    setCreateModalOpen(false);
  };

  const handleOpenManageGuests = (list: GuestList) => {
    setSelectedList(list);
    setSelectedMembers(list.guests.map(g => g.id));
    setManageGuestsOpen(true);
  };

  const handleToggleMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSaveGuests = () => {
    if (!selectedList) return;

    const updatedGuests: GuestListItem[] = selectedMembers.map(memberId => {
      const member = getAllMembers().find(m => m.id === memberId)!;
      const existingGuest = selectedList.guests.find(g => g.id === memberId);
      
      return existingGuest || {
        ...member,
        status: 'not-sent' as const,
      };
    });

    setGuestLists(prev => prev.map(list => 
      list.id === selectedList.id
        ? { ...list, guests: updatedGuests }
        : list
    ));

    setManageGuestsOpen(false);
    setSelectedList({ ...selectedList, guests: updatedGuests });
  };

  const handleSendRSVP = () => {
    if (!selectedList) return;
    setSendConfirmOpen(true);
  };

  const confirmSendRSVP = () => {
    if (!selectedList) return;

    const updatedGuests = selectedList.guests.map(guest => ({
      ...guest,
      status: guest.status === 'not-sent' ? ('pending' as const) : guest.status,
    }));

    // Simulate some responses for demo
    const guestsWithResponses = updatedGuests.map((guest, index) => {
      if (guest.status === 'pending') {
        // Randomly assign some confirmed/declined for demo
        const random = Math.random();
        if (index % 3 === 0 && random > 0.3) return { ...guest, status: 'confirmed' as const };
        if (index % 4 === 0 && random > 0.6) return { ...guest, status: 'declined' as const };
      }
      return guest;
    });

    const sentCount = guestsWithResponses.length;
    const confirmedCount = guestsWithResponses.filter(g => g.status === 'confirmed').length;
    const declinedCount = guestsWithResponses.filter(g => g.status === 'declined').length;
    const pendingCount = guestsWithResponses.filter(g => g.status === 'pending').length;

    const updatedList = {
      ...selectedList,
      guests: guestsWithResponses,
      sentCount,
      confirmedCount,
      declinedCount,
      pendingCount,
    };

    setGuestLists(prev => prev.map(list => 
      list.id === selectedList.id ? updatedList : list
    ));

    setSelectedList(updatedList);
    setSendConfirmOpen(false);
  };

  const handleExportConfirmed = () => {
    if (!exportEmail.trim() || !selectedList) return;

    const confirmedGuests = selectedList.guests.filter(g => g.status === 'confirmed');
    
    // Simulate sending email
    alert(`Confirmed guest list (${confirmedGuests.length} guests) has been sent to ${exportEmail}`);
    setExportEmail('');
    setExportModalOpen(false);
  };

  const getFilteredMembers = () => {
    if (!searchQuery) return getAllMembers();
    
    return getAllMembers().filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleBackToList = () => {
    setSelectedList(null);
    setSearchQuery('');
  };

  const handleImportFromList = (list: GuestList) => {
    // Add all guest IDs from the selected list to the current selection
    const guestIds = list.guests.map(g => g.id);
    setSelectedMembers(prev => {
      const newSet = new Set([...prev, ...guestIds]);
      return Array.from(newSet);
    });
  };

  const handleImportFromTag = (tagId: string) => {
    // Find the tag and add all member IDs from that tag
    const tag = customTags.find(t => t.id === tagId);
    if (!tag) return;
    
    setSelectedMembers(prev => {
      const newSet = new Set([...prev, ...tag.memberIds]);
      return Array.from(newSet);
    });
  };

  const handleAddCustomGuest = () => {
    if (!newGuestName.trim() || !newGuestEmail.trim()) return;

    // Create a new custom guest
    const customGuest: Member = {
      id: `custom-${Date.now()}`,
      name: newGuestName.trim(),
      email: newGuestEmail.trim(),
      status: 'Active',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop', // Default avatar
      tags: [],
      hasKyozoAccount: false,
    };

    // Add to custom guests list
    setCustomGuests(prev => [...prev, customGuest]);

    // Auto-select the new guest
    setSelectedMembers(prev => [...prev, customGuest.id]);

    // Clear form
    setNewGuestName('');
    setNewGuestEmail('');
  };

  const getAllMembers = () => {
    return [...members, ...contacts, ...customGuests].map(member => ({
      ...member,
      avatar: member.avatar || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop'
    }));
  };

  const handleConvertToTag = () => {
    if (!selectedList) return;

    // Simulate adding tag to all guests in the list
    // In a real app, this would update the member profiles in the database
    const tagName = selectedList.name;
    const guestCount = selectedList.guests.length;

    alert(`Custom tag "${tagName}" has been created and applied to ${guestCount} guests. This tag can now be used to filter members in the Audience section.`);
    setConvertToTagOpen(false);
  };

  return (
    <div className="flex-1 h-screen overflow-auto bg-gray-50">
      <div className="p-8">
        <Card className="bg-white p-8">
          {/* Header */}
          <div className="mb-8">
            {selectedList && (
              <Button
                variant="ghost"
                onClick={handleBackToList}
                className="mb-4 gap-2 -ml-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Lists
              </Button>
            )}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold mb-1">
                  {selectedList ? selectedList.name : 'RSVP & Guestlists'}
                </h1>
                <p className="text-gray-600">
                  {selectedList 
                    ? 'Manage your guest list and track RSVPs' 
                    : 'Create and manage event guest lists with RSVP tracking'}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setPreferencesModalOpen(true)}
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                RSVP Preferences
              </Button>
            </div>
          </div>

          {/* List View */}
          {!selectedList && (
            <div className="space-y-6">
              {/* Create New List Card */}
              <Card
                className="p-8 border-2 border-dashed border-purple-300 hover:border-purple-500 cursor-pointer transition-all flex items-center justify-center min-h-[160px]"
                onClick={() => setCreateModalOpen(true)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-purple-700">Create New List</h3>
                  <p className="text-sm text-gray-600 mt-1">Start a new guest list</p>
                </div>
              </Card>

              {/* Lists Section */}
              {guestLists.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">All Lists</h2>
                  <div className="space-y-3">
                    {guestLists.map((list) => (
                      <Card
                        key={list.id}
                        className="p-5 cursor-pointer transition-all hover:shadow-md border hover:border-purple-300 bg-white"
                        onClick={() => handleOpenManageGuests(list)}
                      >
                        <div className="flex items-center gap-6">
                          {/* Icon */}
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users className="w-6 h-6 text-purple-600" />
                          </div>

                          {/* List Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{list.name}</h3>
                            <p className="text-sm text-gray-600">
                              Created {list.created} • {list.guests.length} guest{list.guests.length !== 1 ? 's' : ''}
                            </p>
                          </div>

                          {/* Stats */}
                          {list.sentCount > 0 ? (
                            <div className="flex items-center gap-6 flex-shrink-0">
                              <div className="text-center">
                                <div className="flex items-center gap-1.5 text-green-700">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span className="text-lg font-semibold">{list.confirmedCount}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">Confirmed</p>
                              </div>

                              <div className="text-center">
                                <div className="flex items-center gap-1.5 text-red-700">
                                  <XCircle className="w-4 h-4" />
                                  <span className="text-lg font-semibold">{list.declinedCount}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">Declined</p>
                              </div>

                              <div className="text-center">
                                <div className="flex items-center gap-1.5 text-orange-700">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-lg font-semibold">{list.pendingCount}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">Pending</p>
                              </div>
                            </div>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 flex-shrink-0">
                              Not sent
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Detail View */}
          {selectedList && (
            <div>
              {/* Summary Cards */}
              {selectedList.sentCount > 0 && (
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <div className="flex items-center gap-3">
                      <Mail className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total Sent</p>
                        <p className="text-2xl font-semibold text-blue-900">{selectedList.sentCount}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-green-50 border-green-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Confirmed</p>
                        <p className="text-2xl font-semibold text-green-900">{selectedList.confirmedCount}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-red-50 border-red-200">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-8 h-8 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Declined</p>
                        <p className="text-2xl font-semibold text-red-900">{selectedList.declinedCount}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-orange-50 border-orange-200">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-semibold text-orange-900">{selectedList.pendingCount}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Guest List ({selectedList.guests.length})</h2>
                <div className="flex gap-3">
                  {selectedList.guests.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setConvertToTagOpen(true)}
                      className="gap-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
                    >
                      <Tag className="w-4 h-4" />
                      Convert to Custom Tag
                    </Button>
                  )}
                  {selectedList.sentCount > 0 && selectedList.confirmedCount > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setExportModalOpen(true)}
                      className="gap-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400"
                    >
                      <Download className="w-4 h-4" />
                      Export Confirmed ({selectedList.confirmedCount})
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setManageGuestsOpen(true)}
                    className="gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Manage Guests
                  </Button>
                  {selectedList.guests.length > 0 && (
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 gap-2"
                      onClick={handleSendRSVP}
                    >
                      <Send className="w-4 h-4" />
                      Send RSVP
                    </Button>
                  )}
                </div>
              </div>

              {/* Guest List Table */}
              {selectedList.guests.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Guest</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        {selectedList.sentCount > 0 && (
                          <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Response</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedList.guests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={guest.avatar}
                                alt={guest.name}
                                className={`w-10 h-10 rounded-full ring-2 ${
                                  guest.hasKyozoAccount ? 'ring-purple-500' : 'ring-blue-500'
                                }`}
                              />
                              <span className="font-medium">{guest.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{guest.email}</td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center">
                              {guest.status === 'confirmed' && (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Confirmed
                                </Badge>
                              )}
                              {guest.status === 'declined' && (
                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Declined
                                </Badge>
                              )}
                              {guest.status === 'pending' && (
                                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                              {guest.status === 'not-sent' && (
                                <Badge variant="outline" className="bg-gray-50 text-gray-600">
                                  Not Sent
                                </Badge>
                              )}
                            </div>
                          </td>
                          {selectedList.sentCount > 0 && (
                            <td className="py-4 px-4">
                              <div className="flex justify-center items-center gap-1.5 text-sm">
                                {guest.status === 'confirmed' && (
                                  <>
                                    <MessageCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-green-700">Attending</span>
                                  </>
                                )}
                                {guest.status === 'declined' && (
                                  <>
                                    <MessageCircle className="w-4 h-4 text-red-600" />
                                    <span className="text-red-700">Not attending</span>
                                  </>
                                )}
                                {guest.status === 'pending' && (
                                  <>
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="text-orange-700">Awaiting response</span>
                                  </>
                                )}
                                {guest.status === 'not-sent' && (
                                  <span className="text-gray-500">-</span>
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No guests added yet</p>
                  <Button
                    variant="outline"
                    onClick={() => setManageGuestsOpen(true)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Guests
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Create New List Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Guest List</DialogTitle>
            <DialogDescription>
              Give your guest list a name to get started.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="list-name">List Name</Label>
              <Input
                id="list-name"
                placeholder="e.g., Summer Concert 2026"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="mt-1.5"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleCreateList}
              disabled={!newListName.trim()}
            >
              Create List
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Guests Modal */}
      <Dialog open={manageGuestsOpen} onOpenChange={setManageGuestsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Manage Guests</DialogTitle>
            <DialogDescription>
              Select members and contacts to add to your guest list.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {/* Import from Previous Lists */}
            {guestLists.filter(list => list.id !== selectedList?.id && list.guests.length > 0).length > 0 && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Import from previous lists</h4>
                <div className="flex flex-wrap gap-2">
                  {guestLists
                    .filter(list => list.id !== selectedList?.id && list.guests.length > 0)
                    .map((list) => (
                      <Button
                        key={list.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleImportFromList(list)}
                        className="bg-white hover:bg-purple-100 hover:border-purple-400 text-sm"
                      >
                        <Users className="w-3 h-3 mr-1.5" />
                        {list.name} ({list.guests.length})
                      </Button>
                    ))}
                </div>
              </div>
            )}

            {/* Import from Tags */}
            {customTags.length > 0 && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Import from tags</h4>
                <div className="flex flex-wrap gap-2">
                  {customTags.map((tag) => (
                    <Button
                      key={tag.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleImportFromTag(tag.id)}
                      className="bg-white hover:bg-purple-100 hover:border-purple-400 text-sm"
                    >
                      <Tag className="w-3 h-3 mr-1.5" />
                      {tag.name} ({tag.memberIds.length})
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Search */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Select All / Deselect All Buttons */}
            <div className="mb-4 flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const allMemberIds = getFilteredMembers().map(m => m.id);
                  setSelectedMembers(allMemberIds);
                }}
                className="bg-[#7BD3C4]/10 hover:bg-[#7BD3C4]/20 border-[#7BD3C4] text-[#3A3630]"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedMembers([])}
                className="bg-[#E87461]/10 hover:bg-[#E87461]/20 border-[#E87461] text-[#3A3630]"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Deselect All
              </Button>
              <span className="text-sm text-gray-600 ml-auto">
                {selectedMembers.length} selected
              </span>
            </div>

            {/* Members List */}
            <div className="border rounded-lg divide-y max-h-[400px] overflow-auto">
              {getFilteredMembers().map((member) => (
                <div
                  key={member.id}
                  className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer"
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
                      member.hasKyozoAccount ? 'ring-purple-500' : 'ring-blue-500'
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Invite Someone New */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Invite someone not in your database</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="Name"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    className="bg-white"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomGuest()}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddCustomGuest}
                disabled={!newGuestName.trim() || !newGuestEmail.trim()}
                className="mt-3 bg-white hover:bg-blue-100 hover:border-blue-400"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add to List
              </Button>
            </div>

            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-900">
                {selectedMembers.length} guest{selectedMembers.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setManageGuestsOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleSaveGuests}
            >
              Save Guests
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send RSVP Confirmation Modal */}
      <Dialog open={sendConfirmOpen} onOpenChange={setSendConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Send RSVP Emails</DialogTitle>
            <DialogDescription>
              Are you sure you want to send RSVP emails to {selectedList?.guests.length} guests?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setSendConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={confirmSendRSVP}
            >
              Send Emails
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Confirmed Guests Modal */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Export Confirmed Guests</DialogTitle>
            <DialogDescription>
              Enter the email address to send the confirmed guest list.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="export-email">Email Address</Label>
              <Input
                id="export-email"
                placeholder="e.g., example@example.com"
                value={exportEmail}
                onChange={(e) => setExportEmail(e.target.value)}
                className="mt-1.5"
                onKeyDown={(e) => e.key === 'Enter' && handleExportConfirmed()}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setExportModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleExportConfirmed}
              disabled={!exportEmail.trim()}
            >
              Export List
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Convert to Custom Tag Modal */}
      <Dialog open={convertToTagOpen} onOpenChange={setConvertToTagOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Convert to Custom Tag</DialogTitle>
            <DialogDescription>
              This will create a custom tag with the name "{selectedList?.name}" and apply it to all {selectedList?.guests.length} guests in this list.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">Tag Benefits</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Filter members by this tag in the Audience section</li>
                  <li>• Use this tag in future broadcasts and campaigns</li>
                  <li>• Track and segment your audience more effectively</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setConvertToTagOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleConvertToTag}
            >
              Create Tag
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* RSVP Preferences Modal */}
      <Dialog open={preferencesModalOpen} onOpenChange={setPreferencesModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">RSVP Preferences</DialogTitle>
            <DialogDescription>
              Configure your default RSVP and invitation settings.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Invite Channel */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Invite Channel</Label>
              <p className="text-sm text-gray-600 mb-4">Choose how you want to send RSVP invitations to your guests.</p>
              <div className="space-y-3">
                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    inviteChannel === 'email' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setInviteChannel('email')}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      inviteChannel === 'email' ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {inviteChannel === 'email' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-gray-700" />
                      <h4 className="font-semibold">Email</h4>
                    </div>
                    <p className="text-sm text-gray-600">Send RSVP invitations via email</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    inviteChannel === 'whatsapp' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setInviteChannel('whatsapp')}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      inviteChannel === 'whatsapp' ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {inviteChannel === 'whatsapp' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageCircle className="w-4 h-4 text-gray-700" />
                      <h4 className="font-semibold">WhatsApp</h4>
                    </div>
                    <p className="text-sm text-gray-600">Send RSVP invitations via WhatsApp</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    inviteChannel === 'kyozo' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setInviteChannel('kyozo')}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      inviteChannel === 'kyozo' ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {inviteChannel === 'kyozo' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Send className="w-4 h-4 text-gray-700" />
                      <h4 className="font-semibold">Kyozo DM</h4>
                    </div>
                    <p className="text-sm text-gray-600">Send RSVP invitations via Kyozo direct message</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Send User Ticket */}
            <div className="pt-6 border-t">
              <Label className="text-base font-semibold mb-3 block">Send User Ticket</Label>
              <p className="text-sm text-gray-600 mb-4">Automatically send event tickets to confirmed guests.</p>
              <div className="space-y-3">
                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    sendUserTicket 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSendUserTicket(true)}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      sendUserTicket ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {sendUserTicket && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-gray-700" />
                      <h4 className="font-semibold">Yes</h4>
                    </div>
                    <p className="text-sm text-gray-600">Send tickets automatically when guests confirm</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    !sendUserTicket 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSendUserTicket(false)}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      !sendUserTicket ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {!sendUserTicket && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="w-4 h-4 text-gray-700" />
                      <h4 className="font-semibold">No</h4>
                    </div>
                    <p className="text-sm text-gray-600">Don't send tickets automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
            <Button variant="outline" onClick={() => setPreferencesModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setPreferencesModalOpen(false)}
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}