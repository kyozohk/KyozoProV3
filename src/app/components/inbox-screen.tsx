import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ChevronDown, Search, Send, Image as ImageIcon, FileText, MapPin, Smile, Mic, Paperclip, Plus, Upload, X } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  avatar?: string;
  isOnline: boolean;
  isSelected: boolean;
}

interface QuickReply {
  id: string;
  name: string;
  message: string;
  color: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'document';
}

const initialConversations: Conversation[] = [
  { id: '1', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: false },
  { id: '2', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: false },
  { id: '3', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: true },
  { id: '4', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: false },
  { id: '5', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: true },
  { id: '6', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: true },
  { id: '7', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: true },
  { id: '8', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: true },
  { id: '9', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: false, isSelected: false },
  { id: '10', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: false },
  { id: '11', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: true, isSelected: true },
  { id: '12', name: 'Username', preview: 'Hi! How are you today?', time: '16:30', isOnline: false, isSelected: false },
  { id: '13', name: 'Username', preview: 'Hi! How are you today?', time: 'Yesterday', isOnline: false, isSelected: false },
  { id: '14', name: 'Username', preview: 'Hi! How are you today?', time: 'Yesterday', isOnline: false, isSelected: false },
  { id: '15', name: 'Username', preview: 'Hi! How are you today?', time: 'Monday', isOnline: false, isSelected: false },
];

export function InboxScreen() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>('3');
  const [quickRepliesModalOpen, setQuickRepliesModalOpen] = useState(false);
  const [createReplyModalOpen, setCreateReplyModalOpen] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([
    {
      id: '1',
      name: 'Welcome Message',
      message: 'Quick response message get exampid tempor, ut labore et dous.\n\nQuick response {First name} message consectetur adipisic elit,\n\nQuick response message consectetur adipisic elit, sed eusumod tempor indicunt ut.',
      color: '#E89B97',
    },
    {
      id: '2',
      name: 'Thank You',
      message: 'Quick response message consectetur adipisic elit, sed {Promotional Code} eusumod tempor indicunt ut.',
      color: '#98C1D9',
      mediaUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop',
      mediaType: 'image',
    },
    {
      id: '3',
      name: 'Event Reminder',
      message: '{First name}, this is your reminder for the upcoming event.',
      color: '#B8B8D1',
    },
  ]);
  const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);
  const [editingReply, setEditingReply] = useState<QuickReply | null>(null);
  const [newReplyName, setNewReplyName] = useState('');
  const [newReplyMessage, setNewReplyMessage] = useState('');
  const [newReplyColor, setNewReplyColor] = useState('#E89B97');

  const selectedCount = conversations.filter(c => c.isSelected).length;

  const toggleConversation = (id: string) => {
    setConversations(convs =>
      convs.map(conv =>
        conv.id === id ? { ...conv, isSelected: !conv.isSelected } : conv
      )
    );
  };

  const selectAllActive = () => {
    setConversations(convs =>
      convs.map(conv => ({ ...conv, isSelected: conv.isOnline }))
    );
  };

  const variables = [
    { key: '{{1}}', value: 'First name' },
    { key: '{{2}}', value: 'Last name' },
    { key: '{{3}}', value: 'First text entry' },
    { key: '{{4}}', value: 'First name' },
    { key: '{{5}}', value: 'Full name' },
    { key: '{{6}}', value: 'Community name' },
  ];

  return (
    <div className="flex-1 h-screen flex bg-white">
      {/* Conversations List */}
      <div className="w-[350px] bg-[#E5D4C1] flex flex-col">
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Bulk Selection */}
        <div className="p-3 border-b flex items-center justify-between">
          <div
            onClick={selectAllActive}
            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 cursor-pointer"
          >
            <Checkbox className="border-purple-400 data-[state=checked]:bg-purple-600" />
            <span>Select all active users</span>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`w-full p-3 hover:bg-[#D4B5D4] transition-colors flex items-center gap-3 cursor-pointer ${
                selectedConversationId === conv.id ? 'bg-[#C4A5C4]' : ''
              }`}
            >
              <Checkbox
                checked={conv.isSelected}
                onCheckedChange={() => toggleConversation(conv.id)}
                onClick={(e) => e.stopPropagation()}
                className="border-gray-400 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <div
                className="flex items-center gap-3 flex-1 min-w-0"
                onClick={() => setSelectedConversationId(conv.id)}
              >
                <div className="relative">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${conv.id}`} />
                    <AvatarFallback className="bg-purple-600 text-white text-xs">
                      {conv.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#E8D8E8]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium text-sm text-gray-900">{conv.name}</h3>
                    <span className="text-xs text-gray-600 flex-shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{conv.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reply Action Button */}
        {selectedCount > 0 && (
          <div className="p-4 bg-white border-t">
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white gap-2"
              onClick={() => setQuickRepliesModalOpen(true)}
            >
              <FileText className="w-4 h-4" />
              Send Quick Reply to {selectedCount} recipient{selectedCount > 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#F5F5F7]">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-purple-200 text-purple-700">U</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">Username</h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Message from User */}
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-gray-300 text-gray-700">W</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="font-semibold text-sm">Will Poole</h3>
                </div>
                <Card className="bg-purple-100 p-4 max-w-2xl">
                  <p className="text-sm text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                    Duis at arnet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">MEDIA • 00/00/0000</p>
                </Card>
              </div>
              <Avatar className="w-10 h-10 flex-shrink-0 opacity-0">
                <AvatarFallback>-</AvatarFallback>
              </Avatar>
            </div>

            {/* Message from Bot/System */}
            <div className="flex gap-3 justify-end">
              <Avatar className="w-10 h-10 flex-shrink-0 opacity-0">
                <AvatarFallback>-</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex flex-col items-end">
                <Card className="bg-[#E89B97] p-4 max-w-md text-white">
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                  </p>
                  <p className="text-xs text-white/80 mt-2">MEDIA • 00/00/0000 ✓</p>
                </Card>
              </div>
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-gray-300 text-gray-700">W</AvatarFallback>
              </Avatar>
            </div>

            {/* Another User Message */}
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-gray-300 text-gray-700">W</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="font-semibold text-sm">Will Poole</h3>
                </div>
                <Card className="bg-purple-100 p-4 max-w-2xl mb-3">
                  <p className="text-sm text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                    Duis at arnet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">MEDIA • 00/00/0000</p>
                </Card>
                <Card className="bg-white p-4 max-w-md border">
                  <div className="space-y-2">
                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600">
                      <ImageIcon className="w-4 h-4" />
                      <span>Photo & Video</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600">
                      <FileText className="w-4 h-4" />
                      <span>Document</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-purple-600">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </button>
                  </div>
                </Card>
                <p className="text-xs text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                  Duis at arnet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                </p>
                <p className="text-xs text-gray-500 mt-1">MEDIA • 00/00/0000</p>
              </div>
              <Avatar className="w-10 h-10 flex-shrink-0 opacity-0">
                <AvatarFallback>-</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Message Input Area */}
        <div className="bg-white border-t p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 text-purple-600 hover:text-purple-700"
              >
                <Smile className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 text-purple-600 hover:text-purple-700"
                onClick={() => setQuickRepliesModalOpen(true)}
              >
                <FileText className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 text-purple-600 hover:text-purple-700"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                <Mic className="w-5 h-5 text-purple-600" />
                <Input
                  placeholder="Say Something..."
                  className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
                />
              </div>
              <Button
                size="icon"
                className="flex-shrink-0 rounded-full bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Replies Modal */}
      <Dialog open={quickRepliesModalOpen} onOpenChange={setQuickRepliesModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg text-teal-600">Quick responses</DialogTitle>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-teal-500 text-teal-600 hover:bg-teal-50 gap-1 text-xs px-3"
                onClick={() => setCreateReplyModalOpen(true)}
              >
                <Plus className="w-3 h-3" />
                CREATE
              </Button>
            </div>
          </DialogHeader>

          <div className="mt-4">
            {quickReplies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500 mb-4">
                  No quick reply templates, click "+CREATE" to create a template
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-auto">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => setSelectedReplyId(reply.id === selectedReplyId ? null : reply.id)}
                    className={`w-full text-left border rounded-lg p-3 hover:border-teal-400 transition-colors ${
                      selectedReplyId === reply.id ? 'border-teal-500 bg-teal-50/30' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Media Preview or Color Block */}
                      {reply.mediaUrl ? (
                        <img
                          src={reply.mediaUrl}
                          alt="Media preview"
                          className="w-14 h-14 rounded object-cover flex-shrink-0"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded flex-shrink-0"
                          style={{ backgroundColor: reply.color }}
                        />
                      )}
                      
                      {/* Message Preview */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-1">{reply.name}</p>
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {reply.message.split(/(\{[^}]+\})/).map((part, idx) => {
                            if (part.match(/\{[^}]+\}/)) {
                              return (
                                <span key={idx} className="text-teal-600 font-medium">
                                  {part}
                                </span>
                              );
                            }
                            return <span key={idx}>{part}</span>;
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="text-sm text-gray-500">
              {selectedCount > 0 && `Sending to ${selectedCount} recipient${selectedCount > 1 ? 's' : ''}`}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setQuickRepliesModalOpen(false);
                  setSelectedReplyId(null);
                }}
              >
                CANCEL
              </Button>
              <Button
                className="bg-gray-400 hover:bg-gray-500 text-white"
                disabled={!selectedReplyId || selectedCount === 0}
                onClick={() => {
                  // Handle sending
                  setQuickRepliesModalOpen(false);
                  setSelectedReplyId(null);
                }}
              >
                SEND
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Reply Modal */}
      <Dialog open={createReplyModalOpen} onOpenChange={setCreateReplyModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg text-teal-600">
                {editingReply ? 'Edit quick response' : 'Create quick response'}
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {/* Template Name */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Template Name</Label>
              <Input
                value={newReplyName}
                onChange={(e) => setNewReplyName(e.target.value)}
                placeholder="e.g., Welcome Message"
                className="w-full"
              />
            </div>

            {/* Message */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Message</Label>
                <button className="text-xs text-teal-600 hover:text-teal-700">
                  Insert variable
                </button>
              </div>
              <Textarea
                value={newReplyMessage}
                onChange={(e) => setNewReplyMessage(e.target.value)}
                placeholder="Type your message here... Use {First name} for variables"
                className="min-h-32 resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Use curly braces for variables: {'{First name}'}, {'{Promotional Code}'}
              </p>
            </div>

            {/* Color Picker */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Template Color</Label>
              <div className="flex items-center gap-2">
                {['#E89B97', '#98C1D9', '#B8B8D1', '#A8D8B9', '#F4C095'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewReplyColor(color)}
                    className={`w-10 h-10 rounded border-2 transition-all ${
                      newReplyColor === color ? 'border-gray-800 scale-110' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Add Media (optional)</Label>
              <Button variant="outline" className="w-full justify-start text-gray-500 gap-2">
                <Upload className="w-4 h-4" />
                Upload image or document
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setCreateReplyModalOpen(false);
                setEditingReply(null);
                setNewReplyName('');
                setNewReplyMessage('');
                setNewReplyColor('#E89B97');
              }}
            >
              CANCEL
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white"
              disabled={!newReplyName.trim() || !newReplyMessage.trim()}
              onClick={() => {
                const newReply: QuickReply = {
                  id: Date.now().toString(),
                  name: newReplyName,
                  message: newReplyMessage,
                  color: newReplyColor,
                };
                setQuickReplies([...quickReplies, newReply]);
                setCreateReplyModalOpen(false);
                setNewReplyName('');
                setNewReplyMessage('');
                setNewReplyColor('#E89B97');
              }}
            >
              CREATE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}