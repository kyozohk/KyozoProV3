import { useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Calendar as CalendarIcon, Image, Send, Clock, Users, CheckCircle, XCircle, UserCheck, ListChecks, Ticket } from 'lucide-react';
import type { CustomTag } from '../App';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  eventType: string;
  visibility: 'everyone' | 'conversation' | 'resonate' | 'readonly' | string;
  image?: string;
  status: 'pending' | 'published';
  rsvpYes?: number;
  rsvpNo?: number;
  rsvpMaybe?: number;
  guestListLinked?: boolean;
  ticketingLinked?: boolean;
  ticketingProvider?: string;
}

interface ScheduleScreenProps {
  customTags: CustomTag[];
}

export function ScheduleScreen({ customTags }: ScheduleScreenProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewDetailModalOpen, setViewDetailModalOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [visibility, setVisibility] = useState<'everyone' | 'conversation' | 'resonate' | 'readonly' | string>('everyone');
  const [selectedTagId, setSelectedTagId] = useState('');
  const [eventImage, setEventImage] = useState('');

  // Dropdown state for linking
  const [showGuestListDropdown, setShowGuestListDropdown] = useState(false);
  const [showTicketingDropdown, setShowTicketingDropdown] = useState(false);

  // Mock data for saved guest lists (would come from RSVP section in real app)
  const savedGuestLists = [
    { id: 'gl-1', name: 'Summer Concert Series VIP List', memberCount: 45, createdDate: '2024-01-10' },
    { id: 'gl-2', name: 'Workshop Attendees - January', memberCount: 28, createdDate: '2024-01-15' },
    { id: 'gl-3', name: 'DJ Night Guest List', memberCount: 62, createdDate: '2024-01-20' },
    { id: 'gl-4', name: 'Private Showcase Invites', memberCount: 35, createdDate: '2024-01-25' },
  ];

  // Mock data for available ticketing integrations
  const ticketingIntegrations = [
    { id: 'ticket-1', name: 'Eventbrite - DJ Night Series', platform: 'Eventbrite', ticketsSold: 156, totalTickets: 200 },
    { id: 'ticket-2', name: 'Ticketmaster - Live Concert', platform: 'Ticketmaster', ticketsSold: 340, totalTickets: 500 },
    { id: 'ticket-3', name: 'Eventbrite - Workshop Pass', platform: 'Eventbrite', ticketsSold: 42, totalTickets: 50 },
    { id: 'ticket-4', name: 'Dice - Underground Show', platform: 'Dice', ticketsSold: 89, totalTickets: 120 },
  ];

  const eventTypes = [
    'Performance',
    'Workshop',
    'Meetup',
    'Rehearsal',
    'Release',
    'Livestream',
    'Conference',
    'Networking',
    'Other'
  ];

  const handleCreateEvent = () => {
    if (!title || !startDate || !endDate || !startTime || !endTime || !eventType) {
      alert('Please fill in all required fields');
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title,
      start: startDateTime,
      end: endDateTime,
      description,
      eventType,
      visibility: visibility === 'custom' ? selectedTagId : visibility,
      image: eventImage,
      status: 'pending',
      guestListLinked: false,
      ticketingLinked: false
    };

    setEvents(prev => [...prev, newEvent]);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setCreateModalOpen(false);
    setTitle('');
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
    setDescription('');
    setEventType('');
    setVisibility('everyone');
    setSelectedTagId('');
    setEventImage('');
  };

  const handlePublishEvent = () => {
    if (selectedEvent) {
      setEvents(prev =>
        prev.map(event =>
          event.id === selectedEvent.id
            ? { ...event, status: 'published' }
            : event
        )
      );
      setSelectedEvent({ ...selectedEvent, status: 'published' });
    }
  };

  const handleLinkGuestList = () => {
    if (selectedEvent) {
      setEvents(prev =>
        prev.map(event =>
          event.id === selectedEvent.id
            ? { ...event, guestListLinked: !event.guestListLinked }
            : event
        )
      );
      setSelectedEvent({ ...selectedEvent, guestListLinked: !selectedEvent.guestListLinked });
    }
  };

  const handleLinkTicketing = (provider?: string) => {
    if (selectedEvent) {
      setEvents(prev =>
        prev.map(event =>
          event.id === selectedEvent.id
            ? { ...event, ticketingLinked: !event.ticketingLinked, ticketingProvider: provider || event.ticketingProvider }
            : event
        )
      );
      setSelectedEvent({ 
        ...selectedEvent, 
        ticketingLinked: !selectedEvent.ticketingLinked,
        ticketingProvider: provider || selectedEvent.ticketingProvider
      });
    }
  };

  const getVisibilityLabel = (vis: string) => {
    switch (vis) {
      case 'everyone':
        return 'Everyone';
      case 'conversation':
        return 'Top Tier (Conversation)';
      case 'resonate':
        return 'Middle Tier (Resonate)';
      case 'readonly':
        return 'Bottom Tier (Read Only)';
      default:
        const tag = customTags.find(t => t.id === vis);
        return tag ? `Custom Tag: ${tag.name}` : 'Custom Audience';
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#3A3630] mb-2">Schedule</h1>
              <p className="text-[#8B7355]">Manage your community events and calendar</p>
            </div>
            <Button
              onClick={() => setCreateModalOpen(true)}
              className="bg-[#6B9BB5] hover:bg-[#5A8AA5] text-white gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </div>

          {/* Calendar Card */}
          <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#E8DFD0] border-2 border-[#8B7355] shadow-lg">
            <div className="p-6 pb-4 border-b-2 border-[#8B7355]/30">
              <h3 className="text-sm text-[#5A4A3A] font-bold uppercase tracking-wider mb-1">Community Calendar</h3>
              <p className="text-xs text-[#8B7355]">Schedule and manage your creative community events</p>
            </div>
            
            <div className="p-6">
              <div className="bg-white rounded-lg border-2 border-[#8B7355]/30 overflow-hidden">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 600 }}
                  onSelectEvent={(event) => {
                    setSelectedEvent(event);
                    setViewDetailModalOpen(true);
                  }}
                  views={['month', 'week', 'day', 'agenda']}
                  defaultView='month'
                  popup
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: '#D4A574',
                      borderRadius: '6px',
                      opacity: 0.95,
                      color: '#3A3630',
                      border: '2px solid #8B7355',
                      display: 'block',
                      fontWeight: '600',
                      padding: '2px 6px'
                    }
                  })}
                />
              </div>
            </div>
          </Card>

          {/* Event Response Metrics */}
          <div className="mt-8">
            <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#E8DFD0] border-2 border-[#8B7355]">
              <div className="p-6 pb-4 border-b-2 border-[#8B7355]/30">
                <h3 className="text-sm text-[#5A4A3A] font-bold uppercase tracking-wider mb-1">Event Response Metrics</h3>
                <p className="text-xs text-[#8B7355]">Attendance and engagement for upcoming events</p>
              </div>

              <div className="p-6">
                {events.length === 0 ? (
                  <div className="text-center py-12 text-[#8B7355]">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No events scheduled yet. Create your first event to see metrics here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Event Metrics - Shows all events sorted by date */}
                    {events.sort((a, b) => a.start.getTime() - b.start.getTime()).map((event, index) => {
                      // Mock membership data - in real app, this would come from backend
                      const totalMembership = 100;
                      const attendingCount = event.rsvpYes || Math.floor(Math.random() * 35) + 25;
                      const ticketsPurchased = Math.floor(Math.random() * 45) + 20;
                      
                      const percentageAttending = Math.floor((attendingCount / totalMembership) * 100);
                      const percentageTickets = Math.floor((ticketsPurchased / totalMembership) * 100);
                      const nonRespondersCount = totalMembership - Math.max(attendingCount, ticketsPurchased);
                      
                      return (
                        <Card 
                          key={event.id}
                          className="bg-white/60 backdrop-blur-sm border-2 border-[#8B7355]/40 hover:border-[#8B7355] transition-all hover:shadow-md"
                        >
                          <div className="p-5">
                            {/* Event Header */}
                            <div className="flex items-start justify-between gap-4 mb-5">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  {index === 0 && (
                                    <Badge className="bg-[#7BD3C4] text-[#3A3630] border border-[#7BD3C4]/50 text-xs px-2 py-0.5">
                                      Next Event
                                    </Badge>
                                  )}
                                  <h4 className="text-base font-semibold text-[#3A3630]">{event.title}</h4>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-[#8B7355]">
                                  <span className="flex items-center gap-1">
                                    <CalendarIcon className="w-3 h-3" />
                                    {moment(event.start).format('MMM DD, YYYY')}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {moment(event.start).format('h:mm A')}
                                  </span>
                                  <Badge className="bg-[#D4A574]/20 text-[#5A4A3A] border border-[#D4A574] text-xs">
                                    {event.eventType}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Membership Response Metrics */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              {/* Percentage Attending (RSVP) */}
                              <div className="bg-gradient-to-br from-[#7BD3C4]/10 to-[#7BD3C4]/5 border-2 border-[#7BD3C4]/40 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-[#7BD3C4]" />
                                    <span className="text-sm font-semibold text-[#5A4A3A]">Membership Attending</span>
                                  </div>
                                  <div className="text-2xl font-bold text-[#3A3630]">{percentageAttending}%</div>
                                </div>
                                {/* Progress bar */}
                                <div className="h-3 bg-[#E8DFD0] rounded-full overflow-hidden border border-[#8B7355]/30">
                                  <div 
                                    className="h-full bg-gradient-to-r from-[#7BD3C4] to-[#5BB3A4]" 
                                    style={{ width: `${percentageAttending}%` }}
                                  />
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-[#8B7355]">
                                  <span>{attendingCount} RSVPs accepted</span>
                                  <span>{totalMembership} members</span>
                                </div>
                              </div>

                              {/* Percentage Tickets Purchased */}
                              <div className="bg-gradient-to-br from-[#D4A574]/10 to-[#D4A574]/5 border-2 border-[#D4A574]/40 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-[#D4A574]" />
                                    <span className="text-sm font-semibold text-[#5A4A3A]">Ticket Purchases</span>
                                  </div>
                                  <div className="text-2xl font-bold text-[#3A3630]">{percentageTickets}%</div>
                                </div>
                                {/* Progress bar */}
                                <div className="h-3 bg-[#E8DFD0] rounded-full overflow-hidden border border-[#8B7355]/30">
                                  <div 
                                    className="h-full bg-gradient-to-r from-[#D4A574] to-[#B48554]" 
                                    style={{ width: `${percentageTickets}%` }}
                                  />
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-[#8B7355]">
                                  <span>{ticketsPurchased} tickets sold</span>
                                  <span>{totalMembership} members</span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex items-center justify-between p-3 bg-[#E8DFD0]/50 rounded-lg border border-[#8B7355]/30">
                              <div className="flex items-center gap-2 text-sm text-[#5A4A3A]">
                                <Users className="w-4 h-4" />
                                <span>
                                  <span className="font-semibold">{nonRespondersCount} members</span> haven't responded or purchased tickets
                                </span>
                              </div>
                              <Button 
                                size="sm"
                                className="bg-[#6B9BB5] hover:bg-[#5A8AA5] text-white gap-2 shadow-md"
                              >
                                <Send className="w-3 h-3" />
                                Message Non-Responders
                              </Button>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add Calendar Event</DialogTitle>
            <DialogDescription>
              Create a new event for your creative community calendar
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mt-6">
            {/* Event Title */}
            <div>
              <Label htmlFor="title" className="text-base font-semibold">
                Event Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Live Performance at Brooklyn Hall"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Event Type */}
            <div>
              <Label htmlFor="eventType" className="text-base font-semibold">
                Event Type *
              </Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-base font-semibold">
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="startTime" className="text-base font-semibold">
                  Start Time *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="endDate" className="text-base font-semibold">
                  End Date *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="endTime" className="text-base font-semibold">
                  End Time *
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Tell your community about this event..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>

            {/* Event Image URL */}
            <div>
              <Label htmlFor="eventImage" className="text-base font-semibold">
                Event Image URL
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="eventImage"
                  type="url"
                  placeholder="https://example.com/event-image.jpg"
                  value={eventImage}
                  onChange={(e) => setEventImage(e.target.value)}
                />
                <Button type="button" variant="outline" size="icon">
                  <Image className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Visibility Settings */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Who can see this event? *
              </Label>
              <div className="space-y-3">
                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    visibility === 'everyone'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setVisibility('everyone')}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      visibility === 'everyone' ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {visibility === 'everyone' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Everyone</h4>
                    <p className="text-sm text-gray-600">All members can see this event</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    visibility === 'conversation'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setVisibility('conversation')}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      visibility === 'conversation' ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {visibility === 'conversation' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Top Tier (Conversation)</h4>
                    <p className="text-sm text-gray-600">Only top tier members can see this</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    visibility === 'resonate'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setVisibility('resonate')}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      visibility === 'resonate' ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {visibility === 'resonate' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Middle Tier (Resonate)</h4>
                    <p className="text-sm text-gray-600">Only middle tier members can see this</p>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    visibility === 'readonly'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setVisibility('readonly')}
                >
                  <div className="flex items-center h-6">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      visibility === 'readonly' ? 'border-purple-600' : 'border-gray-300'
                    }`}>
                      {visibility === 'readonly' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Bottom Tier (Read Only)</h4>
                    <p className="text-sm text-gray-600">Only bottom tier members can see this</p>
                  </div>
                </div>

                {customTags.length > 0 && (
                  <div
                    className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      visibility === 'custom'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setVisibility('custom')}
                  >
                    <div className="flex items-center h-6">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        visibility === 'custom' ? 'border-purple-600' : 'border-gray-300'
                      }`}>
                        {visibility === 'custom' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Select Custom Tag</h4>
                      {visibility === 'custom' && (
                        <Select value={selectedTagId} onValueChange={setSelectedTagId}>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Choose a tag" />
                          </SelectTrigger>
                          <SelectContent>
                            {customTags.map((tag) => (
                              <SelectItem key={tag.id} value={tag.id}>
                                {tag.name} ({tag.memberIds.length} members)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {visibility !== 'custom' && (
                        <p className="text-sm text-gray-600">Filter by specific audience tag</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleCreateEvent}
            >
              Create Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Event Detail Modal */}
      <Dialog open={viewDetailModalOpen} onOpenChange={setViewDetailModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <DialogTitle className="text-2xl">{selectedEvent?.title}</DialogTitle>
                <DialogDescription>
                  {selectedEvent?.eventType}
                </DialogDescription>
              </div>
              {selectedEvent?.status === 'pending' && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Pending
                </div>
              )}
              {selectedEvent?.status === 'published' && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  <Send className="w-4 h-4" />
                  Published
                </div>
              )}
            </div>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4 mt-4">
              {/* Status Info Banner */}
              {selectedEvent.status === 'pending' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Draft Event:</strong> This event is only visible to you. Click "Publish Event" below to share it with your community based on the visibility settings.
                  </p>
                </div>
              )}

              {selectedEvent.image && (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Start</h4>
                  <p className="text-base">
                    {moment(selectedEvent.start).format('MMM DD, YYYY [at] h:mm A')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">End</h4>
                  <p className="text-base">
                    {moment(selectedEvent.end).format('MMM DD, YYYY [at] h:mm A')}
                  </p>
                </div>
              </div>

              {selectedEvent.description && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Description</h4>
                  <p className="text-base text-gray-800">{selectedEvent.description}</p>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-sm text-gray-600 mb-1">Visibility</h4>
                <p className="text-base">{getVisibilityLabel(selectedEvent.visibility)}</p>
              </div>

              {/* Guest List and Ticketing Status */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm text-gray-600 mb-3">Event Integrations</h4>
                <div className="space-y-2">
                  {selectedEvent.guestListLinked && (
                    <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span>Guest List Linked</span>
                    </div>
                  )}
                  {selectedEvent.ticketingLinked && (
                    <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span>Ticketing Linked {selectedEvent.ticketingProvider ? `(${selectedEvent.ticketingProvider})` : ''}</span>
                    </div>
                  )}
                  {!selectedEvent.guestListLinked && !selectedEvent.ticketingLinked && (
                    <p className="text-sm text-gray-500">No integrations linked yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 mt-6 pt-6 border-t">
            {/* Link Guest List Button with Dropdown */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-2 border-[#7BD3C4]/40 hover:border-[#7BD3C4] hover:bg-[#7BD3C4]/10"
                onClick={() => setShowGuestListDropdown(!showGuestListDropdown)}
              >
                <ListChecks className="w-4 h-4 text-[#7BD3C4]" />
                <span>{selectedEvent?.guestListLinked ? 'Manage Guest List' : 'Link Guest List'}</span>
                {selectedEvent?.guestListLinked && (
                  <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
                )}
              </Button>

              {/* Guest List Dropdown */}
              {showGuestListDropdown && (
                <div className="ml-4 p-4 bg-[#7BD3C4]/5 border-2 border-[#7BD3C4]/30 rounded-lg space-y-2">
                  <p className="text-sm font-semibold text-[#5A4A3A] mb-3">Select Guest List from RSVP Section:</p>
                  {savedGuestLists.length === 0 ? (
                    <p className="text-sm text-[#8B7355] italic">No saved guest lists available. Create one in the RSVP section.</p>
                  ) : (
                    <div className="space-y-2">
                      {savedGuestLists.map((list) => (
                        <div
                          key={list.id}
                          className="flex items-start justify-between p-3 bg-white border border-[#7BD3C4]/40 rounded-lg hover:border-[#7BD3C4] hover:bg-[#7BD3C4]/10 cursor-pointer transition-all"
                          onClick={() => {
                            handleLinkGuestList();
                            setShowGuestListDropdown(false);
                          }}
                        >
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm text-[#3A3630]">{list.name}</h5>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-[#8B7355]">
                                <Users className="w-3 h-3 inline mr-1" />
                                {list.memberCount} members
                              </span>
                              <span className="text-xs text-[#8B7355]">
                                Created {moment(list.createdDate).format('MMM DD, YYYY')}
                              </span>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-[#7BD3C4] opacity-0 hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Link Ticketing Button with Dropdown */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-2 border-[#D4A574]/40 hover:border-[#D4A574] hover:bg-[#D4A574]/10"
                onClick={() => setShowTicketingDropdown(!showTicketingDropdown)}
              >
                <Ticket className="w-4 h-4 text-[#D4A574]" />
                <span>{selectedEvent?.ticketingLinked ? 'Manage Ticketing' : 'Link Ticketing Integration'}</span>
                {selectedEvent?.ticketingLinked && (
                  <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
                )}
              </Button>

              {/* Ticketing Dropdown */}
              {showTicketingDropdown && (
                <div className="ml-4 p-4 bg-[#D4A574]/5 border-2 border-[#D4A574]/30 rounded-lg space-y-2">
                  <p className="text-sm font-semibold text-[#5A4A3A] mb-3">Select Ticketing Integration:</p>
                  {ticketingIntegrations.length === 0 ? (
                    <p className="text-sm text-[#8B7355] italic">No ticketing integrations available. Connect one in the Integrations section.</p>
                  ) : (
                    <div className="space-y-2">
                      {ticketingIntegrations.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="flex items-start justify-between p-3 bg-white border border-[#D4A574]/40 rounded-lg hover:border-[#D4A574] hover:bg-[#D4A574]/10 cursor-pointer transition-all"
                          onClick={() => {
                            handleLinkTicketing(ticket.platform);
                            setShowTicketingDropdown(false);
                          }}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-semibold text-sm text-[#3A3630]">{ticket.name}</h5>
                              <Badge className="bg-[#D4A574]/20 text-[#5A4A3A] border border-[#D4A574] text-xs px-2 py-0">
                                {ticket.platform}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1">
                                <div className="h-2 bg-[#E8DFD0] rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-[#D4A574] to-[#B48554]" 
                                    style={{ width: `${(ticket.ticketsSold / ticket.totalTickets) * 100}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-xs text-[#8B7355] whitespace-nowrap">
                                {ticket.ticketsSold}/{ticket.totalTickets} sold
                              </span>
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-[#D4A574] opacity-0 hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center gap-3 pt-3">
              {selectedEvent?.status === 'pending' ? (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 gap-2"
                    onClick={handlePublishEvent}
                  >
                    <Send className="w-4 h-4" />
                    Publish Event
                  </Button>
                  <Button variant="outline" onClick={() => setViewDetailModalOpen(false)}>
                    Close
                  </Button>
                </>
              ) : (
                <div className="ml-auto">
                  <Button variant="outline" onClick={() => setViewDetailModalOpen(false)}>
                    Close
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}