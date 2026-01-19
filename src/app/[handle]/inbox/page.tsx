'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { getCommunityByHandle } from '@/lib/community-utils';
import { Community } from '@/types/community';
import { Search, Send } from 'lucide-react';
import Image from 'next/image';

interface User {
  userId: string;
  displayName?: string;
  avatarUrl?: string;
  phone?: string;
  phoneNumber?: string;
  email?: string;
}

interface WhatsAppMessage {
  id: string;
  messageId?: string;
  userId?: string;
  senderPhone?: string;
  recipientPhone?: string;
  senderName?: string;
  recipientName?: string;
  messageText: string;
  messageType?: 'text' | 'image' | 'audio' | 'video';
  media?: {
    url?: string;
    caption?: string;
  };
  direction: 'incoming' | 'outgoing';
  timestamp: any;
  read?: boolean;
}

interface Conversation {
  userId: string;
  userPhone: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  lastMessageTime?: any;
  unreadCount: number;
}

export default function InboxPage() {
  const params = useParams();
  const handle = params.handle as string;
  const { user } = useAuth();

  const [communityMembers, setCommunityMembers] = useState<User[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [community, setCommunity] = useState<Community | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch community and members
  useEffect(() => {
    if (!handle) return;

    const loadCommunityMembers = async () => {
      try {
        console.log('[Inbox] Loading members for community:', handle);
        
        const communitiesRef = collection(db, 'communities');
        const communityQuery = query(communitiesRef, where('handle', '==', handle));
        const communitySnapshot = await getDocs(communityQuery);
        
        if (!communitySnapshot.empty) {
          const communityData = communitySnapshot.docs[0].data() as Community;
          const communityId = communitySnapshot.docs[0].id;
          setCommunity({ ...communityData, communityId });
          
          console.log('[Inbox] Found community ID:', communityId);
          
          const membersRef = collection(db, 'communityMembers');
          const membersQuery = query(membersRef, where('communityId', '==', communityId));
          const membersSnapshot = await getDocs(membersQuery);
          
          console.log('[Inbox] Found members count:', membersSnapshot.docs.length);
          
          const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
            const memberData = memberDoc.data();
            try {
              const userDocRef = doc(db, 'users', memberData.userId);
              const userDocSnap = await getDoc(userDocRef);
              
              if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                return { 
                  userId: memberData.userId, 
                  ...userData 
                } as User;
              }
            } catch (error) {
              console.error('[Inbox] Error loading user:', memberData.userId, error);
            }
            return null;
          });
          
          const members = (await Promise.all(memberPromises)).filter(Boolean) as User[];
          console.log('[Inbox] Loaded members:', members.length);
          setCommunityMembers(members);
        }
      } catch (error) {
        console.error('[Inbox] Error loading community members:', error);
      }
    };

    loadCommunityMembers();
  }, [handle]);

  // Load conversations
  useEffect(() => {
    const messagesRef = collection(db, 'messages_whatsapp');
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const conversationMap = new Map<string, Conversation>();
      const userMessageMap = new Map<string, WhatsAppMessage[]>();

      snapshot.docs.forEach((doc) => {
        const msg = { id: doc.id, ...doc.data() } as WhatsAppMessage;
        const userId = msg.userId || msg.senderPhone || msg.recipientPhone || 'unknown';
        
        if (!userMessageMap.has(userId)) {
          userMessageMap.set(userId, []);
        }
        userMessageMap.get(userId)!.push(msg);
      });

      communityMembers.forEach((member) => {
        const memberMessages = userMessageMap.get(member.userId) || [];
        const lastMessage = memberMessages[0];
        const unreadCount = memberMessages.filter(
          (msg) => msg.direction === 'incoming' && !msg.read
        ).length;

        conversationMap.set(member.userId, {
          userId: member.userId,
          userPhone: member.phone || member.phoneNumber || '',
          userName: member.displayName || 'Unknown',
          userAvatar: member.avatarUrl,
          lastMessage: lastMessage?.messageText || 'No messages yet',
          lastMessageTime: lastMessage?.timestamp,
          unreadCount,
        });
      });

      userMessageMap.forEach((messages, userId) => {
        if (!conversationMap.has(userId)) {
          const firstMsg = messages[0];
          const unreadCount = messages.filter(
            (msg) => msg.direction === 'incoming' && !msg.read
          ).length;

          conversationMap.set(userId, {
            userId: firstMsg.userId || userId,
            userPhone: firstMsg.senderPhone || firstMsg.recipientPhone || '',
            userName: firstMsg.senderName || firstMsg.recipientName || 'Unknown',
            lastMessage: firstMsg.messageText,
            lastMessageTime: firstMsg.timestamp,
            unreadCount,
          });
        }
      });

      setConversations(Array.from(conversationMap.values()));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [communityMembers]);

  // Load messages for selected user
  useEffect(() => {
    if (!selectedUserId) {
      setMessages([]);
      return;
    }

    const member = communityMembers.find(m => m.userId === selectedUserId);
    if (!member) return;
    
    const memberPhone = member.phone || member.phoneNumber;
    if (!memberPhone) return;
    
    const normalizedPhone = memberPhone.replace(/\D/g, '');

    const messagesRef = collection(db, 'messages_whatsapp');
    
    const outgoingQuery = query(
      messagesRef,
      where('recipientPhone', '==', normalizedPhone),
      orderBy('timestamp', 'asc')
    );
    
    const incomingQuery = query(
      messagesRef,
      where('senderPhone', '==', `+${normalizedPhone}`),
      orderBy('timestamp', 'asc')
    );

    const unsubOutgoing = onSnapshot(outgoingQuery, (outgoingSnap) => {
      const outgoingMsgs = outgoingSnap.docs.map(doc => 
        ({ id: doc.id, ...doc.data() } as WhatsAppMessage)
      );
      
      const unsubIncoming = onSnapshot(incomingQuery, async (incomingSnap) => {
        const incomingMsgs = incomingSnap.docs.map(doc => 
          ({ id: doc.id, ...doc.data() } as WhatsAppMessage)
        );
        
        const allMessages = [...outgoingMsgs, ...incomingMsgs];
        allMessages.sort((a, b) => {
          const timeA = a.timestamp?.toDate?.() || new Date(0);
          const timeB = b.timestamp?.toDate?.() || new Date(0);
          return timeA.getTime() - timeB.getTime();
        });
        
        setMessages(allMessages);
        
        for (const msg of incomingMsgs) {
          if (!msg.read) {
            const msgRef = doc(db, 'messages_whatsapp', msg.id);
            await updateDoc(msgRef, { read: true });
          }
        }
      });
      
      return () => unsubIncoming();
    });

    return () => unsubOutgoing();
  }, [selectedUserId, communityMembers]);

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.userPhone.includes(searchTerm)
  );

  if (!community) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F1E8]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D4A574] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F5F1E8]">
      {/* Conversations List */}
      <div className="w-80 border-r-2 border-[#E8DFD0] bg-white overflow-y-auto">
        <div className="p-4 border-b-2 border-[#E8DFD0]">
          <h2 className="text-xl font-bold text-[#3A3630] mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B7355]" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border-2 border-[#E8DFD0] bg-[#F5F1E8] py-2 pl-9 pr-3 text-sm text-[#3A3630] outline-none focus:border-[#D4A574] transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-3 border-[#D4A574] border-t-transparent" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#8B7355]">No conversations yet</p>
          </div>
        ) : (
          <div>
            {filteredConversations.map((conv) => (
              <button
                key={conv.userId}
                onClick={() => setSelectedUserId(conv.userId)}
                className={`w-full p-4 border-b border-[#E8DFD0] hover:bg-[#F5F1E8] transition-all ${
                  selectedUserId === conv.userId ? 'bg-[#E8DFD0]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {conv.userAvatar ? (
                    <Image
                      src={conv.userAvatar}
                      alt={conv.userName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover ring-2 ring-[#E8DFD0]"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8DFD0]">
                      <span className="text-sm font-semibold text-[#8B7355]">
                        {conv.userName[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 text-left overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-[#3A3630] truncate">{conv.userName}</p>
                      {conv.unreadCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4A574] text-xs font-bold text-white">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#8B7355] truncate">{conv.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col">
        {selectedUserId ? (
          <>
            {/* Header */}
            <div className="p-4 border-b-2 border-[#E8DFD0] bg-white">
              <div className="flex items-center gap-3">
                {conversations.find(c => c.userId === selectedUserId)?.userAvatar ? (
                  <Image
                    src={conversations.find(c => c.userId === selectedUserId)!.userAvatar!}
                    alt={conversations.find(c => c.userId === selectedUserId)!.userName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover ring-2 ring-[#E8DFD0]"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8DFD0]">
                    <span className="text-sm font-semibold text-[#8B7355]">
                      {conversations.find(c => c.userId === selectedUserId)?.userName[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-[#3A3630]">
                    {conversations.find(c => c.userId === selectedUserId)?.userName}
                  </p>
                  <p className="text-xs text-[#8B7355]">
                    {conversations.find(c => c.userId === selectedUserId)?.userPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl px-4 py-2 ${
                      msg.direction === 'outgoing'
                        ? 'bg-[#D4A574] text-white'
                        : 'bg-white border-2 border-[#E8DFD0] text-[#3A3630]'
                    }`}
                  >
                    <p className="text-sm">{msg.messageText}</p>
                    <p className={`text-xs mt-1 ${msg.direction === 'outgoing' ? 'text-white/70' : 'text-[#8B7355]'}`}>
                      {msg.timestamp?.toDate?.() ? new Date(msg.timestamp.toDate()).toLocaleTimeString() : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t-2 border-[#E8DFD0] bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border-2 border-[#E8DFD0] bg-[#F5F1E8] px-4 py-2 text-[#3A3630] outline-none focus:border-[#D4A574] transition-all"
                />
                <button className="rounded-xl bg-[#D4A574] px-4 py-2 text-white hover:bg-[#C39564] transition-all">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-semibold text-[#3A3630] mb-2">Select a conversation</p>
              <p className="text-[#8B7355]">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
